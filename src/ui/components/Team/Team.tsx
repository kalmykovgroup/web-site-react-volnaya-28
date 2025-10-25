// src/components/Team/Team.tsx
import React from 'react';
import { Award } from 'lucide-react';
import styles from './Team.module.css';
import { AnimatedSection } from "../AnimatedSection/AnimatedSection";

export const Team: React.FC = () => {
    return (
        <section className={styles.team}>
            <div className={styles.container}>
                <AnimatedSection delay={1800} direction="up">
                    <h3 className={styles.title}>Наш персонал</h3>
                    <p className={styles.subtitle}>
                        Профессионалы с многолетним опытом всегда готовы вам помочь
                    </p>
                </AnimatedSection>

                <div className={styles.grid}>
                    <AnimatedSection delay={2000} direction="left">
                        <div className={styles.card}>
                            <div className={styles.avatar} style={{ background: 'linear-gradient(to bottom right, #4ade80, #16a34a)' }}>
                                <span className={styles.initials}>МД</span>
                            </div>
                            <h4 className={styles.name}>Медведев Денис</h4>
                            <div className={styles.position}>
                                <Award className={styles.positionIcon} />
                                <span>Старший консультант</span>
                            </div>
                            <div className={styles.experience}>
                                <p className={styles.experienceYears}>15 лет</p>
                                <p className={styles.experienceLabel}>опыта работы</p>
                            </div>
                            <p className={styles.description}>
                                Эксперт в области строительных материалов и инструментов. Поможет подобрать всё необходимое для любого проекта.
                            </p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={2200} direction="right">
                        <div className={styles.card}>
                            <div className={styles.avatar} style={{ background: 'linear-gradient(to bottom right, #facc15, #22c55e)' }}>
                                <span className={styles.initials}>ТЕ</span>
                            </div>
                            <h4 className={styles.name}>Тропезников Евгений</h4>
                            <div className={styles.position}>
                                <Award className={styles.positionIcon} />
                                <span>Ведущий специалист</span>
                            </div>
                            <div className={styles.experience}>
                                <p className={styles.experienceYears}>15 лет</p>
                                <p className={styles.experienceLabel}>опыта работы</p>
                            </div>
                            <p className={styles.description}>
                                Профессионал с глубокими знаниями в сантехнике, электрике и отделочных материалах.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};