import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from '../../styles/Banner.module.css';
import banner1 from '../../assets/images/banners/Banner (1).jpg';
import banner2 from '../../assets/images/banners/Banner (2).jpg';
import banner3 from '../../assets/images/banners/Banner (3).jpg';
import banner4 from '../../assets/images/banners/Banner (1).png';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentQuote, setCurrentQuote] = useState(0);

    const banners = [banner1, banner2, banner3, banner4];

    const quotes = [
        "Empowering Innovation Through Technology",
        "Building Tomorrow's Tech Leaders Today",
        "Code. Create. Collaborate. Conquer.",
        "Where Passion Meets Technology"
    ];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);

        const quoteInterval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 3000);

        return () => {
            clearInterval(slideInterval);
            clearInterval(quoteInterval);
        };
    }, []);

    const handleLearnMoreClick = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section id="home" className={styles.banner}>
            <div className={styles.bannerContainer}>
                {banners.map((banner, index) => (
                    <motion.div
                        key={index}
                        className={`${styles.bannerSlide} ${index === currentSlide ? styles.active : ''
                            }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentSlide ? 1 : 0 }}
                        transition={{ duration: 1 }}
                    >
                        <img src={banner} alt={`Banner ${index + 1}`} />
                        <div className={styles.bannerOverlay} />
                    </motion.div>
                ))}

                <div className={styles.bannerContent}>
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={styles.bannerTitle}
                    >
                        ISAMM Microsoft Club
                    </motion.h1>

                    <motion.div
                        key={currentQuote}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className={styles.bannerQuote}
                    >
                        {quotes[currentQuote]}
                    </motion.div>

                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className={styles.bannerButtons}
                    >
                        <Link
                            to="/join"
                            className={styles.primaryButton}
                        >
                            Join Our Community
                        </Link>

                        <button
                            onClick={handleLearnMoreClick}
                            className={styles.secondaryButton}
                        >
                            Learn More
                        </button>
                    </motion.div>
                </div>

                <div className={styles.bannerIndicators}>
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''
                                }`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;
