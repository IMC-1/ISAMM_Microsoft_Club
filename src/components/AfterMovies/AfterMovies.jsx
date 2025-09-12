import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaCalendarAlt, FaEye, FaTimes, FaInstagram, FaUpload } from 'react-icons/fa';
import YouTube from 'react-youtube';
import styles from '../../styles/AfterMovies.module.css';
import afterMoviesData from '../../data/afterMoviesData';

const AfterMovies = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    // YouTube player options
    const youtubeOpts = {
        width: '100%',
        height: '400',
        playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0, // Don't show related videos from other channels
            modestbranding: 1, // Minimal YouTube branding
            fs: 1, // Allow fullscreen
            cc_load_policy: 0, // Don't show captions by default
            iv_load_policy: 3, // Don't show annotations
        },
    };

    const openVideoModal = (video) => {
        if (video.isAvailable && video.youtubeId) {
            setSelectedVideo(video);
            setIsPlayerReady(false);
        }
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
        setIsPlayerReady(false);
    };

    const onPlayerReady = (event) => {
        setIsPlayerReady(true);
    };

    const onPlayerStateChange = (event) => {
        // Handle player state changes if needed
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (selectedVideo && e.key === 'Escape') {
                closeVideoModal();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedVideo]);

    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/isamm_microsoft_club/', '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={styles.afterMovies}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.sectionHeader}
                >
                    <h2 className={styles.sectionTitle}>After Movies</h2>
                    <p className={styles.sectionDescription}>
                        Relive the best moments from our events and activities through these
                        carefully crafted after movies that capture the spirit of innovation and community.
                    </p>
                </motion.div>

                <div className={styles.videosGrid}>
                    {afterMoviesData.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`${styles.videoCard} ${!video.isAvailable ? styles.unavailable : ''}`}
                        >
                            <div className={styles.videoThumbnail}>
                                {/* Custom thumbnail image */}
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className={styles.thumbnailImage}
                                    loading="lazy"
                                />

                                <div className={styles.videoOverlay} />

                                {video.isAvailable ? (
                                    <button
                                        className={styles.playButton}
                                        onClick={() => openVideoModal(video)}
                                        aria-label={`Play ${video.title}`}
                                    >
                                        <FaPlay />
                                    </button>
                                ) : (
                                    <div className={styles.comingSoonBadge}>
                                        <FaUpload />
                                        <span>Coming Soon</span>
                                    </div>
                                )}

                                <span className={styles.videoDuration}>
                                    {video.duration}
                                </span>
                            </div>

                            <div className={styles.videoInfo}>
                                <h3 className={styles.videoTitle}>{video.title}</h3>
                                <p className={styles.videoDescription}>{video.description}</p>
                                <div className={styles.videoMeta}>
                                    <span className={styles.metaItem}>
                                        <FaCalendarAlt />
                                        {video.date}
                                    </span>
                                    <span className={styles.metaItem}>
                                        <FaEye />
                                        {video.views} views
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className={styles.videosFooter}>
                    <button
                        className={styles.viewChannelBtn}
                        onClick={handleInstagramClick}
                    >
                        <FaInstagram />
                        Visit Our Instagram for More Videos
                    </button>
                </div>

                {/* YouTube Video Modal */}
                {selectedVideo && (
                    <div className={styles.videoModal} onClick={closeVideoModal}>
                        <div
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.closeButton}
                                onClick={closeVideoModal}
                                aria-label="Close video"
                            >
                                <FaTimes />
                            </button>

                            <div className={styles.youtubePlayerContainer}>
                                <YouTube
                                    videoId={selectedVideo.youtubeId}
                                    opts={youtubeOpts}
                                    onReady={onPlayerReady}
                                    onStateChange={onPlayerStateChange}
                                    className={styles.youtubePlayer}
                                />
                            </div>

                            <div className={styles.videoDetails}>
                                <h3 className={styles.modalVideoTitle}>{selectedVideo.title}</h3>
                                <p className={styles.modalVideoDescription}>{selectedVideo.description}</p>
                                <div className={styles.modalVideoMeta}>
                                    <span>
                                        <FaCalendarAlt />
                                        {selectedVideo.date}
                                    </span>
                                    <span>
                                        <FaEye />
                                        {selectedVideo.views} views
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AfterMovies;
