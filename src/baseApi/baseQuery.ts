import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { apiClient } from './apiClient';
import { extractErrorMessage, notify } from '@app/lib/notify';
import { decPending, incPending } from '@/uiSlice';
import { isApiResponse } from './helpers/isApiResponse';
import type { ApiError } from './helpers/ApiError';
import { fail } from './helpers/fail';
import { ok } from './helpers/ok';
import type {ApiResponse} from "@/baseApi/ApiResponse.ts";

export type AxiosBaseQueryArgs = {
    url: string;
    method?: Method | undefined;
    data?: unknown | undefined;
    params?: unknown | undefined;
    headers?: AxiosRequestConfig['headers'] | undefined;
    /** Блокировать ли UI для этого запроса (по умолчанию false) */
    lockUi?: boolean | undefined;
};

export const axiosBaseQuery = (): BaseQueryFn<AxiosBaseQueryArgs, unknown, ApiError> =>
    async (args, api) => {
        const method: Method = (args.method ?? 'GET') as Method;
        const { url, data, params, headers, lockUi = false } = args;

        if (lockUi) api.dispatch(incPending());

        try {
            //Строгая типизация заголовков
            const reqHeaders = { ...(headers ?? {}) } as Record<string, string>;

            // Проставляем Content-Type только если есть body
            if (data !== undefined && !reqHeaders['Content-Type']) {
                reqHeaders['Content-Type'] = 'application/json';
            }

            //Типизированный конфиг без undefined
            const cfg: AxiosRequestConfig = {
                url,
                method,
                withCredentials: true,
                signal: api.signal,
                ...(data !== undefined && { data }),
                ...(params !== undefined && { params }),
                ...(Object.keys(reqHeaders).length > 0 && { headers: reqHeaders }),
            };

            const res: AxiosResponse<ApiResponse> = await apiClient.request(cfg);
            const payload = res.data;

            // Проверяем обёрнутый ответ
            if (isApiResponse(payload)) {
                if (!payload.success) {
                    return fail({ status: res.status, data: payload });
                }
                return ok(payload.data ?? null);
            }

            // Необёрнутый ответ
            return ok(payload);
        } catch (e) {
            const err = e as AxiosError<unknown>;
            const payload = err.response?.data ?? err.message;
            notify.error(extractErrorMessage(payload));

            const status = err.response?.status;
            const errData: unknown = err.response?.data ?? err.message;
            return fail({ status, data: errData });
        } finally {
            if (lockUi) api.dispatch(decPending());
        }
    };