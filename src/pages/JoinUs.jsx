import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/JoinUs.module.css';

const JoinUs = () => {
  return (
    <div className={styles.joinUsPage}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.pageHeader}
        >
          <h1 className={styles.pageTitle}>Join IMC</h1>
          <p className={styles.pageSubtitle}>
            Ready to be part of something amazing? Unfortunately, our application period has ended.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.closedContainer}
        >
          <div className={styles.closedBox}>
            <h2 className={styles.closedTitle}>🚫 Applications are Closed</h2>
            <p className={styles.closedText}>
              Thank you for your interest in joining the <strong>ISAMM Microsoft Club</strong>!  
              The recruitment period for this season is now officially closed.
            </p>
            <p className={styles.closedText}>
              Stay tuned for future opportunities — follow us on our social media channels
              to get notified when applications reopen.
            </p>

            <div className={styles.socialButtons}>
              <a
                href="https://www.instagram.com/isammicrosoftclub/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                📷 Instagram
              </a>
              <a
                href="https://www.facebook.com/ISAMMMicrosoftClub"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                📘 Facebook
              </a>
              <a
                href="https://www.linkedin.com/company/isammicrosoftclub"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinUs;