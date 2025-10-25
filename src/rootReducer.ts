import { combineReducers } from '@reduxjs/toolkit';

// RTK Query reducers
import { authApi } from '@login/shared/api/authApi';

// обычные слайсы
import { authReducer } from '@login/store/authSlice';
import userReducer from '@/features/user/store/userSlice';
import {userApi} from "@/features/user/shared/api/userApi.ts";
import {categoryApi} from "@/features/category/chared/api/categoryApi.ts";
import categorySlice from "@/features/category/store/categorySlice.ts";
import {uiReducer} from "@/uiSlice.ts";

// ВАЖНО: никаких самодельных _persist, только реальные редьюсеры

export const rootReducer = combineReducers({
    // Persisted slices
    auth: authReducer,
    users: userReducer,
    ui: uiReducer,
    categories: categorySlice,
    // RTK Query
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
});
