
import type {JSX} from "react";
interface Props {
    children: JSX.Element
}

/**
 * PublicRoute запрещает доступ к страницам (например, login), если пользователь уже авторизован.
 */
const PublicRoute = ({ children }: Props) => {
    return children
}

export default PublicRoute