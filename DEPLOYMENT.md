# Инструкция по деплою

## Проблема с sitemap.xml и статическими файлами

При деплое SPA (Single Page Application) на React, все запросы по умолчанию перенаправляются на `index.html`, что делает недоступными статические файлы типа `sitemap.xml`, `robots.txt` и т.д.

## Решение

В проекте подготовлены конфигурационные файлы для различных веб-серверов и хостингов.

---

## 1. Nginx (Рекомендуется)

### Файл: `nginx.conf`

**Инструкция:**

1. Скопируйте `nginx.conf` в вашу конфигурацию nginx (обычно `/etc/nginx/sites-available/volnaya-28.ru`)

2. Измените следующие параметры:
   ```nginx
   # Укажите пути к SSL сертификатам
   ssl_certificate /path/to/your/certificate.crt;
   ssl_certificate_key /path/to/your/private.key;

   # Укажите путь к собранному проекту
   root /path/to/website/dist;
   ```

3. Создайте символическую ссылку:
   ```bash
   sudo ln -s /etc/nginx/sites-available/volnaya-28.ru /etc/nginx/sites-enabled/
   ```

4. Проверьте конфигурацию:
   ```bash
   sudo nginx -t
   ```

5. Перезапустите nginx:
   ```bash
   sudo systemctl reload nginx
   ```

### Ключевые моменты конфигурации:

- **Статические файлы** (`.xml`, `.txt`, `.json`) отдаются напрямую через `try_files $uri =404`
- **Service Worker файлы** не кэшируются (`no-cache`)
- **Остальные запросы** перенаправляются на `index.html` для React Router

---

## 2. Apache (.htaccess)

### Файл: `public/.htaccess`

Файл `.htaccess` автоматически копируется в `dist/` при сборке проекта.

**Инструкция:**

1. Убедитесь, что модули Apache включены:
   ```bash
   sudo a2enmod rewrite headers deflate expires mime
   sudo systemctl restart apache2
   ```

2. В конфигурации Apache для вашего сайта должно быть:
   ```apache
   <Directory /path/to/website/dist>
       AllowOverride All
       Require all granted
   </Directory>
   ```

3. Деплойте проект - `.htaccess` уже будет в папке `dist/`

### Ключевые правила:

- `RewriteCond %{REQUEST_FILENAME} -f` - если файл существует, отдаем его
- Если файла нет - перенаправляем на `index.html`
- Настроено кэширование и сжатие

---

## 3. Netlify

### Файл: `public/_redirects`

Файл `_redirects` автоматически копируется в `dist/` при сборке.

**Инструкция:**

1. Просто деплойте проект на Netlify
2. Файл `dist/_redirects` будет автоматически обработан Netlify
3. Никаких дополнительных настроек не требуется

### Правила редиректов:

```
/sitemap.xml /sitemap.xml 200
/robots.txt /robots.txt 200
/* /index.html 200
```

---

## 4. Vercel

### Создайте файл: `vercel.json` (опционально)

Если используете Vercel, создайте в корне проекта `vercel.json`:

```json
{
  "routes": [
    {
      "src": "/sitemap.xml",
      "dest": "/sitemap.xml"
    },
    {
      "src": "/robots.txt",
      "dest": "/robots.txt"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/sw.js",
      "dest": "/sw.js",
      "headers": {
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## Проверка после деплоя

После деплоя проверьте доступность файлов:

### 1. Sitemap
```
https://volnaya-28.ru/sitemap.xml
```
Должен вернуть XML файл, а не страницу 404

### 2. Robots.txt
```
https://volnaya-28.ru/robots.txt
```

### 3. Manifest
```
https://volnaya-28.ru/manifest.json
```

### 4. Service Worker
```
https://volnaya-28.ru/sw.js
```

### 5. PWA установка

1. Откройте сайт в Chrome/Edge
2. В адресной строке должна появиться иконка установки (+)
3. Или через меню: "Установить приложение"

### 6. DevTools проверка

**Chrome DevTools (F12):**

1. **Application → Manifest**
   - Должен отображаться manifest.json с иконками

2. **Application → Service Workers**
   - Должен быть активный Service Worker

3. **Network → Disable cache**
   - Проверьте, что статические файлы кэшируются правильно

4. **Lighthouse**
   - Запустите аудит PWA
   - Должны быть выполнены все критерии PWA

---

## Отправка в поисковые системы

### Яндекс.Вебмастер

1. Зайдите на https://webmaster.yandex.ru/
2. Добавьте сайт https://volnaya-28.ru
3. Перейдите в "Индексирование → Файлы Sitemap"
4. Добавьте: `https://volnaya-28.ru/sitemap.xml`

### Google Search Console

1. Зайдите на https://search.google.com/search-console
2. Добавьте сайт
3. Перейдите в "Файлы Sitemap"
4. Добавьте: `https://volnaya-28.ru/sitemap.xml`

---

## Структура файлов после сборки

```
dist/
├── index.html              # Главная страница
├── sitemap.xml            # ✅ Карта сайта для поисковиков
├── robots.txt             # ✅ Правила для роботов
├── manifest.json          # ✅ PWA манифест
├── .htaccess              # ✅ Конфигурация Apache
├── _redirects             # ✅ Конфигурация Netlify
├── sw.js                  # ✅ Service Worker
├── registerSW.js          # ✅ Регистрация SW
├── workbox-*.js           # Workbox библиотека
├── favicon.svg
├── apple-touch-icon.png
├── icon-*.png
└── assets/
    ├── *.js
    └── *.css
```

---

## Решение проблем

### Проблема: sitemap.xml возвращает 404

**Причина:** Веб-сервер перенаправляет все запросы на index.html

**Решение:**
- Для Nginx: используйте `nginx.conf` из проекта
- Для Apache: убедитесь что `.htaccess` скопирован и `AllowOverride All` включен
- Для Netlify: файл `_redirects` должен быть в корне `dist/`

### Проблема: PWA не предлагается установить

**Причины:**
1. Нет HTTPS (обязательно!)
2. Service Worker не зарегистрирован
3. Manifest.json недоступен

**Решение:**
1. Убедитесь что сайт на HTTPS
2. Проверьте в DevTools → Application → Service Workers
3. Проверьте доступность `/manifest.json`
4. Очистите кэш и перезагрузите страницу

### Проблема: Service Worker не обновляется

**Решение:**
1. Очистите кэш браузера
2. В DevTools → Application → Service Workers нажмите "Unregister"
3. Перезагрузите страницу
4. Проверьте что `Cache-Control` для sw.js = "no-cache"

---

## Полезные команды

### Сборка проекта
```bash
npm run build
```

### Тест production сборки локально
```bash
npm run preview
# Откройте http://localhost:4173
```

### Проверка файлов в dist
```bash
ls -la dist/
```

---

## Контакты и поддержка

При возникновении проблем проверьте:
1. Логи веб-сервера
2. Chrome DevTools → Console (ошибки)
3. Chrome DevTools → Network (какие файлы загружаются)
4. Chrome DevTools → Application (Service Worker статус)