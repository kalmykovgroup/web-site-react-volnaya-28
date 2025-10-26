import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../public/site-config.json'), 'utf-8')
);

const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": config.company.name,
    "legalName": config.company.fullName,
    "description": config.site.description,
    "url": config.site.url,
    "logo": `${config.site.url}/logo.svg`,
    "image": `${config.site.url}/og-image.png`,
    "telephone": config.company.phone,
    "email": config.company.email,
    "address": {
        "@type": "PostalAddress",
        "streetAddress": config.company.address,
        "addressLocality": config.company.city,
        "addressRegion": config.company.region,
        "postalCode": config.company.postalCode,
        "addressCountry": "RU"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "55.7747",
        "longitude": "37.7374"
    },
    "openingHours": config.company.workingHours,
    "priceRange": "₽₽",
    "currenciesAccepted": "RUB",
    "paymentAccepted": [
        config.payment.cash && "Наличные",
        config.payment.card && "Банковские карты",
        config.payment.online && "Онлайн оплата",
        config.payment.invoice && "По счету"
    ].filter(Boolean).join(", "),
    "taxID": config.company.inn,
    "identifier": {
        "@type": "PropertyValue",
        "propertyID": "ОГРНИП",
        "value": config.company.ogrn
    }
};

const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": config.site.url
    }]
};

const generateHTML = (config) => `<!doctype html>
<html lang="${config.site.lang}">
  <head>
    <meta charset="UTF-8" />

    <!-- CSP для разработки: разрешаем unsafe-eval для Vite HMR + Yandex Maps + Yandex Metrika -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://yandex.ru https://api-maps.yandex.ru https://mc.yandex.ru https://mc.yandex.com; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https: https://mc.yandex.ru https://mc.yandex.com; font-src 'self' data: https:; connect-src 'self' ws: wss: https: wss://mc.yandex.com https://mc.yandex.ru https://mc.yandex.com; frame-src https://yandex.ru https://api-maps.yandex.ru https://mc.yandex.com;">

    <!-- Favicon: SVG для современных браузеров -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Apple Touch Icon -->
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Web App Manifest -->
    <link rel="manifest" href="/manifest.json" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

    <!-- SEO Meta Tags -->
    <meta name="description" content="${config.site.description}" />
    <meta name="keywords" content="${config.site.keywords}" />
    <meta name="author" content="${config.site.author}" />
    <meta name="geo.region" content="RU-MOW" />
    <meta name="geo.placename" content="${config.company.city}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${config.social.ogType}" />
    <meta property="og:url" content="${config.site.url}/" />
    <meta property="og:site_name" content="${config.company.name}" />
    <meta property="og:title" content="${config.site.title}" />
    <meta property="og:description" content="${config.site.description}" />
    <meta property="og:image" content="${config.site.url}/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${config.site.locale}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="${config.social.twitterCard}" />
    <meta name="twitter:title" content="${config.site.title}" />
    <meta name="twitter:description" content="${config.site.description}" />
    <meta name="twitter:image" content="${config.site.url}/og-image.png" />

    <!-- Security -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    
    <!-- PWA -->
    <meta name="theme-color" content="${config.site.themeColor}" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="${config.company.name}" />
    
    <!-- Resource Hints для оптимизации загрузки -->
${config.api.dnsPrefetch.length > 0 ? config.api.dnsPrefetch.map(url => `    <link rel="preconnect" href="${url}" />\n    <link rel="dns-prefetch" href="${url}" />`).join('\n') : ''}

    <!-- Preconnect для Yandex Maps -->
    <link rel="preconnect" href="https://yandex.ru" crossorigin />
    <link rel="preconnect" href="https://api-maps.yandex.ru" crossorigin />
    <link rel="dns-prefetch" href="https://yandex.ru" />
    <link rel="dns-prefetch" href="https://api-maps.yandex.ru" />

    <!-- Structured Data -->
    <script type="application/ld+json">
      ${JSON.stringify(structuredData, null, 2)}
    </script>
    
    <script type="application/ld+json">
      ${JSON.stringify(breadcrumbData, null, 2)}
    </script>
    
    <title>${config.site.title}</title>

    <!-- Yandex.Metrika counter -->
    <script type="text/javascript">
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

      ym(104853379, 'init', {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        ecommerce:"dataLayer"
      });
    </script>
    <!-- /Yandex.Metrika counter -->
  </head>
  <body>
    <noscript><div><img src="https://mc.yandex.ru/watch/104853379" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <noscript>
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h1>JavaScript Required</h1>
        <p>Для работы магазина <strong>${config.company.name}</strong> необходимо включить JavaScript.</p>
        <hr style="margin: 20px 0;" />
        <p><strong>Контакты:</strong></p>
        <p>📞 <a href="tel:${config.company.phone}">${config.company.phone}</a></p>
        <p>📧 <a href="mailto:${config.company.email}">${config.company.email}</a></p>
        <p>📍 ${config.company.address}</p>
        <p>${config.company.workingHours}</p>
      </div>
    </noscript>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

const html = generateHTML(config);
fs.writeFileSync(path.resolve(__dirname, '../index.html'), html, 'utf-8');

console.log('✅ index.html успешно создан!');
console.log(`🏢 ${config.company.fullName}`);
console.log(`📞 ${config.company.phone}`);
console.log(`📧 ${config.company.email}`);