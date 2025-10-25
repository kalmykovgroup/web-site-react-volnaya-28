// src/shared/api/categoryApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '@app/providers/endpoints';
import { axiosBaseQuery } from '@/baseApi/baseQuery';
import type {CategoryDto} from "@category/chared/contracts/CategoryDto.ts";


export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Category'],

    endpoints: (builder) => ({
        getAllCategories: builder.query<CategoryDto[], void>({
            query: (params) => ({
                url: API.CATEGORY.GET_ALL,
                method: 'get',
                params,
            }),
            providesTags: ['Category'],
        }),
     }),
});

export const {
    useGetAllCategoriesQuery,
} = categoryApi;