import React from 'react';
import { motion } from 'framer-motion';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaHeart
} from 'react-icons/fa';
import styles from '../../styles/Footer.module.css';
import logo from '../../assets/images/imc_logo.png';

const Footer = () => {
    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About Us', href: '#about' },
        { name: 'Activities', href: '#activities' },
        { name: 'Events', href: '#events' },
        { name: 'Team', href: '#team' }
    ];

    const activities = [
        'Web & Mobile Apps Dev',
        'AI & Cybersecurity',
        'UI/UX design',
        'Production & Content Creation',
        'Business Development',
        'Soft Skills'
    ];

    const contactInfo = {
        address: 'ISAMM Campus, University of Manouba, Manouba, Tunisia',
        phone: '+216 92 861 655',
        email: 'hi.imc2011@gmail.com'
    };

    const socialLinks = [
        { icon: <FaFacebookF />, href: 'https://www.facebook.com/IsammMicrosoftClub', platform: 'Facebook' },
        { icon: <FaInstagram />, href: 'https://www.instagram.com/isamm_microsoft_club/', platform: 'Instagram' },
        { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/company/isamm-microsoft-club/', platform: 'LinkedIn' },
        { icon: <FaGithub />, href: 'https://github.com/IMC-1', platform: 'GitHub' }
    ];

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    {/* Logo and Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className={styles.footerSection}
                    >
                        <div className={styles.logoSection}>
                            <img src={logo} alt="ISAMM Microsoft Club" className={styles.footerLogo} />
                            <h3 className={styles.clubName}>ISAMM Microsoft Club</h3>
                        </div>
                        <p className={styles.clubDescription}>
                            Empowering the next generation of tech leaders through innovation,
                            collaboration, and continuous learning. Join us in shaping the future
                            of technology.
                        </p>
                        <div className={styles.socialLinks}>
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    className={styles.socialLink}
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    transition={{ duration: 0.3 }}
                                    aria-label={social.platform}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className={styles.footerSection}
                    >
                        <h4 className={styles.sectionTitle}>Quick Links</h4>
                        <ul className={styles.linksList}>
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className={styles.footerLink}>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Activities */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className={styles.footerSection}
                    >
                        <h4 className={styles.sectionTitle}>Our Focus Areas</h4>
                        <ul className={styles.linksList}>
                            {activities.map((activity, index) => (
                                <li key={index}>
                                    <span className={styles.activityItem}>
                                        {activity}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className={styles.footerSection}
                    >
                        <h4 className={styles.sectionTitle}>Contact Us</h4>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <FaMapMarkerAlt className={styles.contactIcon} />
                                <span>{contactInfo.address}</span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaPhone className={styles.contactIcon} />
                                <a href={`tel:${contactInfo.phone}`} className={styles.contactLink}>
                                    {contactInfo.phone}
                                </a>
                            </div>
                            <div className={styles.contactItem}>
                                <FaEnvelope className={styles.contactIcon} />
                                <a href={`mailto:${contactInfo.email}`} className={styles.contactLink}>
                                    {contactInfo.email}
                                </a>
                            </div>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className={styles.newsletter}>
                            <h5 className={styles.newsletterTitle}>Stay Updated</h5>
                            <div className={styles.newsletterForm}>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className={styles.emailInput}
                                />
                                <button className={styles.subscribeButton}>
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className={styles.footerBottom}
                >
                    <div className={styles.copyright}>
                        <p>
                            © {new Date().getFullYear()} ISAMM Microsoft Club. Made with{' '}
                            <FaHeart className={styles.heartIcon} /> by the IMC Team.
                        </p>
                    </div>
                    <div className={styles.footerBottomLinks}>
                        <a href="#privacy" className={styles.bottomLink}>Privacy Policy</a>
                        <a href="#terms" className={styles.bottomLink}>Terms of Service</a>
                        <a href="#cookies" className={styles.bottomLink}>Cookie Policy</a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
