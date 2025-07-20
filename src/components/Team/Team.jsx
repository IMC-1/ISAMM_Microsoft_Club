import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';
import styles from '../../styles/Team.module.css';
import img1 from '../../assets/images/managers/img.jpg';
import img2 from '../../assets/images/managers/img.jpg';
import img3 from '../../assets/images/managers/img.jpg';
import img4 from '../../assets/images/managers/img.jpg';
import img5 from '../../assets/images/managers/img.jpg';
import img6 from '../../assets/images/managers/img.jpg';
import img7 from '../../assets/images/managers/img.jpg';
import img8 from '../../assets/images/managers/img.jpg';

const Team = () => {
    const teamMembers = [
        {
            name: "Ahmed Ben Salem",
            position: "President",
            image: img1,
            description: "Leading the club with passion for technology and innovation. Computer Science student with expertise in full-stack development.",
            social: {
                linkedin: "#",
                github: "#",
                twitter: "#",
                email: "ahmed@isaммmc.org"
            }
        },
        {
            name: "Fatma Trabelsi",
            position: "Vice President",
            image: img2,
            description: "Supporting strategic initiatives and member engagement. Specializes in project management and business development.",
            social: {
                linkedin: "#",
                github: "#",
                twitter: "#",
                email: "fatma@isaммmc.org"
            }
        },
        {
            name: "Mohamed Gharbi",
            position: "Production Manager",
            image: img3,
            description: "Overseeing all production activities and content creation. Expert in multimedia production and event management.",
            social: {
                linkedin: "#",
                github: "#",
                twitter: "#",
                email: "mohamed@isaммmc.org"
            }
        },
        {
            name: "Salma Bouaziz",
            position: "Project Manager",
            image: img4,
            description: "Managing technical projects and team coordination. Skilled in agile methodologies and software development.",
            social: {
                linkedin: "#",
                github: "#",
                twitter: "#",
                email: "salma@isaммmc.org"
            }
        },
        {
            name: "Youssef Mansouri",
            position: "Sponsoring Manager",
            image: img5,
            description: "Building partnerships and managing sponsor relationships. Business-oriented with strong networking skills.",
            social: {
                linkedin: "#",
                github: "#",
                twitter: "#",
                email: "youssef@isaммmc.org"
            }
        },
        {
            name: "Leila Jrad",
            position: "Community Manager",
            image: img6,
            description: "Engaging with our community and managing social media presence. Expert in digital marketing and community building.",
            social: {
                linkedin: "#",
                github: "#",
                twitter: "#",
                email: "leila@isaммmc.org"
            }
        },
        {
            name: "Amira Ben Ali",
            position: "Training Manager",
            image: img7,
            description: "Leading our comprehensive training programs and educational initiatives. Specializes in curriculum development and skills enhancement.",
            social: {
                linkedin: "#",
                github: "#",
                twitter: "#",
                email: "amira@isaммmc.org"
            }
        },
        {
            name: "Karim Zaidi",
            position: "Logistics Manager",
            image: img8,
            description: "Orchestrating seamless event planning and operational coordination. Expert in project management and resource optimization.",
            social: {
                linkedin: "#",
                github: "#",
                twitter: "#",
                email: "karim@isaммmc.org"
            }
        }
    ];

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
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
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
                                />
                                <div className={styles.memberOverlay}>
                                    <div className={styles.socialLinks}>
                                        <a href={member.social.linkedin} className={styles.socialLink}>
                                            <FaLinkedin />
                                        </a>
                                        <a href={member.social.github} className={styles.socialLink}>
                                            <FaGithub />
                                        </a>
                                        <a href={member.social.twitter} className={styles.socialLink}>
                                            <FaTwitter />
                                        </a>
                                        <a href={`mailto:${member.social.email}`} className={styles.socialLink}>
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
