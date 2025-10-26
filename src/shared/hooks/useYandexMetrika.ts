import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        ym: (counterId: number, method: string, ...args: any[]) => void;
    }
}

const YANDEX_METRIKA_ID = 104853379;

/**
 * Hook для отслеживания переходов между страницами в Yandex Метрике
 * Автоматически отправляет hit при изменении URL
 */
export const useYandexMetrika = () => {
    const location = useLocation();

    useEffect(() => {
        // Проверяем, что Yandex Метрика загружена
        if (typeof window.ym === 'function') {
            // Отправляем hit при переходе на новую страницу
            window.ym(YANDEX_METRIKA_ID, 'hit', window.location.href, {
                title: document.title,
                referer: document.referrer,
            });

            console.log('[Yandex Metrika] Page view:', window.location.href);
        }
    }, [location]);
};

/**
 * Функция для отправки кастомных целей в Yandex Метрику
 * @param target - название цели
 * @param params - дополнительные параметры
 */
export const reachGoal = (target: string, params?: Record<string, any>) => {
    if (typeof window.ym === 'function') {
        window.ym(YANDEX_METRIKA_ID, 'reachGoal', target, params);
        console.log('[Yandex Metrika] Goal reached:', target, params);
    }
};
