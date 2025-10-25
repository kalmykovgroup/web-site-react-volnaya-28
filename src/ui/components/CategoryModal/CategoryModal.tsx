import React, { useCallback } from 'react';
import { CategoryHeader } from './components/CategoryHeader';
import { ImageSlider } from './components/ImageSlider';
import { FullscreenViewer } from './components/FullscreenViewer';
import styles from './CategoryModal.module.css';
import { useImageViewer } from "@/features/category/store/hooks/useImageViewer.ts";
import type {CategoryDto} from "@category/chared/contracts/CategoryDto.ts";

export interface CategoryModalProps {
    category: CategoryDto;
    onClose: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose }) => {
    const {
        currentImageIndex,
        fullscreenImageIndex,
        scale,
        position,
        isDragging,
        setCurrentImageIndex,
        setFullscreenImageIndex,
        handleNext,
        handlePrevious,
        handleFullscreenNext,
        handleFullscreenPrevious,
        handleZoomIn,
        handleZoomOut,
        handleResetZoom,
        dragHandlers,
    } = useImageViewer({ totalImages: category.images.length, onClose });

    const handleImageClick = useCallback(() => {
        setFullscreenImageIndex(currentImageIndex);
    }, [currentImageIndex, setFullscreenImageIndex]);

    const handleThumbnailClick = useCallback((index: number) => {
        setCurrentImageIndex(index);
    }, [setCurrentImageIndex]);

    const handleThumbnailImageClick = useCallback((index: number) => {
        setFullscreenImageIndex(index);
    }, [setFullscreenImageIndex]);

    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    }, [handleZoomIn, handleZoomOut]);

    const handleFullscreenClose = useCallback(() => {
        setFullscreenImageIndex(undefined);
        handleResetZoom();
    }, [setFullscreenImageIndex, handleResetZoom]);

    if (category.images.length === 0) {
        return (
            <div className={styles.modal} onClick={onClose}>
                <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                    <CategoryHeader category={category} onClose={onClose} />
                    <div className={styles.body}>
                        <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                            Нет доступных изображений для этой категории
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const fullscreenImage = fullscreenImageIndex !== undefined ? category.images[fullscreenImageIndex] : undefined;

    return (
        <>
            <div className={styles.modal} onClick={onClose}>
                <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                    <CategoryHeader category={category} onClose={onClose} />
                    <ImageSlider
                        images={category.images}
                        currentIndex={currentImageIndex}
                        onImageClick={handleImageClick}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onThumbnailClick={handleThumbnailClick}
                        onThumbnailImageClick={handleThumbnailImageClick}
                    />
                </div>
            </div>

            {fullscreenImageIndex !== undefined && fullscreenImage && (
                <FullscreenViewer
                    image={fullscreenImage}
                    imageIndex={fullscreenImageIndex}
                    totalImages={category.images.length}
                    scale={scale}
                    position={position}
                    isDragging={isDragging}
                    onClose={handleFullscreenClose}
                    onNext={handleFullscreenNext}
                    onPrevious={handleFullscreenPrevious}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onResetZoom={handleResetZoom}
                    onWheel={handleWheel}
                    dragHandlers={dragHandlers}
                />
            )}
        </>
    );
};