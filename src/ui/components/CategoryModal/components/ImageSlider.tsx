import React from 'react';
import { MainImage } from './MainImage';
import { Thumbnails } from './Thumbnails';
import styles from '../CategoryModal.module.css';
import type {CategoryImage} from "@category/chared/contracts/CategoryImage.ts";

interface ImageSliderProps {
    images: CategoryImage[];
    currentIndex: number;
    onImageClick: () => void;
    onNext: () => void;
    onPrevious: () => void;
    onThumbnailClick: (index: number) => void;
    onThumbnailImageClick: (index: number) => void;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
                                                            images,
                                                            currentIndex,
                                                            onImageClick,
                                                            onNext,
                                                            onPrevious,
                                                            onThumbnailClick,
                                                            onThumbnailImageClick,
                                                        }) => {
    const currentImage = images[currentIndex];

    // Если вообще нет изображений, не рендерим
    if (images.length === 0) {
        return undefined;
    }

    return (
        <div className={styles.body}>
            <div className={styles.sliderContainer}>
                {currentImage ? (
                    <MainImage
                        image={currentImage}
                        imageIndex={currentIndex}
                        totalImages={images.length}
                        onImageClick={onImageClick}
                        onNext={onNext}
                        onPrevious={onPrevious}
                    />
                ) : (
                    <div className={styles.mainImage}>
                        <div className={styles.imagePlaceholder}>
                            <svg
                                className={styles.placeholderIcon}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onPrevious();
                                    }}
                                    className={`${styles.navButton} ${styles.navButtonLeft}`}
                                    aria-label="Предыдущее фото"
                                >
                                    <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNext();
                                    }}
                                    className={`${styles.navButton} ${styles.navButtonRight}`}
                                    aria-label="Следующее фото"
                                >
                                    <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        <div className={styles.counter}>
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>
                )}

                <Thumbnails
                    images={images}
                    currentIndex={currentIndex}
                    onThumbnailClick={onThumbnailClick}
                    onThumbnailImageClick={onThumbnailImageClick}
                />
            </div>
        </div>
    );
};