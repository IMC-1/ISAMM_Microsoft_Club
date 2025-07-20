import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaTrophy, FaRocket } from 'react-icons/fa';
import styles from '../../styles/Introduction.module.css';

const Introduction = () => {
    const features = [
        {
            icon: <FaCode />,
            title: "Technical Excellence",
            description: "Learn cutting-edge technologies and programming languages"
        },
        {
            icon: <FaUsers />,
            title: "Community",
            description: "Join a vibrant community of tech enthusiasts and innovators"
        },
        {
            icon: <FaTrophy />,
            title: "Achievements",
            description: "Get certified and recognized for your technical skills"
        },
        {
            icon: <FaRocket />,
            title: "Innovation",
            description: "Work on real projects and build your professional portfolio"
        }
    ];

    return (
        <section id="about" className={styles.introduction}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={styles.introContent}
                >
                    <h2 className="section-title">About ISAMM Microsoft Club</h2>
                    <p className={styles.introDescription}>
                        Welcome to the ISAMM Microsoft Club, where innovation meets education.
                        We are a dynamic student organization dedicated to fostering technological
                        excellence, professional development, and community building among aspiring
                        tech professionals at ISAMM.
                    </p>
                    <p className={styles.introDescription}>
                        Our club serves as a bridge between academic learning and industry practice,
                        offering hands-on experience with Microsoft technologies, comprehensive training
                        programs, and networking opportunities that prepare our members for successful
                        careers in technology.
                    </p>
                </motion.div>

                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={styles.featureCard}
                            whileHover={{ y: -5 }}
                        >
                            <div className={styles.featureIcon}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.featureTitle}>
                                {feature.title}
                            </h3>
                            <p className={styles.featureDescription}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className={styles.statsSection}
                >
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>100+</span>
                        <span className={styles.statLabel}>Members</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>50+</span>
                        <span className={styles.statLabel}>Events</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>30+</span>
                        <span className={styles.statLabel}>Projects</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>15+</span>
                        <span className={styles.statLabel}>Certifications</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Introduction;
