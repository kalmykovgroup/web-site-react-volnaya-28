// --- src/widgets/header/ui/Logo/Logo.tsx ---
import s from './Logo.module.css'
import logoSvg from "@ui/assets/logo.png"
import React from "react";



interface LogoProps {
    width?: number
    height?: number
    onTopClick?: (() => void) | undefined;
}

/**
 * Компонент логотипа
 * - отображает логотип + ссылку на главную
 */
const Logo: React.FC<LogoProps> = ({onTopClick, height, width}) => {
    return (
        <button className={s.logoBtn} onClick={() => onTopClick?.()} style={{width: width, height: height}}>
            <img src={logoSvg} alt="Kalmykov Group"  />
        </button>
    )
}

export default Logo
