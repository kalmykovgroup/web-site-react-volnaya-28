# Yandex Метрика - Инструкция по использованию

## ✅ Что уже настроено:

1. **Скрипт Yandex Метрики** добавлен в `index.html` (ID: 104853379)
2. **Автоматическое отслеживание** переходов между страницами через `useYandexMetrika` hook
3. **CSP настроен** для разрешения mc.yandex.ru

## 📊 Автоматическое отслеживание:

Метрика автоматически отслеживает:
- ✅ Переходы между страницами (через React Router)
- ✅ Клики по ссылкам
- ✅ Вебвизор (записи сессий пользователей)
- ✅ Карту кликов
- ✅ Точный показатель отказов

## 🎯 Отслеживание целей (Goals):

### Пример 1: Клик по кнопке "Купить"
```tsx
import { reachGoal } from '@/shared/hooks/useYandexMetrika';

const BuyButton = () => {
  const handleClick = () => {
    // Отправляем цель в Yandex Метрику
    reachGoal('BUY_CLICK', {
      product: 'Краска белая',
      price: 1500
    });

    // Ваша логика покупки
  };

  return <button onClick={handleClick}>Купить</button>;
};
```

### Пример 2: Открытие категории
```tsx
import { reachGoal } from '@/shared/hooks/useYandexMetrika';

const CategoryCard = ({ category }) => {
  const handleOpen = () => {
    reachGoal('CATEGORY_OPEN', {
      categoryName: category.title,
      categoryId: category.id
    });
  };

  return <div onClick={handleOpen}>{category.title}</div>;
};
```

### Пример 3: Отправка формы
```tsx
import { reachGoal } from '@/shared/hooks/useYandexMetrika';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    reachGoal('FORM_SUBMIT', {
      formType: 'contact'
    });

    // Отправка формы
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

## 🔧 Настройка целей в Яндекс Метрике:

1. Зайдите в https://metrika.yandex.ru/list
2. Выберите счётчик 104853379
3. Перейдите в "Цели" → "Добавить цель"
4. Выберите тип "JavaScript-событие"
5. Введите идентификатор цели (например, `BUY_CLICK`)

## 🐛 Отладка:

В консоли браузера вы увидите логи:
```
[Yandex Metrika] Page view: https://volnaya-28.ru/
[Yandex Metrika] Goal reached: BUY_CLICK {product: "Краска белая"}
```

## 📈 Дополнительные возможности:

### E-commerce отслеживание
```tsx
// Добавление товара в корзину
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  ecommerce: {
    add: {
      products: [{
        id: '123',
        name: 'Краска белая',
        price: 1500,
        category: 'Краски'
      }]
    }
  }
});
```

## ⚠️ Важно:

- Перед использованием целей их нужно создать в интерфейсе Яндекс Метрики
- Цели начнут учитываться через несколько часов после создания
- В режиме разработки проверяйте логи в консоли браузера
