import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaBriefcase, FaCalendarAlt, FaUsers, FaComments } from 'react-icons/fa';
import styles from '../../styles/Activities.module.css';

const Activities = () => {
    const [activeTab, setActiveTab] = useState(0);

    const activities = [
        {
            icon: <FaCode />,
            title: "Real Projects",
            description: "Web Development Projects",
            details: [
                "Full-stack web applications using React, Node.js, and databases",
                "Code reviews and best practices",
                "Example projects: QR code menus for restaurants",
                "Events websites for conferences and gatherings",
                "Club websites for student organizations",
                "E-commerce store websites with full functionality",
                "And many more innovative solutions"
            ],
            color: "var(--ms-blue)"
        },
        {
            icon: <FaPalette />,
            title: "Training Programs",
            description: "Design, Business & Web Development",
            details: [
                "UI/UX Design with Figma and Adobe Creative Suite",
                "Business Development and Entrepreneurship",
                "Web Development (HTML, CSS, JavaScript, React)",
                "Digital Marketing and Social Media Management",
                "Logistics and Event Planning with project management tools",
                "Strategic planning and vendor coordination",
                "Budget management and timeline optimization"
            ],
            color: "var(--ms-orange)"
        },
        {
            icon: <FaCalendarAlt />,
            title: "Events",
            description: "Community Gatherings & Competitions",
            details: [
                "Hackathons and coding competitions",
                "Tech conferences and seminars",
                "Networking events with industry professionals",
                "Project showcases and demo days",
                "Annual Microsoft Student Summit"
            ],
            color: "var(--ms-green)"
        },
        {
            icon: <FaBriefcase />,
            title: "Workshops",
            description: "Certified Learning Sessions",
            details: [
                "Microsoft Azure fundamentals and advanced topics",
                "Power Platform (Power BI, Power Apps, Power Automate)",
                "Microsoft 365 development",
                "AI and Machine Learning workshops",
                "Cybersecurity awareness and best practices",
                "Digital Marketing strategies and campaign management",
                "Design Thinking methodologies and human-centered design",
                "Professional Communication and presentation skills",
                "Negotiation techniques and conflict resolution strategies"
            ],
            color: "var(--ms-cyan)"
        },
        {
            icon: <FaUsers />,
            title: "Community Events",
            description: "Networking & Knowledge Sharing",
            details: [
                "Monthly tech meetups and discussions",
                "Mentorship programs with industry experts",
                "Career guidance and interview preparation",
                "Alumni networking sessions",
                "Collaborative project teams"
            ],
            color: "var(--ms-blue)"
        },
        {
            icon: <FaComments />,
            title: "Debates",
            description: "Tech Discussions & Thought Leadership",
            details: [
                "Technology trends and future predictions",
                "Ethics in AI and machine learning",
                "Open source vs proprietary software",
                "Startup ecosystem and innovation",
                "Digital transformation in various industries"
            ],
            color: "var(--ms-orange)"
        }
    ];

    return (
        <section id="activities" className={styles.activities}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Our Activities
                </motion.h2>

                <div className={styles.activitiesContainer}>
                    <div className={styles.activitiesNav}>
                        {activities.map((activity, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`${styles.navButton} ${activeTab === index ? styles.active : ''
                                    }`}
                                onClick={() => setActiveTab(index)}
                                style={{ '--accent-color': activity.color }}
                            >
                                <div className={styles.navIcon}>
                                    {activity.icon}
                                </div>
                                <div className={styles.navContent}>
                                    <h3>{activity.title}</h3>
                                    <p>{activity.description}</p>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className={styles.activitiesContent}
                    >
                        <div
                            className={styles.contentHeader}
                            style={{ '--accent-color': activities[activeTab].color }}
                        >
                            <div className={styles.contentIcon}>
                                {activities[activeTab].icon}
                            </div>
                            <div>
                                <h3 className={styles.contentTitle}>
                                    {activities[activeTab].title}
                                </h3>
                                <p className={styles.contentDescription}>
                                    {activities[activeTab].description}
                                </p>
                            </div>
                        </div>

                        <ul className={styles.detailsList}>
                            {activities[activeTab].details.map((detail, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className={styles.detailItem}
                                >
                                    <span className={styles.detailBullet}>✓</span>
                                    {detail}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Activities;
