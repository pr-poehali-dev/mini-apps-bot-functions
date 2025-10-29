import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

type Section = 'home' | 'profile' | 'settings' | 'history' | 'help' | 'catalog';

interface MenuItem {
  id: Section;
  label: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'catalog', label: 'Каталог', icon: 'ShoppingBag' },
  { id: 'history', label: 'История', icon: 'Clock' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
  { id: 'help', label: 'Помощь', icon: 'HelpCircle' },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Добро пожаловать!</h1>
              <p className="text-muted-foreground">Выберите нужный раздел для работы</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Card 
                className="p-4 hover-scale cursor-pointer transition-all hover:shadow-md"
                onClick={() => setActiveSection('catalog')}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="ShoppingBag" className="text-primary" size={24} />
                  </div>
                  <span className="font-medium text-sm">Каталог</span>
                </div>
              </Card>

              <Card 
                className="p-4 hover-scale cursor-pointer transition-all hover:shadow-md"
                onClick={() => setActiveSection('history')}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon name="Clock" className="text-secondary" size={24} />
                  </div>
                  <span className="font-medium text-sm">История</span>
                </div>
              </Card>

              <Card 
                className="p-4 hover-scale cursor-pointer transition-all hover:shadow-md"
                onClick={() => setActiveSection('profile')}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <Icon name="User" className="text-accent-foreground" size={24} />
                  </div>
                  <span className="font-medium text-sm">Профиль</span>
                </div>
              </Card>

              <Card 
                className="p-4 hover-scale cursor-pointer transition-all hover:shadow-md"
                onClick={() => setActiveSection('help')}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Icon name="HelpCircle" className="text-muted-foreground" size={24} />
                  </div>
                  <span className="font-medium text-sm">Помощь</span>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="Bell" className="text-primary-foreground" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1">Новое обновление!</h3>
                  <p className="text-xs text-muted-foreground">
                    Добавлены новые функции в каталог. Проверьте сейчас!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'catalog':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveSection('home')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h2 className="text-xl font-bold">Каталог</h2>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge variant="default" className="cursor-pointer whitespace-nowrap">Все</Badge>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">Популярное</Badge>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">Новинки</Badge>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">Акции</Badge>
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="p-4 hover:shadow-md transition-all">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon name="Package" className="text-muted-foreground" size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-1">Товар {item}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Описание товара для примера
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">₽ {item * 100}</span>
                        <Button size="sm">
                          <Icon name="ShoppingCart" size={16} className="mr-1" />
                          Купить
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveSection('home')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h2 className="text-xl font-bold">Профиль</h2>
            </div>

            <Card className="p-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    ИП
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-bold text-lg">Иван Петров</h3>
                  <p className="text-sm text-muted-foreground">@ivan_petrov</p>
                </div>
              </div>
            </Card>

            <Card className="divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-muted-foreground" size={20} />
                  <span className="text-sm">Email</span>
                </div>
                <span className="text-sm font-medium">ivan@example.com</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-muted-foreground" size={20} />
                  <span className="text-sm">Телефон</span>
                </div>
                <span className="text-sm font-medium">+7 900 123-45-67</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-muted-foreground" size={20} />
                  <span className="text-sm">Город</span>
                </div>
                <span className="text-sm font-medium">Москва</span>
              </div>
            </Card>

            <Button variant="outline" className="w-full">
              <Icon name="Edit" size={16} className="mr-2" />
              Редактировать профиль
            </Button>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveSection('home')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h2 className="text-xl font-bold">История</h2>
            </div>

            <div className="space-y-3">
              {[
                { date: 'Сегодня', time: '14:30', action: 'Просмотр каталога', icon: 'Eye' },
                { date: 'Сегодня', time: '12:15', action: 'Покупка товара #123', icon: 'ShoppingCart' },
                { date: 'Вчера', time: '18:45', action: 'Изменение профиля', icon: 'Edit' },
                { date: 'Вчера', time: '10:20', action: 'Просмотр истории', icon: 'Clock' },
              ].map((item, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} className="text-primary" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm mb-1">{item.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.date} в {item.time}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveSection('home')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h2 className="text-xl font-bold">Настройки</h2>
            </div>

            <Card className="divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Bell" className="text-muted-foreground" size={20} />
                  <span className="text-sm">Уведомления</span>
                </div>
                <div className="w-10 h-6 rounded-full bg-primary relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Moon" className="text-muted-foreground" size={20} />
                  <span className="text-sm">Темная тема</span>
                </div>
                <div className="w-10 h-6 rounded-full bg-muted relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Globe" className="text-muted-foreground" size={20} />
                  <span className="text-sm">Язык</span>
                </div>
                <span className="text-sm font-medium">Русский</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Lock" className="text-muted-foreground" size={20} />
                  <span className="text-sm">Безопасность</span>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground" size={16} />
              </div>
            </Card>

            <Separator />

            <Button variant="destructive" className="w-full">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти из аккаунта
            </Button>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-4 p-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveSection('home')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h2 className="text-xl font-bold">Помощь</h2>
            </div>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex gap-3">
                <Icon name="MessageCircle" className="text-primary flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium mb-1">Нужна помощь?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Напишите нам, и мы ответим в течение 24 часов
                  </p>
                  <Button size="sm">
                    Написать в поддержку
                  </Button>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <h3 className="font-medium text-sm px-1">Часто задаваемые вопросы</h3>
              <Card className="divide-y">
                {[
                  'Как сделать заказ?',
                  'Способы оплаты',
                  'Условия доставки',
                  'Возврат товара',
                  'Гарантия на товар',
                ].map((question, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors">
                    <span className="text-sm">{question}</span>
                    <Icon name="ChevronRight" className="text-muted-foreground" size={16} />
                  </div>
                ))}
              </Card>
            </div>

            <Card className="divide-y">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Mail" className="text-primary" size={20} />
                  <span className="font-medium text-sm">Email</span>
                </div>
                <p className="text-sm text-muted-foreground">support@example.com</p>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Phone" className="text-primary" size={20} />
                  <span className="font-medium text-sm">Телефон</span>
                </div>
                <p className="text-sm text-muted-foreground">8 800 555-35-35</p>
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
      <div className="flex-1 overflow-y-auto pb-20">
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border">
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
      </nav>
    </div>
  );
};

export default Index;
