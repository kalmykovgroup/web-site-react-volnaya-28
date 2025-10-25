import type {ApiError} from "@/baseApi/helpers/ApiError.ts";

export const fail = (args: { status?: number | undefined; data: unknown }) => {
    const { status, data } = args;
    return {
        error: (status === undefined ? { data } : { status, data }) as ApiError,
    } as const;
};