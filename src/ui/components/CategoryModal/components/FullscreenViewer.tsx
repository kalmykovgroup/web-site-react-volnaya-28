
import React, { useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ZoomControls } from './ZoomControls';
import { ImagePlaceholder } from './ImagePlaceholder';
import type { Position, DragHandlers } from '../types';
import styles from '../CategoryModal.module.css';
import type {CategoryImage} from "@category/chared/contracts/CategoryImage.ts";
import {LazyImage} from "@ui/components/LazyImage/LazyImage.tsx";

interface FullscreenViewerProps {
    image: CategoryImage;
    imageIndex: number;
    totalImages: number;
    scale: number;
    position: Position;
    isDragging: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onResetZoom: () => void;
    onWheel: (e: React.WheelEvent) => void;
    dragHandlers: DragHandlers;
}

export const FullscreenViewer: React.FC<FullscreenViewerProps> = ({
                                                                      image,
                                                                      imageIndex,
                                                                      totalImages,
                                                                      scale,
                                                                      position,
                                                                      isDragging,
                                                                      onClose,
                                                                      onNext,
                                                                      onPrevious,
                                                                      onZoomIn,
                                                                      onZoomOut,
                                                                      onResetZoom,
                                                                      onWheel,
                                                                      dragHandlers,
                                                                  }) => {
    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = 'none';
        const container = e.currentTarget.parentElement;
        if (container) {
            const placeholder = container.querySelector(`.${styles.fullscreenPlaceholder}`);
            if (placeholder) {
                (placeholder as HTMLElement).style.display = 'flex';
            }
        }
    }, []);

    const handleContainerClick = useCallback((e: React.MouseEvent) => {
        if (scale === 1 && e.target === e.currentTarget) {
            onClose();
        }
    }, [scale, onClose]);

    const cursor = scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-out';

    return (
        <div className={styles.fullscreenModal}>
            <button
                onClick={onClose}
                className={styles.fullscreenClose}
                aria-label="Закрыть"
            >
                <X className={styles.fullscreenCloseIcon} />
            </button>

            <div
                className={styles.fullscreenImageContainer}
                onWheel={onWheel}
                onMouseDown={dragHandlers.handleMouseDown}
                onMouseMove={dragHandlers.handleMouseMove}
                onMouseUp={dragHandlers.handleMouseUp}
                onMouseLeave={dragHandlers.handleMouseUp}
                onTouchStart={dragHandlers.handleTouchStart}
                onTouchMove={dragHandlers.handleTouchMove}
                onTouchEnd={dragHandlers.handleTouchEnd}
                onClick={handleContainerClick}
                style={{ cursor }}
            >
                <LazyImage
                    src={image.url}
                    alt={`Увеличенное изображение ${image.alt}`}
                    className={styles.fullscreenImage}
                    style={{
                        transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                    }}
                    onError={handleImageError}
                    draggable={false}
                />

                <ImagePlaceholder
                    className={styles.fullscreenPlaceholder}
                    iconClassName={styles.fullscreenPlaceholderIcon}
                />
            </div>

            <ZoomControls
                scale={scale}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
                onResetZoom={onResetZoom}
            />

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPrevious();
                }}
                className={`${styles.fullscreenNav} ${styles.fullscreenNavPrev}`}
                aria-label="Предыдущее изображение"
            >
                <ChevronLeft className={styles.fullscreenNavIcon} />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                className={`${styles.fullscreenNav} ${styles.fullscreenNavNext}`}
                aria-label="Следующее изображение"
            >
                <ChevronRight className={styles.fullscreenNavIcon} />
            </button>

            <div className={styles.fullscreenInfo}>
                <div className={styles.fullscreenCounter}>
                    {imageIndex + 1} / {totalImages}
                </div>
                {scale > 1 && (
                    <div className={styles.fullscreenScale}>
                        {Math.round(scale * 100)}%
                    </div>
                )}
            </div>
        </div>
    );
};