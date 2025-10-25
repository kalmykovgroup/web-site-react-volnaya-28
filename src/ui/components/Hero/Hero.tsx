// src/components/Hero/Hero.tsx
import React  from 'react';
import styles from './Hero.module.css';
import {AnimatedSection} from "@ui/components/AnimatedSection/AnimatedSection.tsx";

interface HeroProps {
    onCatalogClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCatalogClick }) => {

    return (
        <section className={styles.hero}>

            <div className={styles.container}>
                <AnimatedSection delay={200} direction="down">
                    <div className={styles.title}>
                        <span className={styles.titleNormal}>Всё для </span>
                        <span className={styles.titleAccent}>строительства</span>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={400} direction="up">
                    <div className={styles.subtitle}>
                        От сантехники до канцелярии — всё для дома, ремонта и быта
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={600} direction="up">
                    <div className={styles.buttons}>
                        <button onClick={onCatalogClick} className={styles.buttonPrimary}>
                            Смотреть каталог
                        </button>
                        <button className={styles.buttonSecondary}>
                            Специальные предложения
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};