import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Section = 'card' | 'referral' | 'donate' | 'balance' | 'withdrawal' | 'history' | 'menu' | 'support' | 'admin';

interface Transaction {
  id: number;
  type: 'income' | 'withdrawal';
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'rejected';
}

interface MenuItem {
  id: Section;
  label: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { id: 'card', label: 'Карта', icon: 'CreditCard' },
  { id: 'referral', label: 'Рефералы', icon: 'Users' },
  { id: 'donate', label: 'Донат', icon: 'Heart' },
  { id: 'balance', label: 'Баланс', icon: 'Wallet' },
  { id: 'withdrawal', label: 'Вывод', icon: 'ArrowDownToLine' },
  { id: 'history', label: 'История', icon: 'Clock' },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('card');
  const [balance] = useState(0);
  const [referralCode] = useState('REF12345');
  const [referralCount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalPhone, setWithdrawalPhone] = useState('');
  const [withdrawalBank, setWithdrawalBank] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'income',
      amount: 500,
      description: 'Бонус за оформление карты',
      date: '2025-10-28 14:30',
      status: 'completed'
    },
    {
      id: 2,
      type: 'income',
      amount: 200,
      description: 'Реферальная программа',
      date: '2025-10-27 12:15',
      status: 'completed'
    }
  ]);

  const renderContent = () => {
    switch (activeSection) {
      case 'card':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="CreditCard" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold">Альфа-Карта</h1>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Icon name="Gift" className="text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Получите 1000 ₽!</h2>
                    <p className="text-sm text-muted-foreground">500 ₽ от нас + 500 ₽ от Альфа-Банка</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="CheckCircle2" className="text-primary" size={20} />
                Что нужно сделать?
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <p className="text-sm">Оформить Альфа-Карту по ссылке ниже</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </div>
                  <p className="text-sm">Активировать карту в приложении</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <p className="text-sm">Сделать покупку от 200 ₽ и отправить чек на @Alfa_Bank778</p>
                </div>
              </div>
            </Card>

            <Button 
              className="w-full h-12 text-base font-bold" 
              size="lg"
              onClick={() => window.open('https://alfa.me/ASQWHN', '_blank')}
            >
              <Icon name="ExternalLink" size={20} className="mr-2" />
              Оформить Альфа-Карту
            </Button>

            <Card className="p-4 bg-accent/50">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Icon name="Sparkles" className="text-primary" size={18} />
                Преимущества карты:
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  Бесплатное обслуживание
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  Кэшбэк каждый месяц
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  Множество предложений от партнёров
                </li>
              </ul>
            </Card>
          </div>
        );

      case 'referral':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Users" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold">Реферальная программа</h1>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center">
                  <Icon name="Gift" className="text-primary-foreground" size={32} />
                </div>
                <h2 className="font-bold text-2xl">200 ₽</h2>
                <p className="text-sm text-muted-foreground">
                  За каждого приглашенного друга
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-bold mb-3">Ваш реферальный код</h3>
              <div className="flex gap-2">
                <Input 
                  value={referralCode} 
                  readOnly 
                  className="font-mono text-lg font-bold text-center"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                  }}
                >
                  <Icon name="Copy" size={18} />
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{referralCount}</div>
                <div className="text-sm text-muted-foreground">Приглашено</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{referralCount * 200}</div>
                <div className="text-sm text-muted-foreground">Заработано ₽</div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="Info" className="text-primary" size={18} />
                Как это работает?
              </h3>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                <li>Поделитесь своим кодом с друзьями</li>
                <li>Друг оформляет карту по вашей ссылке</li>
                <li>После активации карты вы получаете 200 ₽</li>
              </ol>
            </Card>

            <Button className="w-full" size="lg">
              <Icon name="Share2" size={18} className="mr-2" />
              Поделиться кодом
            </Button>
          </div>
        );

      case 'donate':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Heart" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold">Донат</h1>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 text-center">
              <Icon name="Heart" className="text-primary mx-auto mb-3" size={48} />
              <h2 className="font-bold text-xl mb-2">Поддержите проект!</h2>
              <p className="text-sm text-muted-foreground">
                Ваши донаты помогают развивать сервис
              </p>
            </Card>

            <Card className="p-5">
              <h3 className="font-bold mb-3">Реквизиты для перевода</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Номер телефона</label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      value="89069892267" 
                      readOnly 
                      className="font-mono font-bold"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => navigator.clipboard.writeText('89069892267')}
                    >
                      <Icon name="Copy" size={18} />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Банк</label>
                  <Input 
                    value="Озон Банк" 
                    readOnly 
                    className="font-bold mt-1"
                  />
                </div>
              </div>
            </Card>

            <Alert className="bg-primary/5 border-primary/20">
              <Icon name="Info" className="text-primary" size={18} />
              <AlertDescription className="text-sm">
                После отправки доната напишите в поддержку для подтверждения
              </AlertDescription>
            </Alert>

            <Button className="w-full" size="lg" variant="outline">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Написать в поддержку
            </Button>
          </div>
        );

      case 'balance':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Wallet" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold">Баланс</h1>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary to-secondary text-primary-foreground text-center">
              <div className="space-y-2">
                <p className="text-sm opacity-90">Доступно к выводу</p>
                <h2 className="text-5xl font-bold">{balance} ₽</h2>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="CreditCard" className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-xl font-bold">0 ₽</div>
                    <div className="text-xs text-muted-foreground">За карты</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon name="Users" className="text-secondary" size={20} />
                  </div>
                  <div>
                    <div className="text-xl font-bold">0 ₽</div>
                    <div className="text-xs text-muted-foreground">За рефералов</div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-5">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="TrendingUp" className="text-primary" size={20} />
                Последние начисления
              </h3>
              {transactions.filter(t => t.type === 'income').length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Icon name="Inbox" className="mx-auto mb-2 opacity-50" size={48} />
                  <p className="text-sm">Пока нет начислений</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {transactions.filter(t => t.type === 'income').slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className="text-primary font-bold">+{transaction.amount} ₽</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setActiveSection('withdrawal')}
            >
              <Icon name="ArrowDownToLine" size={18} className="mr-2" />
              Вывести средства
            </Button>
          </div>
        );

      case 'withdrawal':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="ArrowDownToLine" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold">Вывод средств</h1>
            </div>

            <Card className="p-5 bg-primary/5 border-primary/20">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Доступно</p>
                <p className="text-3xl font-bold text-primary">{balance} ₽</p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Сумма вывода</label>
                  <Input 
                    type="number"
                    placeholder="Введите сумму"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="text-lg font-bold"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Минимальная сумма: 500 ₽</p>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium mb-2 block">Номер телефона СБП</label>
                  <Input 
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={withdrawalPhone}
                    onChange={(e) => setWithdrawalPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Банк получателя</label>
                  <Input 
                    placeholder="Например: Сбербанк"
                    value={withdrawalBank}
                    onChange={(e) => setWithdrawalBank(e.target.value)}
                  />
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Icon name="Receipt" size={16} />
                    Чек о покупке на 200+ ₽
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      id="receipt-upload"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setReceiptFile(e.target.files[0]);
                        }
                      }}
                    />
                    <label htmlFor="receipt-upload" className="cursor-pointer">
                      {receiptFile ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <Icon name="CheckCircle2" size={24} />
                          <span className="font-medium">{receiptFile.name}</span>
                        </div>
                      ) : (
                        <div>
                          <Icon name="Upload" className="mx-auto mb-2 text-muted-foreground" size={32} />
                          <p className="text-sm font-medium">Загрузите фото чека</p>
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG до 10 МБ</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            <Alert className="bg-amber-500/10 border-amber-500/20">
              <Icon name="AlertCircle" className="text-amber-600" size={18} />
              <AlertDescription className="text-sm">
                Обязательно прикрепите чек покупки от 200 ₽ для подтверждения вывода
              </AlertDescription>
            </Alert>

            <Button className="w-full" size="lg">
              <Icon name="Send" size={18} className="mr-2" />
              Отправить заявку на вывод
            </Button>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Clock" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold">История операций</h1>
            </div>

            {transactions.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Inbox" className="mx-auto mb-3 opacity-50" size={64} />
                <p className="text-muted-foreground">История пуста</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="p-4">
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        transaction.type === 'income' 
                          ? 'bg-green-500/10' 
                          : 'bg-red-500/10'
                      }`}>
                        <Icon 
                          name={transaction.type === 'income' ? 'ArrowDownLeft' : 'ArrowUpRight'} 
                          className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'} 
                          size={20} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <span className={`font-bold ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}{transaction.amount} ₽
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                          <Badge variant={
                            transaction.status === 'completed' ? 'default' :
                            transaction.status === 'pending' ? 'secondary' : 'destructive'
                          } className="text-xs">
                            {transaction.status === 'completed' ? 'Выполнено' :
                             transaction.status === 'pending' ? 'В обработке' : 'Отклонено'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'menu':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Menu" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold">Меню</h1>
            </div>

            <Card className="divide-y">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setActiveSection('support')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="MessageCircle" className="text-primary" size={20} />
                  </div>
                  <span className="font-medium">Техподдержка</span>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
              </div>

              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setActiveSection('admin')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <Icon name="Shield" className="text-destructive" size={20} />
                  </div>
                  <span className="font-medium">Админ-панель</span>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-bold mb-3">О сервисе</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Получайте бонусы за оформление карт и приглашение друзей
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Info" size={14} />
                <span>Версия 1.0.0</span>
              </div>
            </Card>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveSection('menu')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Техподдержка</h1>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20 text-center">
              <Icon name="Headphones" className="text-primary mx-auto mb-3" size={48} />
              <h2 className="font-bold text-xl mb-2">Нужна помощь?</h2>
              <p className="text-sm text-muted-foreground">
                Напишите нам, и мы ответим в течение 24 часов
              </p>
            </Card>

            <Card className="p-5">
              <h3 className="font-bold mb-3">Контакты поддержки</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                  <Icon name="Send" className="text-primary" size={20} />
                  <div>
                    <p className="text-sm font-medium">Telegram</p>
                    <p className="text-xs text-muted-foreground">@Alfa_Bank778</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-bold mb-3">Написать сообщение</h3>
              <div className="space-y-3">
                <Input placeholder="Тема обращения" />
                <Textarea placeholder="Опишите вашу проблему..." rows={5} />
                <Button className="w-full">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить сообщение
                </Button>
              </div>
            </Card>
          </div>
        );

      case 'admin':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveSection('menu')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Админ-панель</h1>
            </div>

            <Alert className="bg-destructive/10 border-destructive/20">
              <Icon name="Shield" className="text-destructive" size={18} />
              <AlertDescription className="text-sm">
                Доступ только для администраторов
              </AlertDescription>
            </Alert>

            <Card className="p-5">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="Clock" className="text-primary" size={20} />
                Заявки на вывод
              </h3>
              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    user: 'Иван Петров',
                    phone: '+7 900 123-45-67',
                    bank: 'Сбербанк',
                    amount: 1000,
                    date: '2025-10-29 15:30'
                  }
                ].map((request) => (
                  <Card key={request.id} className="p-4 border-primary/20">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{request.user}</span>
                        <Badge variant="secondary">Ожидает</Badge>
                      </div>
                      <Separator />
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Сумма:</span>
                          <span className="font-bold text-primary">{request.amount} ₽</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Телефон:</span>
                          <span className="font-mono">{request.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Банк:</span>
                          <span>{request.bank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Дата:</span>
                          <span>{request.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Icon name="Check" size={16} className="mr-1" />
                          Одобрить
                        </Button>
                        <Button size="sm" variant="destructive" className="flex-1">
                          <Icon name="X" size={16} className="mr-1" />
                          Отклонить
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto pb-24">
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border shadow-lg">
        <div className="grid grid-cols-6 gap-1 p-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="px-4 pb-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => setActiveSection('menu')}
          >
            <Icon name="Menu" size={16} className="mr-2" />
            Меню
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
