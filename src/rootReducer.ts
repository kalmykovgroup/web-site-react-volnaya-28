import { combineReducers } from '@reduxjs/toolkit';


import {categoryApi} from "@/features/category/chared/api/categoryApi.ts";
import categorySlice from "@/features/category/store/categorySlice.ts";
import {uiReducer} from "@/uiSlice.ts";

// ВАЖНО: никаких самодельных _persist, только реальные редьюсеры

export const rootReducer = combineReducers({
    ui: uiReducer,
    categories: categorySlice,
    // RTK Query
    [categoryApi.reducerPath]: categoryApi.reducer,
});
