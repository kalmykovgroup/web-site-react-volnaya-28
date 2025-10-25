import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';
import toast from 'react-hot-toast';
import { resetAuthState } from "@login/store/authSlice";
import type {AppDispatch} from "@/store.ts";

// Типизированная переменная вместо any
let appStore: { dispatch: AppDispatch } | null = null;

/**
 * Передача store в интерцепторы после его инициализации
 */
export const setStoreForInterceptors = (store: { dispatch: AppDispatch }): void => {
    appStore = store;
};

/**
 * Подключение промышленных интерцепторов
 */
export const setupInterceptors = (client: AxiosInstance): void => {
    // REQUEST
    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const headers = AxiosHeaders.from(config.headers);
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('X-Client-Type', 'web');

            config.headers = headers;
            config.withCredentials = true;
            return config;
        },
        (error: AxiosError): Promise<never> => Promise.reject(error)
    );

    // RESPONSE
    client.interceptors.response.use(
        (response) => response,
        (error: AxiosError): Promise<never> => {
            const status = error.response?.status;

            if (status === 401) {
                // Теперь TypeScript знает точный тип dispatch
                appStore?.dispatch(resetAuthState());
                toast.error('Сессия истекла. Выполните вход.');
            } else if (status === 403) {
                toast.error('Доступ запрещён.');
            } else if (status === 429) {
                toast.error('Слишком много запросов. Повторим автоматически…');
            } else if (typeof status === 'number' && status >= 500) {
                toast.error('Ошибка сервера. Будет выполнена повторная попытка.');
            }

            return Promise.reject(error);
        }
    );
};