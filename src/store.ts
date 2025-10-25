// store.ts - обновленная конфигурация
import {configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistStore, REGISTER, REHYDRATE} from 'redux-persist';
import {rootReducer} from './rootReducer';

import {authApi} from '@login/shared/api/authApi';
import {userApi} from "@/features/user/shared/api/userApi.ts";
import {PURGE} from "redux-persist/es/constants";
import {categoryApi} from "@/features/category/chared/api/categoryApi.ts";

export const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    // Игнорируем действия redux-persist
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    ignoredPaths: ['category.categories'],
                },
            }).concat(
                authApi.middleware,
                userApi.middleware,
                categoryApi.middleware,

            ),
        // Оптимизация для dev режима
        devTools: {
            // Ограничиваем историю действий для экономии памяти
            maxAge: 50, // хранить только последние 50 действий
            // Отключаем трассировку для производительности
            trace: false,
        },
    });


export const persistor = persistStore(store);

/**
 * ВАЖНО: типы объявляем и экспортируем прямо из store.ts
 * – это единая «точка правды».
 * В остальных файлах импортируйте их ТОЛЬКО как type-импорт:
 *   import type { RootState, AppDispatch } from '@/store/store';
 */

// КРИТИЧЕСКИ ВАЖНО: экспортируем типы ПОСЛЕ создания store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;