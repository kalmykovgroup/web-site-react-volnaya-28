// src/store/slices/categorySlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Guid } from "@app/lib/types/Guid.ts";
import type { RootState } from "@/store.ts";
import {categoryApi} from "@/features/category/chared/api/categoryApi.ts";
import type {CategoryDto} from "@category/chared/contracts/CategoryDto.ts";


interface CategoryState {
    categories: CategoryDto[];
    categoriesById: Record<string, CategoryDto>;
    isLoading: boolean;
    error?: string | undefined;
    selectedCategory?: CategoryDto | undefined;
}

const initialState: CategoryState = {
    categories: [],
    categoriesById: {},
    isLoading: false,
};



 export const fetchAllCategories = createAsyncThunk<
     CategoryDto[],
     void,
     { rejectValue: string }
 >(
     'category/fetchAll',
     async (_, { dispatch, rejectWithValue }) => {
        try {
            return  await dispatch(categoryApi.endpoints.getAllCategories.initiate()).unwrap();
         } catch (error) {
             return rejectWithValue(
                 error instanceof Error ? error.message : 'Не удалось загрузить категории'
             );
         }
     }
 );

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<CategoryDto | undefined>) => {
            state.selectedCategory = action.payload;
        },
        clearError: (state) => {
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = [...action.payload].sort((a, b) => a.order - b.order);

                // Создаем индексированный объект для быстрого доступа
                state.categoriesById = {};
                state.categories.forEach((category) => {
                    state.categoriesById[category.id] = category;
                });

                state.error = undefined;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Неизвестная ошибка';
            });
    },
});

export const { setSelectedCategory, clearError } = categorySlice.actions;
export default categorySlice.reducer;

// Селекторы
export const selectCategories = (state: RootState) => state.categories.categories;

export const selectCategoryById = (state: RootState, categoryId: Guid) =>
    state.categories.categoriesById[categoryId] ?? undefined;

export const selectSelectedCategory = (state: RootState) =>
    state.categories.selectedCategory;

export const selectIsLoading = (state: RootState) =>
    state.categories.isLoading;

export const selectError = (state: RootState) =>
    state.categories.error;