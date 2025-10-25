
import React from 'react';
import { X } from 'lucide-react';
import styles from '../CategoryModal.module.css';
import {IconComponent} from "@ui/components/Categories/CategoryCard/IconComponent/IconComponent.tsx";
import type {CategoryDto} from "@category/chared/contracts/CategoryDto.ts";

interface CategoryHeaderProps {
    category: CategoryDto;
    onClose: () => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, onClose }) => {

    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>

                <IconComponent className={styles.iconSvg} iconUrl={category.iconUrl} iconAlt={category.iconAlt} />

                <div>
                    <h3 className={styles.title}>{category.name}</h3>
                    <p className={styles.subtitle}>{category.description}</p>
                </div>
            </div>
            <button onClick={onClose} className={styles.closeButton} aria-label="Закрыть">
                <X className={styles.closeIcon} />
            </button>
        </div>
    );
};