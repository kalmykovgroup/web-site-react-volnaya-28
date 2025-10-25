import {Component} from 'react'
import {ThemeProvider} from "@app/providers/theme/ThemeProvider.tsx";
import ErrorBoundary from "@app/lib/hooks/ErrorBoundary.tsx";
import ErrorPage from "@ui/pages/ErrorPage/ErrorPage.tsx";
import {NavigateProvider} from "@app/providers/routing/NavigateProvider.tsx";
import {DeviceProvider} from "@app/lib/hooks/device/DeviceProvider.tsx";
import AppRouter from "@app/providers/AppRouter.tsx";
import {ConfirmProvider} from "@ui/components/app/ConfirmProvider/ConfirmProvider.tsx";
import {AppToaster} from "@ui/components/app/AppToaster/AppToaster.tsx";
import LoadingOverlay from "@ui/components/app/LoadingOverlay/LoadingOverlay.tsx";
import {DocumentTitleProvider} from "@app/lib/hooks/DocumentTitleContext.tsx";

/**
 * Главный компонент приложения.
 *
 * - Оборачивает всё в ErrorBoundary, чтобы отлавливать ошибки рендеринга компонентов.
 * - Ошибки из асинхронных операций (fetch, setTimeout) не перехватываются ErrorBoundary —
 *   их нужно обрабатывать вручную.
 * - DeviceProvider предоставляет информацию об устройстве (мобильный/десктоп) через контекст.
 * - AppRouter содержит маршруты всего приложения.
 * - RouteLogger логирует навигацию по маршрутам.
 * - NavigateProvider - предоставляет контекст для навигации по маршрутам, (redirectTo('/auth'))
 * - UserActivityTracker отслеживает активность пользователя и обновляет время последней активности.
 * - ConfirmProvider окно подтверждения, по типу alert
 * - Toaster уведомления
 * - LoadingOverlay заморозка окна
 */
class App extends Component {

    render() {
        return (
            <DocumentTitleProvider>
            <ThemeProvider>
                <ErrorBoundary fallback={<ErrorPage/>}>
                    <NavigateProvider />
                    <DeviceProvider>
                        <ConfirmProvider>
                            <AppRouter/>
                            <AppToaster/>
                            <LoadingOverlay />
                        </ConfirmProvider>
                    </DeviceProvider>
                </ErrorBoundary>
            </ThemeProvider>
            </DocumentTitleProvider>
        )
    }
}
export default App
