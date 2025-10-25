import React from "react";
import styles from "@ui/components/Categories/CategoryCard/CategoryCard.module.css";
import classNames from "classnames";
import {LazyImage} from "@ui/components/LazyImage/LazyImage.tsx";

export const IconComponent: React.FC<{className?: string | undefined, iconUrl: string, iconAlt: string}> = ({ className, iconUrl, iconAlt }) => {

    return (
        <div className={classNames(styles.iconComponent, className)}>
            <LazyImage src={iconUrl} alt={iconAlt}/>
        </div>
    );
};