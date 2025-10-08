import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGlobe, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import styles from '../styles/joinus.module.css';
import { Link } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.6 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const JoinUs = () => {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.heroBackPattern} />
        <div className={styles.heroContent}>
          <motion.span className={styles.badge} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            ISAMM Microsoft Club
          </motion.span>
          <motion.h1
            className={styles.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Grow, Build, Lead — with the Microsoft spirit
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            Thanks for the incredible interest! New applications are coming soon. Stay tuned and follow us to be the first to know. Meanwhile, the Board Application is still open — step into leadership today.
          </motion.p>

          <motion.div className={styles.ctaRow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Link to="/BoardApplication" className={styles.primaryCta} aria-label="Apply to Executive Board">
              Apply to Executive Board <FaArrowRight />
            </Link>
            <a
              href="https://www.instagram.com/isamm_microsoft_club/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryCta}
              aria-label="Follow us on Instagram"
            >
              Follow us
            </a>
          </motion.div>

          <motion.div className={styles.note} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <FaCheckCircle className={styles.noteIcon} />
            <span>Board Application is open now. General applications will open soon — stay tuned.</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Highlights */}
      <motion.section className={styles.highlights} variants={container} initial="hidden" animate="show">
        <motion.div className={styles.card} variants={item}>
          <div className={styles.cardAccent} />
          <h3>Microsoft DNA</h3>
          <p>Learn, build, and collaborate using modern Microsoft technologies while adopting industry-standard practices and a growth mindset.</p>
        </motion.div>

        <motion.div className={styles.card} variants={item}>
          <div className={styles.cardAccent} data-accent="green" />
          <h3>Impactful Community</h3>
          <p>Join a driven community of makers and leaders. Build projects, lead events, and shape experiences that matter.</p>
        </motion.div>

        <motion.div className={styles.card} variants={item}>
          <div className={styles.cardAccent} data-accent="orange" />
          <h3>Events & Training</h3>
          <p>From workshops to talks and hack days — level up skills with hands-on sessions designed for real-world impact.</p>
        </motion.div>
      </motion.section>

      {/* Social Follow */}
      <motion.section className={styles.follow} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2>Stay tuned — follow us</h2>
        <p>Don’t miss announcements for the next application cycle. Follow our channels and keep notifications on.</p>
        <div className={styles.socialRow}>
          <a
            href="https://www.instagram.com/isamm_microsoft_club/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Instagram"
          >
            <FaInstagram />
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/isamm-microsoft-club"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="LinkedIn"
          >
            <FaLinkedin />
            LinkedIn
          </a>
          <a
            href="https://imc-1.github.io/ISAMM_Microsoft_Club/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Official Website"
          >
            <FaGlobe />
            Website
          </a>
        </div>
      </motion.section>

      {/* Timeline / What to Expect */}
      <motion.section className={styles.timeline} variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <h2>What to expect next</h2>
        <div className={styles.steps}>
          <motion.div className={styles.step} variants={item}>
            <div className={styles.dot} />
            <div>
              <h4>Announcements</h4>
              <p>We’ll announce new openings and timelines on social media and the website — keep an eye out.</p>
            </div>
          </motion.div>
          <motion.div className={styles.step} variants={item}>
            <div className={styles.dot} data-accent="green" />
            <div>
              <h4>Application Window</h4>
              <p>Submit a short form to tell us about skills, interests, and availability. Clear, simple, and fast.</p>
            </div>
          </motion.div>
          <motion.div className={styles.step} variants={item}>
            <div className={styles.dot} data-accent="orange" />
            <div>
              <h4>Interviews & Onboarding</h4>
              <p>Short interviews for selected candidates and onboarding to teams, tools, and projects.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section className={styles.footerCta} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className={styles.footerCard}>
          <h3>Be first to know</h3>
          <p>Follow our social media — new application is coming soon. The Executive Board Application remains open.</p>
          <div className={styles.footerActions}>
            <Link to="/BoardApplication" className={styles.primaryCta} aria-label="Apply to Executive Board">
              Apply to Executive Board <FaArrowRight />
            </Link>
            <a
              href="https://www.instagram.com/isamm_microsoft_club/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryCtaAlt}
              aria-label="Follow on Instagram"
            >
              Follow updates
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default JoinUs;
