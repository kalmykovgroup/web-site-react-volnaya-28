import { useState, useCallback, useEffect } from 'react';

interface UseImageViewerProps {
    totalImages: number;
    onClose: () => void;
}

export const useImageViewer = ({ totalImages, onClose }: UseImageViewerProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fullscreenImageIndex, setFullscreenImageIndex] = useState<number | undefined>(undefined);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (currentImageIndex >= totalImages && totalImages > 0) {
            setCurrentImageIndex(0);
        }
    }, [totalImages, currentImageIndex]);

    useEffect(() => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, [fullscreenImageIndex]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleNext = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }, [totalImages]);

    const handlePrevious = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }, [totalImages]);

    const handleFullscreenNext = useCallback(() => {
        setFullscreenImageIndex((prev) => prev !== undefined ? (prev + 1) % totalImages : 0);
    }, [totalImages]);

    const handleFullscreenPrevious = useCallback(() => {
        setFullscreenImageIndex((prev) => prev !== undefined ? (prev - 1 + totalImages) % totalImages : 0);
    }, [totalImages]);

    const handleZoomIn = useCallback(() => {
        setScale((prev) => Math.min(prev + 0.5, 4));
    }, []);

    const handleZoomOut = useCallback(() => {
        setScale((prev) => {
            const newScale = Math.max(prev - 0.5, 1);
            if (newScale === 1) setPosition({ x: 0, y: 0 });
            return newScale;
        });
    }, []);

    const handleResetZoom = useCallback(() => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (fullscreenImageIndex !== undefined) {
                    setFullscreenImageIndex(undefined);
                    setScale(1);
                    setPosition({ x: 0, y: 0 });
                } else {
                    onClose();
                }
            } else if (fullscreenImageIndex !== undefined) {
                if (e.key === 'ArrowLeft') handleFullscreenPrevious();
                else if (e.key === 'ArrowRight') handleFullscreenNext();
            } else {
                if (e.key === 'ArrowLeft') handlePrevious();
                else if (e.key === 'ArrowRight') handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [fullscreenImageIndex, handleNext, handlePrevious, handleFullscreenNext, handleFullscreenPrevious, onClose]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    }, [scale, position]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
    }, [isDragging, scale, dragStart]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (scale > 1 && e.touches.length === 1) {
            const touch = e.touches[0];
            if (touch) {
                setIsDragging(true);
                setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
            }
        }
    }, [scale, position]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (isDragging && scale > 1 && e.touches.length === 1) {
            const touch = e.touches[0];
            if (touch) {
                setPosition({
                    x: touch.clientX - dragStart.x,
                    y: touch.clientY - dragStart.y,
                });
            }
        }
    }, [isDragging, scale, dragStart]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    return {
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
        dragHandlers: {
            handleMouseDown,
            handleMouseMove,
            handleMouseUp,
            handleTouchStart,
            handleTouchMove,
            handleTouchEnd,
        },
    };
};