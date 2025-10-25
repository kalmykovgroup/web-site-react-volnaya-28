 
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../CategoryModal.module.css';

interface NavigationButtonProps {
    direction: 'left' | 'right';
    onClick: (e: React.MouseEvent) => void;
    className?: string;
    ariaLabel: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
                                                                      direction,
                                                                      onClick,
                                                                      className = '',
                                                                      ariaLabel,
                                                                  }) => {
    const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
    const positionClass = direction === 'left' ? styles.navButtonLeft : styles.navButtonRight;

    return (
        <button
            onClick={onClick}
            className={`${styles.navButton} ${positionClass} ${className}`}
            aria-label={ariaLabel}
        >
            <Icon className={styles.navIcon} />
        </button>
    );
};