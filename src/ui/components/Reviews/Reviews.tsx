// src/components/Reviews/Reviews.tsx
import React from 'react';
import styles from './Reviews.module.css';
import { AnimatedSection } from '@ui/components/AnimatedSection/AnimatedSection.tsx';

export const Reviews: React.FC = () => {
    const YANDEX_MAPS_URL = 'https://yandex.ru/maps/org/stroykhozmag/14880330809/';

    return (
        <section id="reviews" className={styles.reviews}>
            <div className={styles.container}>
                <AnimatedSection delay={700} direction="up">
                    <div className={styles.header}>
                        <h3 className={styles.title}>Отзывы наших клиентов</h3>

                        <a
                            href={YANDEX_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            Смотреть все отзывы на Яндекс.Картах →
                        </a>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={900} direction="up">
                    <div className={styles.yandexWidget}>
                        <iframe
                            style={{
                                width: '100%',
                                height: '100%',
                                border: '1px solid #e6e6e6',
                                borderRadius: '8px',
                                boxSizing: 'border-box'
                            }}
                            src="https://yandex.ru/maps-reviews-widget/14880330809?comments"
                            title="Отзывы СтройХозМаг"
                        />
                        <a
                            href={YANDEX_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                boxSizing: 'border-box',
                                textDecoration: 'none',
                                color: '#b3b3b3',
                                fontSize: '10px',
                                fontFamily: 'YS Text, sans-serif',
                                padding: '0 16px',
                                position: 'absolute',
                                bottom: '8px',
                                width: '100%',
                                textAlign: 'center',
                                left: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: 'block',
                                maxHeight: '14px',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            СтройХозМаг на карте Москвы — Яндекс Карты
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};