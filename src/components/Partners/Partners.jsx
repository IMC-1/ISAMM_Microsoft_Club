import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/Partners.module.css';

// Import all partner logos
import aloraShop from '../../assets/images/partners/alora shop.png';
import artul from '../../assets/images/partners/artul.png';
import casa from '../../assets/images/partners/casa.png';
import esenMicrosoft from '../../assets/images/partners/esen microsoft club.png';
import fabskills from '../../assets/images/partners/Fabskills.png';
import isammLogo from '../../assets/images/partners/isamm logo.png';
import jciManouba from '../../assets/images/partners/JCI-Manouba.png';
import mlsa from '../../assets/images/partners/MLSA.png';
import redix from '../../assets/images/partners/REDIX_LOGOO.png';
import yessly from '../../assets/images/partners/yessly training center.png';

const Partners = () => {
    const partners = [
        {
            logo: casa ,
            name: "Worldwide" ,
            url: "https://casaworldwide.org/" ,
            description: "social donation platform"
        },
        {
            logo: jciManouba,
            name: "JCI Manouba",
            url: "https://www.facebook.com/JCI.Manouba",
            description: "Junior Chamber International"
        },
        {
            logo: redix,
            name: "Redix Solutions",
            url: "https://www.redixsolutions.pro/",
            description: "Digital solutions Provider"
        },
        {
            logo: mlsa,
            name: "MLSA",
            url: "https://studentambassadors.microsoft.com/",
            description: "Microsoft Learn Student Ambassadors"
        },
        {
            logo: esenMicrosoft,
            name: "ESEN Microsoft Club",
            url: "https://www.facebook.com/esenien",
            description: "Partner Microsoft Student Club"
        },
        {
            logo: fabskills,
            name: "FabSkills",
            url: "https://fabskill.com/en/",
            description: "Skills Development Platform"
        },
        {
            logo: yessly,
            name: "Yessly Training Center",
            url: "https://www.facebook.com/YESLY.Training.center",
            description: "Professional Training Institute"
        },
        {
            logo: artul,
            name: "Artful",
            url: "https://www.instagram.com/___artful_/",
            description: "Creative Design Agency"
        },
        {
            logo: aloraShop,
            name: "Alora Shop",
            url: "https://www.instagram.com/_alora_shop/",
            description: "Creative Design Agency"
        },
        {
            logo: isammLogo,
            name: "ISAMM",
            url: "https://isa2m.rnu.tn/",
            description: "Our Home Institution"
        }
    ];

    const handlePartnerClick = (url, name) => {
        if (url && url !== "#") {
            window.open(url, '_blank', 'noopener,noreferrer');
            console.log(`Visited partner: ${name}`);
        }
    };

    return (
        <section className={styles.partners}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Our Partners
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={styles.partnersDescription}
                >
                    Together with our amazing partners, we create exceptional learning experiences
                    and unlock opportunities for our community.
                </motion.p>

                <div className={styles.partnersGrid}>
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`${styles.partnerCard} ${!partner.url || partner.url === "#" ? styles.noLink : ""
                                }`}
                            whileHover={{ y: -5, scale: 1.03 }}
                            onClick={() => handlePartnerClick(partner.url, partner.name)}
                        >
                            <div className={styles.logoContainer}>
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className={styles.partnerLogo}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className={styles.logoPlaceholder} style={{ display: 'none' }}>
                                    {partner.name}
                                </div>
                            </div>

                            <div className={styles.partnerInfo}>
                                <h3 className={styles.partnerName}>{partner.name}</h3>
                                <p className={styles.partnerDescription}>{partner.description}</p>
                                {partner.url && partner.url !== "#" && (
                                    <div className={styles.visitIndicator}>
                                        Click to visit →
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className={styles.partnershipCTA}
                >
                    <h3 className={styles.ctaTitle}>Want to Partner with Us?</h3>
                    <p className={styles.ctaDescription}>
                        Join our growing network of partners and help us empower the next generation of tech innovators.
                    </p>
                    <button className={styles.ctaButton}>
                        Become a Partner
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Partners;
