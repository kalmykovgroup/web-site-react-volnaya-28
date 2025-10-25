// src/components/shared/AnimatedSection/AnimatedSection.tsx
import React, { useState, useEffect } from 'react';
import styles from './AnimatedSection.module.css';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

export interface AnimatedSectionProps {
    children: React.ReactNode;
    delay: number;
    direction?: AnimationDirection;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
                                                                    children,
                                                                    delay,
                                                                    direction = 'up'
                                                                }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const getTransform = (): string => {
        if (!isVisible) {
            const transforms: Record<AnimationDirection, string> = {
                up: 'translateY(50px)',
                down: 'translateY(-50px)',
                left: 'translateX(50px)',
                right: 'translateX(-50px)',
            };
            return transforms[direction];
        }
        return 'translateY(0)';
    };

    return (
        <div
            className={styles.section}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
            }}
        >
            {children}
        </div>
    );
};

