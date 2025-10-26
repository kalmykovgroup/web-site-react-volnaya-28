// ============================================
// src/components/Header/Header.tsx
// Адаптивный header для всех устройств:
// - Mobile: < 768px (hamburger menu)
// - Tablet & Desktop: 768px+ (horizontal navigation)
// ============================================
import React, { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.css';
import Logo from '@ui/components/Logo/Logo.tsx';

interface HeaderProps {
    onCatalogClick: () => void;
    onAboutClick: () => void;
    onContactsClick: () => void;
    onReviewsClick: () => void;
    onMapClick: () => void;
    onTopClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
                                                  onCatalogClick,
                                                  onAboutClick,
                                                  onContactsClick,
                                                  onReviewsClick,
                                                  onMapClick,
                                                  onTopClick,
                                              }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Определяем мобильное устройство
    useEffect(() => {
        const checkMobile = (): void => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Анимация появления header
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Блокировка скролла когда меню открыто (только на мобильных)
    useEffect(() => {
        if (isMobile && isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile, isMobileMenuOpen]);

    // Закрытие меню по Escape (только на мобильных)
    useEffect(() => {
        if (!isMobile) return;

        const handleEscape = (event: KeyboardEvent): void => {
            if (event.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMobile, isMobileMenuOpen]);

    // Закрываем меню при переходе с мобильного на десктоп
    useEffect(() => {
        if (!isMobile && isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    }, [isMobile, isMobileMenuOpen]);

    const toggleMobileMenu = useCallback((): void => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback((): void => {
        setIsMobileMenuOpen(false);
    }, []);

    // Обёртка для навигационных обработчиков - закрывает меню после клика
    const handleNavClick = useCallback(
        (callback: () => void) => (): void => {
            callback();
            if (isMobile) {
                closeMobileMenu();
            }
        },
        [isMobile, closeMobileMenu]
    );

    return (
        <>
            <header
                className={`${styles.header} ${isVisible ? styles.visible : ''}`}
                role="banner"
            >
                <div className={styles.container}>
                    {/* Logo */}
                    <div
                        className={styles.logo}
                        onClick={handleNavClick(onTopClick)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleNavClick(onTopClick)();
                            }
                        }}
                        aria-label="Перейти на главную страницу"
                    >
                        <div className={styles.logoIcon}>
                            <Logo onTopClick={onTopClick} />
                        </div>
                    </div>

                    {/* Hamburger Button - только для мобильных < 768px */}
                    {isMobile && (
                        <button
                            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
                            onClick={toggleMobileMenu}
                            type="button"
                            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-navigation"
                        >
                            <span className={styles.hamburgerLine} />
                            <span className={styles.hamburgerLine} />
                            <span className={styles.hamburgerLine} />
                        </button>
                    )}

                    {/* Navigation */}
                    <nav
                        id="mobile-navigation"
                        className={`${styles.nav} ${isMobile && isMobileMenuOpen ? styles.open : ''}`}
                        role="navigation"
                        aria-label="Основная навигация"
                    >
                        <button
                            onClick={handleNavClick(onCatalogClick)}
                            className={styles.navLink}
                            type="button"
                        >
                            Каталог
                        </button>
                        <button
                            onClick={handleNavClick(onReviewsClick)}
                            className={styles.navLink}
                            type="button"
                        >
                            Отзывы
                        </button>
                        <button
                            onClick={handleNavClick(onMapClick)}
                            className={styles.navLink}
                            type="button"
                        >
                            Как нас найти
                        </button>
                        <button
                            onClick={handleNavClick(onAboutClick)}
                            className={styles.navLink}
                            type="button"
                        >
                            О нас
                        </button>
                        <button
                            onClick={handleNavClick(onContactsClick)}
                            className={styles.navLink}
                            type="button"
                        >
                            Контакты
                        </button>
                    </nav>
                </div>
            </header>

            {/* Overlay для закрытия меню при клике вне его - только на мобильных */}
            {isMobile && isMobileMenuOpen && (
                <div
                    className={`${styles.overlay} ${styles.visible}`}
                    onClick={closeMobileMenu}
                    role="presentation"
                    aria-hidden="true"
                />
            )}
        </>
    );
};