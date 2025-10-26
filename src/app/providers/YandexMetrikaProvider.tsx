import React from 'react';
import { useYandexMetrika } from '@/shared/hooks/useYandexMetrika';

interface YandexMetrikaProviderProps {
    children: React.ReactNode;
}

/**
 * Provider для Yandex Метрики
 * Автоматически отслеживает переходы между страницами
 */
export const YandexMetrikaProvider: React.FC<YandexMetrikaProviderProps> = ({ children }) => {
    // Подключаем hook для отслеживания навигации
    useYandexMetrika();

    return <>{children}</>;
};
