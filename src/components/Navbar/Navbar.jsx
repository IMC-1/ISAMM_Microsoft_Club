import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from '../../styles/Navbar.module.css';
import logo from '../../assets/images/imc_logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleNavLinkClick = (sectionId) => {
        closeMenu();

        // If we're on the join page, navigate to home first then scroll
        if (location.pathname === '/join') {
            window.location.href = `/#${sectionId}`;
            return;
        }

        // If we're on the home page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                <Link to="/" className={styles.navLogo} onClick={closeMenu}>
                    <img src={logo} alt="IMC Logo" />
                    <span>IMC</span>
                </Link>

                <div className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
                    <button
                        onClick={() => handleNavLinkClick('home')}
                        className={styles.navLink}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => handleNavLinkClick('about')}
                        className={styles.navLink}
                    >
                        About Us
                    </button>
                    <button
                        onClick={() => handleNavLinkClick('activities')}
                        className={styles.navLink}
                    >
                        Activities
                    </button>
                    <button
                        onClick={() => handleNavLinkClick('events')}
                        className={styles.navLink}
                    >
                        Events
                    </button>

                    <Link to="/join" className={styles.joinButton} onClick={closeMenu}>
                        Join Us
                    </Link>
                </div>

                <div className={styles.navToggle} onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
