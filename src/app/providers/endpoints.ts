import type {Guid} from "@app/lib/types/Guid.ts";

export const API = {

    CATEGORY:{
        GET_ALL: `/api/categories/all`,
    },
    PERMISSION: {
        GET_ALL: `/api/user/permission/all`,
        BY_ID: (id: Guid) => `/api/user/permission/${id}`,
        CREATE: `/api/user/permission/add`,
        UPDATE: (id: Guid) => `/api/user/permission/update/${id}`,
        DELETE: (id: Guid) => `/api/user/permission/delete/${id}`,
    },
    ROLE: {
        GET_ALL: `/api/user/role/all`,
        BY_ID: (id: Guid) => `/api/user/role/${id}`,
        CREATE: `/api/user/role/add`,
        UPDATE: (id: Guid) => `/api/user/role/update/${id}`,
        DELETE: (id: Guid) => `/api/user/role/delete/${id}`,
    },
    USER_ROLE: {
        CREATE: `/api/user-role/create`,
        DELETE: (id: Guid) => `/api/user-role/delete/${id}`,
    },
    USER: {
        LOGIN: `/api/user/login`,
        LOGOUT: `/api/user/logout`,
        REGISTER: `/api/user/register`,
        EXISTS: `/api/user/exists`,
        RESET_PASSWORD: `/api/user/reset-password`,
        INITIATE_PASSWORD_RESET: `/api/user/initiate-password-reset`,
        GET_ALL: `/api/user/all`,
        BY_ID: (id: Guid) => `/api/user/${id}`,
        BY_EMAIL: `/api/user/get`,
        CREATE: `/api/user/create`,
        UPDATE: (id: Guid) => `/api/user/update/${id}`,
        DELETE: (id: Guid) => `/api/user/delete/${id}`,
        ME: `/api/user/me`,
    },

};