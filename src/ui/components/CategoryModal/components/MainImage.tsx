import React, { useCallback } from 'react';
import { NavigationButton } from './NavigationButton';
import { ImagePlaceholder } from './ImagePlaceholder';
import styles from '../CategoryModal.module.css';
import type {CategoryImage} from "@category/chared/contracts/CategoryImage.ts";

interface MainImageProps {
    image: CategoryImage;
    imageIndex: number;
    totalImages: number;
    onImageClick: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

export const MainImage: React.FC<MainImageProps> = ({
                                                        image,
                                                        imageIndex,
                                                        totalImages,
                                                        onImageClick,
                                                        onNext,
                                                        onPrevious,
                                                    }) => {
    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = 'none';
        const parent = e.currentTarget.parentElement;
        if (parent && styles.showPlaceholder) {
            parent.classList.add(styles.showPlaceholder);
        }
    }, []);

    return (
        <div className={styles.mainImage} key={imageIndex}>
            <img
                src={image.url}
                alt={image.alt || `Изображение категории ${imageIndex + 1}`}
                className={styles.image}
                onClick={onImageClick}
                onError={handleImageError}
                loading={imageIndex === 0 ? 'eager' : 'lazy'}
                fetchPriority={imageIndex === 0 ? 'high' : 'auto'}
            />

            <ImagePlaceholder />

            {totalImages > 1 && (
                <>
                    <NavigationButton
                        direction="left"
                        onClick={onPrevious}
                        ariaLabel="Предыдущее фото"
                    />

                    <NavigationButton
                        direction="right"
                        onClick={onNext}
                        ariaLabel="Следующее фото"
                    />
                </>
            )}

            <div className={styles.counter}>
                {imageIndex + 1} / {totalImages}
            </div>
        </div>
    );
};