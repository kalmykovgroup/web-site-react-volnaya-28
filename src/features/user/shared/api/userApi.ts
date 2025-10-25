// src/shared/api/userApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';

// Типы

import {API} from "@app/providers/endpoints.ts";
import type {GetAllUsersRequest} from "@/features/user/dtos/User/GetAllUsersRequest.ts";
import {axiosBaseQuery} from "@/baseApi/baseQuery.ts";
import type {UserDto} from "@/features/user/dtos/User/UserDto.ts";
import type {ApiResponse} from "@/baseApi/ApiResponse.ts";
import type {GetUserByIdRequest} from "@/features/user/dtos/User/GetUserByIdRequest.ts";
import type {GetUserByEmailRequest} from "@/features/user/dtos/User/GetUserByEmailRequest.ts";
import type {UserExistsRequest} from "@/features/user/dtos/User/UserExistsRequest.ts";
import type {CreateUserRequest} from "@/features/user/dtos/User/CreateUserRequest.ts";
import type {UpdateUserRequest} from "@/features/user/dtos/User/UpdateUserRequest.ts";
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['User'],

    endpoints: (builder) => ({
        getAllUsers: builder.query<UserDto[], GetAllUsersRequest | void>({
            query: (params) => ({
                url: API.USER.GET_ALL,
                method: 'get',
                params,
            }),
            providesTags: ['User'],
        }),

        // По контроллеру: id — отдельным аргументом метода, запросные параметры — через [FromQuery]
        getUserById: builder.query<
            ApiResponse<UserDto>,
            { id: string; request?: GetUserByIdRequest }
        >({
            query: ({ id, request }) => ({
                url: API.USER.BY_ID(id),
                method: 'get',
                params: { id, ...(request ?? {}) }
            }),
            providesTags: (_res, _err, arg) => [{ type: 'User', id: arg.id }],
        }),

        getUserByEmail: builder.query<
            ApiResponse<UserDto>,
            { email: string; request?: GetUserByEmailRequest }
        >({
            query: ({ email, request }) => ({
                url: API.USER.BY_EMAIL,
                method: 'get',
                params: { email, ...(request ?? {}) },
            }),
            providesTags: ['User'],
        }),

        userExists: builder.query<boolean, UserExistsRequest>({
            query: (params) => ({
                url: API.USER.EXISTS,
                method: 'get',
                params,
            }),
        }),

        createUser: builder.mutation<boolean, CreateUserRequest>({
            query: (body) => ({
                url: API.USER.CREATE,
                method: 'post',
                data: body,
            }),
            invalidatesTags: ['User'],
        }),

        updateUser: builder.mutation<
            ApiResponse<boolean>,
            { id: string; body: UpdateUserRequest }
        >({
            // Контроллер ожидает Guid id как аргумент метода + тело запроса.
            // Роут без "/{id}", поэтому передаём id в query string.
            query: ({ id, body }) => ({
                url: API.USER.UPDATE(id),
                method: 'put',
                data: body,
                params: { id },
            }),
            invalidatesTags: (_res, _err, arg) => [{ type: 'User', id: arg.id }],
        }),

        deleteUser: builder.mutation<boolean, { id: string }>({
            query: ({ id }) => ({
                url: API.USER.DELETE(id),
                method: 'delete',
                params: { id },
            }),
            invalidatesTags: (_res, _err, arg) => [{ type: 'User', id: arg.id }],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useGetUserByEmailQuery,
    useUserExistsQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
