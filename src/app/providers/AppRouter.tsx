import {Routes, Route} from "react-router-dom";

import React, { lazy, Suspense } from "react";
import MainLayout from "@ui/layouts/MainLayout/MainLayout.tsx";
import {ROUTES} from "@app/constants/routes.ts";
import RouteLogger from "@app/providers/routing/RouteLogger.tsx";
import PublicRoute from "@app/providers/routing/PublicRoute.tsx";

// Lazy loading для оптимизации производительности
const HomePage = lazy(() => import("@ui/pages/HomePage/HomePage.tsx").then(module => ({ default: module.HomePage })));
const PageNotFound = lazy(() => import("@ui/pages/PageNotFound/PageNotFound.tsx"));
const ErrorPage = lazy(() => import("@ui/pages/ErrorPage/ErrorPage.tsx"));

// Компонент загрузки для Suspense
const PageLoader = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
    }}>
        Загрузка...
    </div>
);

const AppRouter: React.FC = () => {

    return (
        <Suspense fallback={<PageLoader />}>
            <RouteLogger/>
            <Routes>
                {/* Защищённые маршруты */}

                <Route path={ROUTES.HOME} element={

                    /**
                     * Компонент защищённого маршрута.
                     * Проверяет авторизацию и, если пользователь не авторизован, перенаправляет на страницу логина.
                     * Используется для оборачивания защищённых маршрутов внутри AppRouter.
                     */

                        <MainLayout />

                }>


                    <Route
                        index
                        element={
                            <PublicRoute>
                                <HomePage />
                            </PublicRoute>
                        }
                    />

                    <Route path={ROUTES.ERROR_SCREEN} element={<ErrorPage/>} />

                </Route>


                {/* Если страница не найдена, редирект на Home */}
               <Route path={ROUTES.NOT_FOUND} element={<PageNotFound/>} />

            </Routes>
        </Suspense>
    );
};

export default AppRouter;

