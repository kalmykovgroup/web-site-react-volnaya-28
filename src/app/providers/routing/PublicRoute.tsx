
import { Navigate } from 'react-router-dom'
import type {JSX} from "react";
import {ROUTES} from "@app/constants/routes.ts";
import {useAppSelector} from "@/hooks.ts";

interface Props {
    children: JSX.Element
}

/**
 * PublicRoute запрещает доступ к страницам (например, login), если пользователь уже авторизован.
 */
const PublicRoute = ({ children }: Props) => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    if (isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />
    }

    return children
}

export default PublicRoute