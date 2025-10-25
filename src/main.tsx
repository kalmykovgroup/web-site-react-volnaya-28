
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import {apiClient} from "@/baseApi/apiClient.ts";
import {setStoreForInterceptors, setupInterceptors} from "@/baseApi/interceptors.ts";
import {persistor, store} from "@/store.ts";
// Передаём store в interceptors и настраиваем
setStoreForInterceptors(store);
setupInterceptors(apiClient);


// Функциональный компонент для инициализации Persist (сброс transient полей после rehydrate)

createRoot(document.getElementById('root')!).render(
    /**
     * Корневой рендер приложения.
     *
     * Оборачиваем всё приложение в Redux Provider — чтобы сделать Redux store доступным для всех компонентов.
     * PersistGate с loading={null} не блокирует рендеринг, позволяя приложению загружаться быстрее.
     * Состояние восстанавливается в фоне, что улучшает First Contentful Paint.
     */
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
)