import { useState, type ImgHTMLAttributes } from 'react';
import styles from './LazyImage.module.css';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

export const LazyImage = ({ src, alt, className, ...props }: ImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={styles.container}>
            {!isLoaded && <div className={styles.placeholder} />}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`${styles.image} ${isLoaded ? styles.loaded : ''} ${className ?? ''}`}
                onLoad={() => setIsLoaded(true)}
                {...props}
            />
        </div>
    );
};