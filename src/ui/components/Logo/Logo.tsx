// --- src/widgets/header/ui/Logo/Logo.tsx ---
import s from './Logo.module.css'
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="95" fill="#4FAF32" stroke="#000000" strokeWidth="3"/>

                <text x="95" y="90"
                      fontFamily='"Bradley Hand ITC", cursive'
                      fontSize="40"
                      fill="#FFFFFF"
                      stroke="#000000"
                      strokeWidth="2"
                      paintOrder="stroke"
                      textAnchor="middle">
                    СТРОЙ
                </text>

                <text x="58" y="140"
                      fontFamily='"Bradley Hand ITC", cursive'
                      fontSize="40"
                      fill="#FFFFFF"
                      stroke="#000000"
                      strokeWidth="2"
                      paintOrder="stroke"
                      textAnchor="middle">
                    ХОЗ
                </text>

                <text x="148" y="140"
                      fontFamily='"Bradley Hand ITC", cursive'
                      fontSize="40"
                      fill="#FAFB52"
                      stroke="#000000"
                      strokeWidth="2"
                      paintOrder="stroke"
                      textAnchor="middle">
                    МАГ
                </text>
            </svg>
        </button>
    )
}

export default Logo
