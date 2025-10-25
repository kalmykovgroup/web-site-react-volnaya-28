import React from 'react';
import styles from './CategoryCard.module.css';
import classNames from "classnames";
import type {CategoryDto} from "@category/chared/contracts/CategoryDto.ts";
import {LazyImage} from "@ui/components/LazyImage/LazyImage.tsx";

interface CategoryCardProps {
    category: CategoryDto;
    onClick: () => void;
    index?: number;
    className?: string;
}


const CategoryCard: React.FC<CategoryCardProps> = ({
                                                              category,
                                                              onClick,
                                                              index,
                                                              className,
                                                          }) => {
    return (
        <div
            className={classNames(styles.card, className)}
            onClick={onClick}
            data-index={index}
            style={{boxShadow: `0 0 5px ${category.color}`}}
        >
            {/* Контейнер изображения */}
            <div className={styles.imageWrapper}>
                {/* Изображение можно добавить здесь если нужно */}
            </div>

            {/* Основной контент карточки */}
            <div className={styles.cardContent}>
                <div className={styles.cardContent_header}>
                    <div className={styles.iconWrapper}>
                        <LazyImage
                            src={category.iconUrl}
                            alt={category.iconAlt}
                            className={styles.icon}
                        />
                    </div>
                    <h3 className={styles.title}>{category.name}</h3>
                </div>
                <div className={styles.cardContent_center}>
                    <p className={styles.desc}>{category.description}</p>
                </div>

            </div>

            {/* Бейдж при наведении */}
            <div className={styles.viewBadge}>
                Посмотреть товары →
            </div>
        </div>
    );
};
export default CategoryCard