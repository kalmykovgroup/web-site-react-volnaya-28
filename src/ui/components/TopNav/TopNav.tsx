import { NavLink } from "react-router-dom";
import styles from "./TopNav.module.css";
import {ROUTES} from "@app/constants/routes.ts";
import classNames from "classnames";
import React from "react";

type LinkItem = {
    to: "/" | "/charts" | "/error";
    label: string;
    /** Точное совпадение для корня — опционально, но строго true (не boolean) */
    end?: true;
};

const links: LinkItem[] = [
    { to: ROUTES.HOME, label: "Главная", end: true },
] as const;

const TopNav: React.FC<{className?: string | undefined} > = ({className})=> {
    return (
        <header className={classNames(styles.bar, className)}>
            <div className={styles.container}>
                <nav className={styles.nav} aria-label="Главная навигация">
                    {links.map(({ to, label, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            // ВАЖНО: не передаём undefined — либо end: true, либо ничего
                            {...(end ? { end: true } : {})}
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export default TopNav;
