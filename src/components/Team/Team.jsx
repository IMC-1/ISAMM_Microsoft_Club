import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaGlobe, FaLinkedin, FaEnvelope, FaBehance, FaUser } from 'react-icons/fa';
import styles from '../../styles/Team.module.css';
import teamData from '../../data/teamData';

const Team = () => {
    const handleImageError = (e) => {
        // If image fails to load, show fallback
        e.target.style.display = 'none';
        const fallbackDiv = e.target.parentNode.querySelector(`.${styles.imageFallback}`);
        if (fallbackDiv) {
            fallbackDiv.style.display = 'flex';
        }
    };

    const handleImageLoad = (e) => {
        // If image loads successfully, hide fallback
        const fallbackDiv = e.target.parentNode.querySelector(`.${styles.imageFallback}`);
        if (fallbackDiv) {
            fallbackDiv.style.display = 'none';
        }
    };

    // Component to render social links conditionally
    const SocialLinks = ({ social }) => {
        return (
            <div className={styles.socialLinks}>
                {social.instagram && social.instagram.trim() && (
                    <a
                        href={social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>
                )}
                {social.website && social.website.trim() && (
                    <a
                        href={social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="Official Website"
                    >
                        <FaGlobe />
                    </a>
                )}
                {social.linkedin && social.linkedin.trim() && (
                    <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>
                )}
                {social.email && social.email.trim() && (
                    <a
                        href={`mailto:${social.email}`}
                        className={styles.socialLink}
                        aria-label="Email"
                    >
                        <FaEnvelope />
                    </a>
                )}
                {social.behance && social.behance.trim() && (
                    <a
                        href={social.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="Behance"
                    >
                        <FaBehance />
                    </a>
                )}
            </div>
        );
    };

    return (
        <div className={styles.team}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.teamHeader}
                >
                    <h2 className={styles.sectionTitle}>Our Team</h2>
                    <p className={styles.teamDescription}>
                        Meet the dedicated individuals who drive our club forward, bringing together
                        diverse skills and expertise to create exceptional experiences for our community.
                    </p>
                </motion.div>

                <div className={styles.teamGrid}>
                    {teamData.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={styles.memberCard}
                        >
                            <div className={styles.memberImageContainer}>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className={styles.memberImage}
                                    onError={handleImageError}
                                    onLoad={handleImageLoad}
                                />

                                {/* Fallback div shown when image fails */}
                                <div className={styles.imageFallback}>
                                    <FaUser />
                                    <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>

                                <div className={styles.memberOverlay}>
                                    <SocialLinks social={member.social} />
                                </div>
                            </div>

                            <div className={styles.memberInfo}>
                                <h3 className={styles.memberName}>{member.name}</h3>
                                <p className={styles.memberPosition}>{member.position}</p>
                                <p className={styles.memberDescription}>{member.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className={styles.joinTeam}
                >
                    <h3 className={styles.joinTitle}>Want to Join Our Executive Board?</h3>
                    <p className={styles.joinDescription}>
                        We're looking for passionate leaders to join our executive team and help shape the future
                        of ISAMM Microsoft Club. Take the next step in your leadership journey!
                    </p>
                    <Link to="/BoardApplication" className={styles.joinButton}>
                        Apply Now
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Team;
