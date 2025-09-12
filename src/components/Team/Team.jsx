import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaUser } from 'react-icons/fa';
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

    return (
        <section className={styles.team}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Our Team
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={styles.teamDescription}
                >
                    Meet the dedicated individuals who drive our club forward, bringing together
                    diverse skills and expertise to create exceptional experiences for our community.
                </motion.p>

                <div className={styles.teamGrid}>
                    {teamData.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={styles.memberCard}
                            whileHover={{ y: -10 }}
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
                                    <FaUser className={styles.fallbackIcon} />
                                    <span className={styles.fallbackInitials}>
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>

                                <div className={styles.memberOverlay}>
                                    <div className={styles.socialLinks}>
                                        {member.social.linkedin && member.social.linkedin !== "#" && (
                                            <a
                                                href={member.social.linkedin}
                                                className={styles.socialLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FaLinkedin />
                                            </a>
                                        )}
                                        {member.social.github && member.social.github !== "#" && (
                                            <a
                                                href={member.social.github}
                                                className={styles.socialLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FaGithub />
                                            </a>
                                        )}
                                        {member.social.twitter && member.social.twitter !== "#" && (
                                            <a
                                                href={member.social.twitter}
                                                className={styles.socialLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FaTwitter />
                                            </a>
                                        )}
                                        <a
                                            href={`mailto:${member.social.email}`}
                                            className={styles.socialLink}
                                        >
                                            <FaEnvelope />
                                        </a>
                                    </div>
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
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className={styles.joinTeam}
                >
                    <h3 className={styles.joinTitle}>Want to Join Our Executive Board?</h3>
                    <p className={styles.joinDescription}>
                        We're looking for passionate leaders to join our executive team and help shape the future
                        of ISAMM Microsoft Club. Take the next step in your leadership journey!
                    </p>
                    <Link to="/board-application" className={styles.joinButton}>
                        Apply Now
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Team;
