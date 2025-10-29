"""
Business: API для работы с пользователями, балансом и транзакциями
Args: event с httpMethod, body, queryStringParameters
Returns: HTTP response с JSON данными
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
import random
import string

def get_db_connection():
    """Подключение к БД"""
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def generate_referral_code():
    """Генерация уникального реферального кода"""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Telegram-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        if method == 'GET':
            params = event.get('queryStringParameters', {})
            action = params.get('action', 'get_user')
            telegram_id = params.get('telegram_id')
            
            if not telegram_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'telegram_id required'}),
                    'isBase64Encoded': False
                }
            
            if action == 'get_user':
                cur.execute(
                    "SELECT * FROM users WHERE telegram_id = %s",
                    (int(telegram_id),)
                )
                user = cur.fetchone()
                
                if not user:
                    return {
                        'statusCode': 404,
                        'headers': headers,
                        'body': json.dumps({'error': 'User not found'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute(
                    "SELECT COUNT(*) as count FROM referrals WHERE referrer_id = %s",
                    (user['id'],)
                )
                referral_count = cur.fetchone()['count']
                
                cur.execute(
                    """SELECT * FROM transactions 
                    WHERE user_id = %s 
                    ORDER BY created_at DESC 
                    LIMIT 10""",
                    (user['id'],)
                )
                transactions = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'user': dict(user),
                        'referral_count': referral_count,
                        'transactions': [dict(t) for t in transactions]
                    }, default=str),
                    'isBase64Encoded': False
                }
            
            elif action == 'get_withdrawals':
                cur.execute(
                    """SELECT wr.*, u.telegram_id, u.username, u.first_name
                    FROM withdrawal_requests wr
                    JOIN users u ON wr.user_id = u.id
                    WHERE wr.status = 'pending'
                    ORDER BY wr.created_at DESC"""
                )
                withdrawals = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'withdrawals': [dict(w) for w in withdrawals]
                    }, default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            
            if action == 'register':
                telegram_id = body_data.get('telegram_id')
                username = body_data.get('username')
                first_name = body_data.get('first_name')
                referral_code_used = body_data.get('referral_code')
                
                cur.execute(
                    "SELECT id FROM users WHERE telegram_id = %s",
                    (int(telegram_id),)
                )
                existing_user = cur.fetchone()
                
                if existing_user:
                    return {
                        'statusCode': 200,
                        'headers': headers,
                        'body': json.dumps({'message': 'User already exists'}),
                        'isBase64Encoded': False
                    }
                
                referral_code = generate_referral_code()
                referred_by_id = None
                
                if referral_code_used:
                    cur.execute(
                        "SELECT id FROM users WHERE referral_code = %s",
                        (referral_code_used,)
                    )
                    referrer = cur.fetchone()
                    if referrer:
                        referred_by_id = referrer['id']
                
                cur.execute(
                    """INSERT INTO users (telegram_id, username, first_name, referral_code, referred_by)
                    VALUES (%s, %s, %s, %s, %s) RETURNING id""",
                    (int(telegram_id), username, first_name, referral_code, referred_by_id)
                )
                user_id = cur.fetchone()['id']
                
                if referred_by_id:
                    cur.execute(
                        """INSERT INTO referrals (referrer_id, referred_id)
                        VALUES (%s, %s)""",
                        (referred_by_id, user_id)
                    )
                
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': headers,
                    'body': json.dumps({'message': 'User registered', 'referral_code': referral_code}),
                    'isBase64Encoded': False
                }
            
            elif action == 'create_withdrawal':
                user_id = body_data.get('user_id')
                amount = body_data.get('amount')
                phone = body_data.get('phone')
                bank = body_data.get('bank')
                
                cur.execute(
                    "SELECT balance FROM users WHERE id = %s",
                    (user_id,)
                )
                user = cur.fetchone()
                
                if not user or float(user['balance']) < float(amount):
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({'error': 'Insufficient balance'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute(
                    """INSERT INTO withdrawal_requests (user_id, amount, phone, bank)
                    VALUES (%s, %s, %s, %s) RETURNING id""",
                    (user_id, amount, phone, bank)
                )
                withdrawal_id = cur.fetchone()['id']
                
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': headers,
                    'body': json.dumps({'message': 'Withdrawal request created', 'id': withdrawal_id}),
                    'isBase64Encoded': False
                }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            
            if action == 'approve_withdrawal':
                withdrawal_id = body_data.get('withdrawal_id')
                
                cur.execute(
                    """UPDATE withdrawal_requests 
                    SET status = 'approved', updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                    RETURNING user_id, amount""",
                    (withdrawal_id,)
                )
                withdrawal = cur.fetchone()
                
                if withdrawal:
                    cur.execute(
                        """UPDATE users 
                        SET balance = balance - %s
                        WHERE id = %s""",
                        (withdrawal['amount'], withdrawal['user_id'])
                    )
                    
                    cur.execute(
                        """INSERT INTO transactions (user_id, type, amount, description, status)
                        VALUES (%s, 'withdrawal', %s, 'Вывод средств', 'completed')""",
                        (withdrawal['user_id'], withdrawal['amount'])
                    )
                    
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'message': 'Withdrawal approved'}),
                    'isBase64Encoded': False
                }
            
            elif action == 'reject_withdrawal':
                withdrawal_id = body_data.get('withdrawal_id')
                
                cur.execute(
                    """UPDATE withdrawal_requests 
                    SET status = 'rejected', updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s""",
                    (withdrawal_id,)
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'message': 'Withdrawal rejected'}),
                    'isBase64Encoded': False
                }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
