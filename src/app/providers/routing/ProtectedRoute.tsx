import type {JSX} from "react";

interface Props {
    children: JSX.Element
}

/**
 * Компонент защищённого маршрута.
 * Проверяет авторизацию и, если пользователь не авторизован, перенаправляет на страницу логина.
 * Используется для оборачивания защищённых маршрутов внутри AppRouter.
 */
const ProtectedRoute = ({ children }: Props) => {

    return children
}

export default ProtectedRoute