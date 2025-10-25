
import React from 'react';
import styles from '../CategoryModal.module.css';

interface ZoomControlsProps {
    scale: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onResetZoom: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
                                                              scale,
                                                              onZoomIn,
                                                              onZoomOut,
                                                              onResetZoom,
                                                          }) => {
    return (
        <div className={styles.zoomControls}>
            <button
                onClick={onZoomIn}
                disabled={scale >= 4}
                className={styles.zoomButton}
                title="Увеличить (колесико мыши вверх)"
                aria-label="Увеличить"
            >
                <svg className={styles.zoomIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            <button
                onClick={onZoomOut}
                disabled={scale <= 1}
                className={styles.zoomButton}
                title="Уменьшить (колесико мыши вниз)"
                aria-label="Уменьшить"
            >
                <svg className={styles.zoomIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
            </button>

            {scale > 1 && (
                <button
                    onClick={onResetZoom}
                    className={styles.zoomButton}
                    title="Сбросить зум"
                    aria-label="Сбросить зум"
                >
                    <svg className={styles.zoomIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};