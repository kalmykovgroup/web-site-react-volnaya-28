import React, { useCallback } from 'react';
import { ImagePlaceholder } from './ImagePlaceholder';
import styles from '../CategoryModal.module.css';
import type {CategoryImage} from "@category/chared/contracts/CategoryImage.ts";
import {LazyImage} from "@ui/components/LazyImage/LazyImage.tsx";

interface ThumbnailsProps {
    images: CategoryImage[];
    currentIndex: number;
    onThumbnailClick: (index: number) => void;
    onThumbnailImageClick: (index: number) => void;
}

export const Thumbnails: React.FC<ThumbnailsProps> = ({
                                                          images,
                                                          currentIndex,
                                                          onThumbnailClick,
                                                          onThumbnailImageClick,
                                                      }) => {
    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = 'none';
        const parent = e.currentTarget.parentElement;
        if (parent && styles.showPlaceholder) {
            parent.classList.add(styles.showPlaceholder);
        }
    }, []);

    return (
        <div className={styles.thumbnails}>
            {images.map((photo, index) => {
                const isNearCurrent = Math.abs(index - currentIndex) <= 2;

                return (
                    <button
                        key={`${index}-${photo.url}`}
                        onClick={() => onThumbnailClick(index)}
                        className={`${styles.thumbnail} ${index === currentIndex ? styles.thumbnailActive : ''}`}
                    >
                        <LazyImage
                            src={photo.url}
                            alt={photo.alt || `Миниатюра ${index + 1}`}
                            className={styles.thumbnailImage}
                            onClick={(e) => {
                                e.stopPropagation();
                                onThumbnailImageClick(index);
                            }}
                            onError={handleImageError}
                            loading={isNearCurrent ? 'eager' : 'lazy'}
                        />

                        <ImagePlaceholder
                            className={styles.thumbnailPlaceholder}
                            iconClassName={styles.thumbnailPlaceholderIcon}
                        />
                    </button>
                );
            })}
        </div>
    );
};