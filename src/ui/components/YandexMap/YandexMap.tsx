// src/components/YandexMap/YandexMap.tsx
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import styles from './YandexMap.module.css';

// Координаты магазина: г. Москва, ул. Вольная, д. 28/4к3
const SHOP_COORDINATES = {
    lat: 55.775105,
    lon: 37.738054
};

// Уровень масштабирования карты (10-19, где 17-18 оптимально для улицы)
const MAP_ZOOM = 17;

// URL для построения маршрута в Яндекс.Картах
const YANDEX_MAPS_URL = `https://yandex.ru/maps/?pt=${SHOP_COORDINATES.lon},${SHOP_COORDINATES.lat}&z=${MAP_ZOOM}&l=map`;

// URL для построения маршрута от текущего местоположения
const YANDEX_ROUTE_URL = `https://yandex.ru/maps/?rtext=~${SHOP_COORDINATES.lat},${SHOP_COORDINATES.lon}&rtt=auto`;

export const YandexMap: React.FC = () => {
    const handleBuildRoute = (): void => {
        window.open(YANDEX_ROUTE_URL, '_blank', 'noopener,noreferrer');
    };

    const handleOpenMap = (): void => {
        window.open(YANDEX_MAPS_URL, '_blank', 'noopener,noreferrer');
    };

    return (
        <section id="map" className={styles.section}>
            <div className={styles.container}>
                <h3 className={styles.title}>Как нас найти</h3>
                <p className={styles.subtitle}>
                    Приезжайте к нам в магазин или постройте маршрут онлайн
                </p>

                <div className={styles.mapContainer}>
                    <div className={styles.mapWrapper}>
                        <iframe
                            src={`https://yandex.ru/map-widget/v1/?ll=${SHOP_COORDINATES.lon}%2C${SHOP_COORDINATES.lat}&z=${MAP_ZOOM}&pt=${SHOP_COORDINATES.lon}%2C${SHOP_COORDINATES.lat}~pm2rdm`}
                            width="100%"
                            height="400"
                            frameBorder="0"
                            title="Яндекс Карта"
                            className={styles.mapIframe}
                            allowFullScreen
                        />
                    </div>

                    <div className={styles.info}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>
                                <MapPin className={styles.icon} />
                            </div>
                            <div>
                                <h4 className={styles.infoTitle}>Адрес магазина</h4>
                                <p className={styles.infoText}>г. Москва, ул. Вольная, д. 28/4к3</p>
                                <p className={styles.infoHours}>Ежедневно с 9:00 до 21:00</p>
                            </div>
                        </div>

                        <button
                            onClick={handleBuildRoute}
                            className={styles.routeButton}
                            type="button"
                        >
                            <Navigation className={styles.buttonIcon} />
                            Построить маршрут
                        </button>

                        <button
                            onClick={handleOpenMap}
                            className={styles.mapLink}
                            type="button"
                        >
                            Открыть в Яндекс.Картах →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};