import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '../../styles/TopEvents.module.css';

// Import event images
import imcTalk1Images from '../../utils/importIMCTalk1Images';
import codingUniverseImages from '../../utils/importCodingUniverseImages';
import sdgsoft1Images from '../../utils/importSDGSOFT1Images';
import imcTalk2Images from '../../utils/importIMCTalk2Images';
import sdgsoft2Images from '../../utils/importSDGSOFT2Images';
import levelUpImages from '../../utils/importLevelUpImages';

// Import event banners
import {
    imcTalk1Banner,
    codingUniverseBanner,
    sdgsoft1Banner,
    imcTalk2Banner,
    sdgsoft2Banner,
    levelUpBanner
} from '../../utils/importEventBanners';

const TopEvents = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const events = [
        {
            id: 1,
            title: "IMC TALK 1.0",
            date: "26 November 2022",
            time: "Full Day Event",
            location: "Complex des Jeunes Manouba",
            attendees: 150,
            description: "Our inaugural tech talk bringing together students and industry professionals to discuss innovation in technology.",
            status: "completed",
            images: imcTalk1Images,
            banner: imcTalk1Banner
        },
        {
            id: 2,
            title: "CODING UNIVERSE",
            date: "06 May 2023",
            time: "48 Hours",
            location: "Complex des Jeunes Manouba",
            attendees: 200,
            description: "Epic 48-hour hackathon where teams competed to build innovative solutions and push the boundaries of coding.",
            status: "completed",
            images: codingUniverseImages,
            banner: codingUniverseBanner
        },
        {
            id: 3,
            title: "SDGSOFT 1.0",
            date: "30 September 2023",
            time: "Full Day Event",
            location: "Complex des Jeunes Manouba",
            attendees: 180,
            description: "Software development conference focusing on sustainable development goals through innovative technology solutions.",
            status: "completed",
            images: sdgsoft1Images,
            banner: sdgsoft1Banner
        },
        {
            id: 4,
            title: "IMC TALK 2.0",
            date: "25 February 2024",
            time: "Full Day Event",
            location: "Complex des Jeunes Manouba",
            attendees: 220,
            description: "Second edition of our flagship tech talk with expanded sessions on AI, cloud computing, and digital transformation.",
            status: "completed",
            images: imcTalk2Images,
            banner: imcTalk2Banner
        },
        {
            id: 5,
            title: "SDGSOFT 2.0",
            date: "20 October 2024",
            time: "Full Day Event",
            location: "Hub Design Denden",
            attendees: 250,
            description: "Advanced software development conference with enhanced focus on AI integration and sustainable tech practices.",
            status: "completed",
            images: sdgsoft2Images,
            banner: sdgsoft2Banner
        },
        {
            id: 6,
            title: "Level Up",
            date: "25 January 2025",
            time: "Full Day Event",
            location: "Hub Design Denden",
            attendees: 300,
            description: "Professional development event focused on leveling up technical skills and career advancement in technology.",
            status: "completed",
            images: levelUpImages,
            banner: levelUpBanner
        }
    ];

    const openGallery = (event) => {
        setSelectedEvent(event);
        setCurrentImageIndex(0);
    };

    const closeGallery = () => {
        setSelectedEvent(null);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (selectedEvent && selectedEvent.images.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === selectedEvent.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedEvent && selectedEvent.images.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedEvent.images.length - 1 : prev - 1
            );
        }
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    // Handle keyboard navigation
    React.useEffect(() => {
        const handleKeyPress = (e) => {
            if (selectedEvent) {
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'Escape') closeGallery();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedEvent]);

    return (
        <section id="events" className={styles.topEvents}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Our Events
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={styles.sectionDescription}
                >
                    Explore our successful events that have shaped the tech community at ISAMM.
                    Click "View Gallery" to explore event photos and relive the memorable moments.
                </motion.p>

                <div className={styles.eventsGrid}>
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={styles.eventCard}
                            whileHover={{ y: -10 }}
                        >
                            <div className={styles.eventImage}>
                                <img
                                    src={event.banner}
                                    alt={`${event.title} Banner`}
                                    className={styles.eventBanner}
                                    onError={(e) => {
                                        // Fallback to placeholder if banner fails to load
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className={styles.eventImagePlaceholder} style={{ display: 'none' }}>
                                    <FaCalendarAlt />
                                </div>
                                <div className={styles.bannerOverlay} />
                                <div className={styles.statusBadge}>
                                    Completed
                                </div>
                            </div>

                            <div className={styles.eventContent}>
                                <h3 className={styles.eventTitle}>{event.title}</h3>
                                <p className={styles.eventDescription}>{event.description}</p>

                                <div className={styles.eventDetails}>
                                    <div className={styles.eventDetail}>
                                        <FaCalendarAlt />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className={styles.eventDetail}>
                                        <FaClock />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className={styles.eventDetail}>
                                        <FaMapMarkerAlt />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className={styles.eventDetail}>
                                        <FaUsers />
                                        <span>{event.attendees} attendees</span>
                                    </div>
                                </div>

                                <div className={styles.eventActions}>
                                    <button
                                        className={styles.learnMoreBtn}
                                        onClick={() => openGallery(event)}
                                        disabled={!event.images || event.images.length === 0}
                                    >
                                        {event.images && event.images.length > 0 ? 'View Gallery' : 'No Images Available'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className={styles.eventsFooter}
                >
                    <p className={styles.footerText}>
                        More exciting events coming soon! Stay tuned for updates.
                    </p>
                </motion.div>

                {/* Image Gallery Modal */}
                <AnimatePresence>
                    {selectedEvent && selectedEvent.images && selectedEvent.images.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.galleryOverlay}
                            onClick={closeGallery}
                        >
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                className={styles.galleryModal}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className={styles.galleryHeader}>
                                    <h3 className={styles.galleryTitle}>{selectedEvent.title}</h3>
                                    <button className={styles.closeButton} onClick={closeGallery}>
                                        <FaTimes />
                                    </button>
                                </div>

                                <div className={styles.galleryContent}>
                                    <button
                                        className={styles.navButton}
                                        onClick={prevImage}
                                        disabled={selectedEvent.images.length <= 1}
                                    >
                                        <FaChevronLeft />
                                    </button>

                                    <div className={styles.imageContainer}>
                                        <img
                                            src={selectedEvent.images[currentImageIndex]}
                                            alt={`${selectedEvent.title} - ${currentImageIndex + 1}`}
                                            className={styles.galleryImage}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                console.error('Failed to load image:', selectedEvent.images[currentImageIndex]);
                                            }}
                                        />
                                        <div className={styles.imageCounter}>
                                            {currentImageIndex + 1} / {selectedEvent.images.length}
                                        </div>
                                    </div>

                                    <button
                                        className={styles.navButton}
                                        onClick={nextImage}
                                        disabled={selectedEvent.images.length <= 1}
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>

                                {selectedEvent.images.length > 1 && (
                                    <div className={styles.galleryThumbnails}>
                                        {selectedEvent.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`${selectedEvent.title} thumbnail ${index + 1}`}
                                                className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''
                                                    }`}
                                                onClick={() => goToImage(index)}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TopEvents;
