import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../public/site-config.json'), 'utf-8')
);

const manifest = {
    "name": config.company.name,
    "short_name": config.company.name,
    "description": config.site.description,
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": config.site.themeColor,
    "orientation": "portrait-primary",
    "icons": [
        {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "/icon-192-maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "/icon-512-maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ],
    "categories": ["shopping", "business"],
    "screenshots": []
};

fs.writeFileSync(
    path.resolve(__dirname, '../public/manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8'
);

console.log('✅ manifest.json успешно создан!');