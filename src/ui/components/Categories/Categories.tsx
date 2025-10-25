import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './Categories.module.css';
import { AnimatedSection } from "@ui/components/AnimatedSection/AnimatedSection.tsx";
import { CategoryCard } from "@ui/components/Categories/CategoryCard/CategoryCard.tsx";
import { CategoryModal } from "@ui/components/CategoryModal";
import { useAppDispatch, useAppSelector } from "@/hooks.ts";
import {
    selectCategories,
    selectSelectedCategory,
    selectIsLoading,
    selectError,
    setSelectedCategory,
    fetchAllCategories
} from "@/features/category/store/categorySlice.ts";

const INITIAL_RETRY_INTERVAL = 5000; // 5 секунд
const MAX_RETRY_INTERVAL = 30000; // максимум 30 секунд
const MAX_RETRY_ATTEMPTS = 5; // максимум 5 попыток

// Вынесем чистую функцию за компонент
const getCurrentRetryInterval = (attempts: number) => {
    const interval = INITIAL_RETRY_INTERVAL * Math.pow(2, attempts);
    return Math.min(interval, MAX_RETRY_INTERVAL);
};

// Функция для определения направления анимации в зависимости от позиции
const getAnimationDirection = (index: number): 'up' | 'left' | 'right' => {
    // Для больших карточек - появление сверху
    if (index === 0 || index === 1 || index === 5 || index === 9) {
        return 'up';
    }
    // Для левых карточек
    if (index % 3 === 0) {
        return 'left';
    }
    // Для правых карточек
    if (index % 3 === 2) {
        return 'right';
    }
    // По умолчанию
    return 'up';
};

export const Categories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const selectedCategory = useAppSelector(selectSelectedCategory);
    const isLoading = useAppSelector(selectIsLoading);
    const error = useAppSelector(selectError);

    const [nextRetryIn, setNextRetryIn] = useState<number>(0);
    const [retryAttempts, setRetryAttempts] = useState<number>(0);


    const retryTimeoutRef = useRef<number  | null>(null);
    const countdownIntervalRef = useRef<number  | null>(null);
    const hasLoadedOnceRef = useRef<boolean>(false);

    // Обернём clearRetryTimers в useCallback
    const clearRetryTimers = useCallback(() => {
        if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current);
            retryTimeoutRef.current = null;
        }
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }
        setNextRetryIn(0);
    }, []);

    // Обернём scheduleRetry в useCallback
    const scheduleRetry = useCallback((currentAttempts: number) => {
        // Не запускаем таймер, если превышен лимит попыток
        if (currentAttempts >= MAX_RETRY_ATTEMPTS) {
            return;
        }

        const interval = getCurrentRetryInterval(currentAttempts);
        setNextRetryIn(interval / 1000);

        // Таймер обратного отсчёта
        countdownIntervalRef.current = setInterval(() => {
            setNextRetryIn(prev => {
                if (prev <= 1) {
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Таймер автоматической перезагрузки
        retryTimeoutRef.current = setTimeout(() => {
            setRetryAttempts(prev => prev + 1);
            dispatch(fetchAllCategories());
        }, interval);
    }, [dispatch]);

    // Обернём handleManualRetry в useCallback для оптимизации
    const handleManualRetry = useCallback(() => {
        clearRetryTimers();
        setRetryAttempts(0);
        dispatch(fetchAllCategories());
    }, [clearRetryTimers, dispatch]);

    // Обернём handleCloseModal в useCallback
    const handleCloseModal = useCallback(() => {
        dispatch(setSelectedCategory(undefined));
    }, [dispatch]);

    // Обернём handleCategoryClick в useCallback
    const handleCategoryClick = useCallback((category: typeof categories[0]) => {
        dispatch(setSelectedCategory(category));
    }, [dispatch]);

    // Первоначальная загрузка
    useEffect(() => {
        if (categories.length === 0 && !isLoading && error === undefined && !hasLoadedOnceRef.current) {
            hasLoadedOnceRef.current = true;
            dispatch(fetchAllCategories());
        }
    }, [categories.length, isLoading, error, dispatch]);

    // Обработка изменения состояния загрузки
    useEffect(() => {
        if (!isLoading) {
            if (error) {
                // Ошибка - планируем следующую попытку
                clearRetryTimers();
                scheduleRetry(retryAttempts);
            } else if (categories.length > 0) {
                // Успех - сбрасываем всё
                clearRetryTimers();
                setRetryAttempts(0);
            }
        }

        // Cleanup функция
        return () => clearRetryTimers();
    }, [isLoading, error, categories.length, retryAttempts, clearRetryTimers, scheduleRetry]);

    const maxAttemptsReached = retryAttempts >= MAX_RETRY_ATTEMPTS;
    const showError = error && !isLoading;

    return (
        <section id="categories" className={styles.categories}>
            {selectedCategory && (
                <CategoryModal
                    category={selectedCategory}
                    onClose={handleCloseModal}
                />
            )}

            <AnimatedSection delay={800} direction="up">
                <h3 className={styles.title}>Наш ассортимент</h3>
                <p className={styles.subtitle}>
                    Всё необходимое для дома, ремонта и быта в одном месте
                </p>
            </AnimatedSection>

            <div className={styles.gridWrapper}>
                {showError && (
                    <div className={styles.errorOverlay}>
                        <div className={styles.errorContainer}>
                            <div className={styles.errorIcon}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                    <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
                                    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <h4 className={styles.errorTitle}>Не удалось загрузить категории</h4>
                            <p className={styles.errorMessage}>{error}</p>

                            <div className={styles.errorActions}>
                                <button
                                    className={styles.retryButton}
                                    onClick={handleManualRetry}
                                >
                                    Повторить попытку
                                </button>

                                {maxAttemptsReached ? (
                                    <p className={styles.maxAttemptsText}>
                                        Превышено максимальное количество попыток ({MAX_RETRY_ATTEMPTS}).
                                        <br />
                                        Нажмите кнопку для ручной перезагрузки.
                                    </p>
                                ) : nextRetryIn > 0 ? (
                                    <div className={styles.retryInfo}>
                                        <p className={styles.autoRetryText}>
                                            Автоматическая попытка {retryAttempts + 1} из {MAX_RETRY_ATTEMPTS} через {nextRetryIn} сек
                                        </p>
                                        <div className={styles.progressBar}>
                                            <div
                                                className={styles.progressFill}
                                                style={{
                                                    width: `${(nextRetryIn / (getCurrentRetryInterval(retryAttempts) / 1000)) * 100}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.grid}>
                    {categories.length > 0 && !isLoading && !showError ? (
                        categories.map((category, index) => (
                            <AnimatedSection
                                key={category.id}
                                delay={100 + index * 50}
                                direction={getAnimationDirection(index)}
                            >
                                   <CategoryCard
                                       category={category}
                                       onClick={() => handleCategoryClick(category)}
                                       index={index + 1}
                                   />
                            </AnimatedSection>
                        ))
                    ) : (
                        [...Array(13)].map((_, i) => (
                            <div
                                key={`skeleton-${i}`}
                                className={`${styles.skeleton} ${showError ? styles.skeletonStatic : ''}`}
                                data-index={i + 1}
                            >
                                <div className={styles.skeletonImage} />
                                <div className={styles.skeletonContent}>
                                    <div className={styles.skeletonTitle} />
                                    <div className={styles.skeletonDesc} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};