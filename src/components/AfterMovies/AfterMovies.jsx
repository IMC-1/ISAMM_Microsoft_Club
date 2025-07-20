import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaCalendarAlt, FaEye, FaPause, FaInstagram } from 'react-icons/fa';
import styles from '../../styles/AfterMovies.module.css';

// Import videos
import {
    video1,
    video2,
    video3,
    video4,
    video5,
    video6,
    video7,
    video8,
    video9,
    video10,
    video11,
    video12
} from '../../utils/importAfterMovies';

const AfterMovies = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const afterMovies = [
        {
            id: 1,
            title: "2024 Year Recap",
            date: "December 2024",
            views: "3.2K",
            duration: "2:45",
            videoSrc: video1,
            description: "A complete recap of our successful year 2024 with all major achievements and memorable moments."
        },
        {
            id: 2,
            title: "Coding Universe Teaser",
            date: "May 2023",
            views: "2.8K",
            duration: "1:30",
            videoSrc: video2,
            description: "Exciting teaser of our Coding Universe hackathon showcasing the competitive spirit and innovation."
        },
        {
            id: 3,
            title: "IMC Talk 2.0 Highlights",
            date: "February 2024",
            views: "4.1K",
            duration: "5:20",
            videoSrc: video3,
            description: "Complete highlights from IMC Talk 2.0 featuring industry experts and inspiring tech discussions."
        },
        {
            id: 4,
            title: "IMC Talk 1.0 After Movie",
            date: "November 2022",
            views: "3.5K",
            duration: "4:15",
            videoSrc: video4,
            description: "Our very first IMC Talk after movie capturing the essence of our inaugural tech conference."
        },
        {
            id: 5,
            title: "Level Up After Movie",
            date: "January 2025",
            views: "2.9K",
            duration: "3:40",
            videoSrc: video5,
            description: "Professional development event highlights showcasing career advancement and skill building sessions."
        },
        {
            id: 6,
            title: "Level Up Teaser",
            date: "January 2025",
            views: "1.8K",
            duration: "1:15",
            videoSrc: video6,
            description: "Promotional teaser for our Level Up event featuring exciting workshop previews."
        },
        {
            id: 7,
            title: "New Generation 2024-25",
            date: "September 2024",
            views: "2.3K",
            duration: "2:20",
            videoSrc: video7,
            description: "Welcoming our new generation of members and showcasing fresh talent joining IMC family."
        },
        {
            id: 8,
            title: "Board Announcement Part 1",
            date: "June 2023",
            views: "1.9K",
            duration: "3:10",
            videoSrc: video8,
            description: "First part of our board announcement for generation 2023-24 introducing new leadership."
        },
        {
            id: 9,
            title: "Board Announcement Part 2",
            date: "June 2023",
            views: "1.7K",
            duration: "2:55",
            videoSrc: video9,
            description: "Second part of board announcement completing the introduction of our new executive team."
        },
        {
            id: 10,
            title: "SDGSOFT 1.0 Highlights",
            date: "September 2023",
            views: "3.8K",
            duration: "4:30",
            videoSrc: video10,
            description: "Software development conference highlights focusing on sustainable development goals through tech."
        },
        {
            id: 11,
            title: "SDGSOFT 2.0 After Movie",
            date: "October 2024",
            views: "4.2K",
            duration: "5:10",
            videoSrc: video11,
            description: "Advanced software development conference with AI integration and sustainable tech practices."
        },
        {
            id: 12,
            title: "Board Announcement Teaser",
            date: "June 2023",
            views: "1.4K",
            duration: "0:45",
            videoSrc: video12,
            description: "Exciting teaser building anticipation for our board announcement of generation 2023-24."
        }
    ];

    const openVideoModal = (video) => {
        setSelectedVideo(video);
        setIsPlaying(false);
    };

    const closeVideoModal = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        setSelectedVideo(null);
        setIsPlaying(false);
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (selectedVideo) {
                if (e.key === 'Escape') closeVideoModal();
                if (e.key === ' ') {
                    e.preventDefault();
                    togglePlayPause();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedVideo, isPlaying]);

    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/isamm_microsoft_club/', '_blank', 'noopener,noreferrer');
    };

    return (
        <section className={styles.afterMovies}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    After Movies
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={styles.sectionDescription}
                >
                    Relive the best moments from our events and activities through these
                    carefully crafted after movies that capture the spirit of innovation and community.
                </motion.p>

                <div className={styles.videosGrid}>
                    {afterMovies.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={styles.videoCard}
                            whileHover={{ y: -5 }}
                        >
                            <div className={styles.videoThumbnail}>
                                <video
                                    className={styles.thumbnailVideo}
                                    muted
                                    preload="metadata"
                                    onLoadedMetadata={(e) => {
                                        e.target.currentTime = 5; // Show frame at 5 seconds as thumbnail
                                    }}
                                >
                                    <source src={video.videoSrc} type="video/mp4" />
                                </video>
                                <div className={styles.videoOverlay} />
                                <button
                                    className={styles.playButton}
                                    onClick={() => openVideoModal(video)}
                                >
                                    <FaPlay />
                                </button>
                                <div className={styles.videoDuration}>
                                    {video.duration}
                                </div>
                            </div>

                            <div className={styles.videoInfo}>
                                <h3 className={styles.videoTitle}>{video.title}</h3>
                                <p className={styles.videoDescription}>{video.description}</p>

                                <div className={styles.videoMeta}>
                                    <div className={styles.metaItem}>
                                        <FaCalendarAlt />
                                        <span>{video.date}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <FaEye />
                                        <span>{video.views} views</span>
                                    </div>
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
                    className={styles.videosFooter}
                >
                    <button className={styles.viewChannelBtn} onClick={handleInstagramClick}>
                        <FaInstagram />
                        Visit Our Instagram for More Videos
                    </button>
                </motion.div>

                {/* Video Modal */}
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.videoModal}
                        onClick={closeVideoModal}
                    >
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.closeButton}
                                onClick={closeVideoModal}
                            >
                                ×
                            </button>

                            <div className={styles.videoPlayer}>
                                <video
                                    ref={videoRef}
                                    className={styles.fullVideo}
                                    controls
                                    onEnded={handleVideoEnded}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                >
                                    <source src={selectedVideo.videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            <div className={styles.videoDetails}>
                                <h3 className={styles.modalVideoTitle}>{selectedVideo.title}</h3>
                                <p className={styles.modalVideoDescription}>{selectedVideo.description}</p>
                                <div className={styles.modalVideoMeta}>
                                    <span><FaCalendarAlt /> {selectedVideo.date}</span>
                                    <span><FaEye /> {selectedVideo.views} views</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default AfterMovies;
