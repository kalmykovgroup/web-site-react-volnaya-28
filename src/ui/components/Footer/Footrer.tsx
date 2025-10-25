// src/components/Footer/Footer.tsx
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';
import Logo from "@ui/components/Logo/Logo.tsx";

export const Footer: React.FC = () => {
    return (
        <footer id="about" className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div>
                        <h3 className={styles.title}>
                            <div className={styles.titleIcon}>
                                <Logo/>
                            </div>
                            О нас
                        </h3>
                        <div className={styles.about}>
                            <p>
                                <strong>СтройХозМаг</strong> — это магазин, где вы найдёте всё необходимое для дома, ремонта и строительства. Мы работаем с 2023 года и за это время заслужили доверие клиентов.
                            </p>
                            <p>
                                Наш широкий ассортимент включает строительные материалы, инструменты, сантехнику, электрику, товары для кухни, бытовую химию, канцелярию и многое другое.
                            </p>
                            <div className={styles.info}>
                                <p>
                                    <strong>ИП Калмыкова Анна Олеговна</strong><br/>
                                    ИНН: 771877556532<br/>
                                    ОГРНИП: 323774600215422<br/>
                                    Дата регистрации: 3 апреля 2023 г.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div id="contacts">
                        <h3 className={styles.title}>Контакты</h3>
                        <div className={styles.contacts}>
                            <div className={styles.contactItem}>
                                <div className={`${styles.contactIcon} ${styles.contactIconGreen}`}>
                                    <Phone className={styles.contactIconSvg} />
                                </div>
                                <div>
                                    <h4 className={styles.contactTitle}>Телефоны</h4>
                                    <a href="tel:+79256427586" className={styles.contactLink}>+7 (925) 564-75-86</a>
                                    <p className={styles.contactNote}>Ежедневно с 9:00 до 21:00</p>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={`${styles.contactIcon} ${styles.contactIconYellow}`}>
                                    <Mail className={styles.contactIconSvg} />
                                </div>
                                <div>
                                    <h4 className={styles.contactTitle}>Электронная почта</h4>
                                    <a href="mailto:anna@kalmykov-group.ru" className={styles.contactLink}>anna@kalmykov-group.ru</a>
                                    <p className={styles.contactNote}>Ответим в течение 24 часов</p>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={`${styles.contactIcon} ${styles.contactIconGreen}`}>
                                    <MapPin className={styles.contactIconSvg} />
                                </div>
                                <div>
                                    <h4 className={styles.contactTitle}>Адрес магазина</h4>
                                    <p className={styles.contactAddress}>
                                        г. Москва, ул. Вольная, д. 28/4к3<br/>
                                        <span>Район "Соколиная гора"</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.copyright}>
                <div className={styles.container}>
                    <p>© 2023-2025 СтройХозМаг. Все права защищены. ИП Калмыкова Анна Олеговна</p>
                </div>
            </div>
        </footer>
    );
};