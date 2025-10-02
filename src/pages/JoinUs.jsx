import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/JoinUs.module.css';

const JoinUs = () => {
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        dateOfBirth: '',
        gender: '',
        university: '',
        yearOfStudy: '',
        fieldOfStudy: '',

        // Contact Information
        phoneNumber: '',
        email: '',
        socialPlatform: '', // New field for Facebook/Instagram choice
        socialProfile: '',
        linkedinProfile: '',
        state: '',
        howDidYouHear: '',
        howDidYouHearOther: '',

        // Experience
        previousClubExperience: '',
        leadershipExperience: '',
        portfolioLinks: '',

        // Membership Details
        interests: '',
        whyJoin: '',
        whatToAchieve: '',
        timeCommitment: '',

        // Team Rankings - now as an object for better management
        teamRankings: {
            designTeam: '',
            sponsoringTeam: '',
            productionTeam: '',
            projectTeam: '',
<<<<<<< HEAD
            marketingTeam: ''
=======
           marketingTeam: ''
>>>>>>> a9c28f82fc9246553dd9c4eb77419c1e485b6e2b
        },

        // Additional Questions
        biggestStrength: '',
        skillToLearn: '',
        weekendAvailability: '',
        schedulingConflicts: '',
        excitementLevel: '',
        additionalComments: '',

        // Agreement
        agreement: false
    });

    const [rankingErrors, setRankingErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const teams = [
        { key: 'designTeam', name: '🎨 Design Team', desc: 'UI/UX design, graphics, and visual branding' },
        { key: 'sponsoringTeam', name: '🤝 Sponsoring Team', desc: 'Partnerships, business development, and negotiations' },
        { key: 'productionTeam', name: '🎬 Production Team', desc: 'Video editing, filming, and content creation' },
        { key: 'projectTeam', name: '💻 Project Team', desc: 'Web development, programming, and technical solutions' },
<<<<<<< HEAD
        { key: 'marketingTeam', name: '📋 marketing Team', desc: 'Event planning, coordination, and project management' }
=======
        { key: 'marketingTeam', name: '📋marketing Team', desc: 'Event planning, coordination, and project management' }
>>>>>>> a9c28f82fc9246553dd9c4eb77419c1e485b6e2b
    ];

    // Function to validate unique rankings
    const validateRankings = (newRankings) => {
        const errors = {};
        const usedRankings = {};
        const rankings = Object.values(newRankings).filter(r => r !== '');

        // Check for duplicates
        rankings.forEach(ranking => {
            if (usedRankings[ranking]) {
                errors.duplicate = `Ranking ${ranking} is used multiple times. Each team must have a unique ranking.`;
            }
            usedRankings[ranking] = true;
        });

        return errors;
    };

    // Function to get available rankings for a specific team
    const getAvailableRankings = (currentTeam) => {
        const usedRankings = Object.entries(formData.teamRankings)
            .filter(([team, ranking]) => team !== currentTeam && ranking !== '')
            .map(([team, ranking]) => parseInt(ranking));

        return [1, 2, 3, 4, 5].filter(num => !usedRankings.includes(num));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name !== 'agreement') {
            // Handle multiple checkboxes for skills
            setFormData(prev => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter(item => item !== value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleRankingChange = (teamKey, value) => {
        const newRankings = {
            ...formData.teamRankings,
            [teamKey]: value
        };

        setFormData(prev => ({
            ...prev,
            teamRankings: newRankings
        }));

        // Validate rankings
        const errors = validateRankings(newRankings);
        setRankingErrors(errors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        // Form validation (keep your existing validation code...)
        const rankingValidation = validateRankings(formData.teamRankings);
        const allRankingsFilled = Object.values(formData.teamRankings).every(r => r !== '');

        if (Object.keys(rankingValidation).length > 0) {
            setRankingErrors(rankingValidation);
            setSubmitStatus({ type: 'error', message: 'Please fix the ranking errors before submitting.' });
            setIsSubmitting(false);
            return;
        }

        if (!allRankingsFilled) {
            setRankingErrors({ incomplete: 'Please rank all teams from 1 to 5.' });
            setSubmitStatus({ type: 'error', message: 'Please rank all teams from 1 to 5.' });
            setIsSubmitting(false);
            return;
        }

        try {
            const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

            // Check if environment variable exists
            if (!APPS_SCRIPT_URL) {
                throw new Error('Configuration error: API URL not found');
            }

            // Create FormData and append ALL form fields
            const formDataToSend = new FormData();

            // Personal Information
            formDataToSend.append('fullName', formData.fullName || '');
            formDataToSend.append('dateOfBirth', formData.dateOfBirth || '');
            formDataToSend.append('gender', formData.gender || '');
            formDataToSend.append('university', formData.university || '');
            formDataToSend.append('yearOfStudy', formData.yearOfStudy || '');
            formDataToSend.append('fieldOfStudy', formData.fieldOfStudy || '');

            // Contact Information
            formDataToSend.append('phoneNumber', formData.phoneNumber || '');
            formDataToSend.append('email', formData.email || '');
            formDataToSend.append('socialPlatform', formData.socialPlatform || '');
            formDataToSend.append('socialProfile', formData.socialProfile || '');
            formDataToSend.append('linkedinProfile', formData.linkedinProfile || '');
            formDataToSend.append('state', formData.state || '');
            formDataToSend.append('howDidYouHear', formData.howDidYouHear || '');
            formDataToSend.append('howDidYouHearOther', formData.howDidYouHearOther || '');

            // Experience
            formDataToSend.append('previousClubExperience', formData.previousClubExperience || '');
            formDataToSend.append('leadershipExperience', formData.leadershipExperience || '');
            formDataToSend.append('portfolioLinks', formData.portfolioLinks || '');

            // Membership Details
            formDataToSend.append('interests', formData.interests || '');
            formDataToSend.append('whyJoin', formData.whyJoin || '');
            formDataToSend.append('whatToAchieve', formData.whatToAchieve || '');
            formDataToSend.append('timeCommitment', formData.timeCommitment || '');

            // Additional Questions
            formDataToSend.append('biggestStrength', formData.biggestStrength || '');
            formDataToSend.append('skillToLearn', formData.skillToLearn || '');
            formDataToSend.append('weekendAvailability', formData.weekendAvailability || '');
            formDataToSend.append('schedulingConflicts', formData.schedulingConflicts || '');
            formDataToSend.append('excitementLevel', formData.excitementLevel || '');
            formDataToSend.append('additionalComments', formData.additionalComments || '');

            // Team Rankings (stringify the object)
            formDataToSend.append('teamRankings', JSON.stringify(formData.teamRankings));

            console.log('Submitting form data to:', APPS_SCRIPT_URL);

            // Debug: Log all form data being sent
            console.log('Form data being sent:');
            for (let [key, value] of formDataToSend.entries()) {
                console.log(`${key}: ${value}`);
            }

            // Submit form data
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // This bypasses CORS but you can't read the response
                body: formDataToSend,
            });

            // Since we can't read the response with no-cors, assume success
            console.log('Form submitted (no-cors mode)');

            setSubmitStatus({
                type: 'success',
                message: 'Thank you for your application! We will contact you soon. 🎉'
            });

            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    fullName: '', dateOfBirth: '', gender: '', university: '', yearOfStudy: '',
                    fieldOfStudy: '', phoneNumber: '', email: '', socialPlatform: '', socialProfile: '',
                    linkedinProfile: '', state: '', howDidYouHear: '', howDidYouHearOther: '',
                    previousClubExperience: '', leadershipExperience: '', portfolioLinks: '',
                    interests: '', whyJoin: '', whatToAchieve: '', timeCommitment: '', teamRankings: {
<<<<<<< HEAD
                        designTeam: '', sponsoringTeam: '', productionTeam: '', projectTeam: '', marketingTeam: ''
=======
                        designTeam: '', sponsoringTeam: '', productionTeam: '', projectTeam: '',marketingTeam: ''
>>>>>>> a9c28f82fc9246553dd9c4eb77419c1e485b6e2b
                    }, biggestStrength: '', skillToLearn: '', weekendAvailability: '',
                    schedulingConflicts: '', excitementLevel: '', additionalComments: '', agreement: false
                });
                setSubmitStatus({ type: '', message: '' });
            }, 5000);

        } catch (error) {
            console.error('Detailed submission error:', error);
            setSubmitStatus({
                type: 'error',
                message: `Submission failed: ${error.message}`
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    const tunisianStates = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan',
        'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana', 'Sousse',
        'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid',
        'Gabès', 'Medenine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'
    ];

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
                        Ready to be part of something amazing? Fill out this form to join the ISAMM Microsoft Club family!
                    </p>
                </motion.div>

                {/* Submit Status Message */}
                {submitStatus.message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${styles.statusMessage} ${styles[submitStatus.type]}`}
                    >
                        {submitStatus.message}
                    </motion.div>
                )}

                <motion.form
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={styles.joinForm}
                    onSubmit={handleSubmit}
                >
                    {/* Personal Information */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Personal Information</h2>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Full Name *</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Date of Birth *</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Gender *</label>
                            <div className={styles.checkboxGroup}>
                                {['Male', 'Female', 'Other', 'Prefer not to say'].map(option => (
                                    <label key={option} className={styles.checkboxLabel}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={option}
                                            checked={formData.gender === option}
                                            onChange={handleChange}
                                            className={styles.radio}
                                            disabled={isSubmitting}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>University *</label>
                            <input
                                type="text"
                                name="university"
                                value={formData.university}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Year of Study *</label>
                            <div className={styles.checkboxGroup}>
                                {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Other'].map(option => (
                                    <label key={option} className={styles.checkboxLabel}>
                                        <input
                                            type="radio"
                                            name="yearOfStudy"
                                            value={option}
                                            checked={formData.yearOfStudy === option}
                                            onChange={handleChange}
                                            className={styles.radio}
                                            disabled={isSubmitting}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Field of Study/Major *</label>
                            <input
                                type="text"
                                name="fieldOfStudy"
                                value={formData.fieldOfStudy}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Contact Information</h2>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Phone Number *</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Updated Social Profile Section */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Social Media Profile *</label>
                            <p className={styles.fieldNote}>
                                <strong>Note:</strong> We prefer a direct link to your profile, but you can also provide your username.
                            </p>

                            {/* Platform Selection */}
                            <div className={styles.platformSelection}>
                                <label className={styles.label}>Choose Platform:</label>
                                <div className={styles.checkboxGroup}>
                                    {['Facebook', 'Instagram'].map(platform => (
                                        <label key={platform} className={styles.checkboxLabel}>
                                            <input
                                                type="radio"
                                                name="socialPlatform"
                                                value={platform}
                                                checked={formData.socialPlatform === platform}
                                                onChange={handleChange}
                                                className={styles.radio}
                                                disabled={isSubmitting}
                                            />
                                            <span className={styles.platformIcon}>
                                                {platform === 'Facebook' ? '📘' : '📷'}
                                            </span>
                                            {platform}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Profile Input */}
                            {formData.socialPlatform && (
                                <div className={styles.profileInput}>
                                    <input
                                        type="text"
                                        name="socialProfile"
                                        value={formData.socialProfile}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder={
                                            formData.socialPlatform === 'Facebook'
                                                ? "e.g., https://facebook.com/yourprofile or your.username"
                                                : "e.g., https://instagram.com/yourusername or @yourusername"
                                        }
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>LinkedIn Profile (optional)</label>
                            <p className={styles.fieldNote}>
                                <strong>Note:</strong> We prefer a direct link to your LinkedIn profile.
                            </p>
                            <input
                                type="text"
                                name="linkedinProfile"
                                value={formData.linkedinProfile}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="e.g., https://linkedin.com/in/yourprofile"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>State *</label>
                            <div className={styles.stateGrid}>
                                {tunisianStates.map(state => (
                                    <label key={state} className={styles.checkboxLabel}>
                                        <input
                                            type="radio"
                                            name="state"
                                            value={state}
                                            checked={formData.state === state}
                                            onChange={handleChange}
                                            className={styles.radio}
                                            disabled={isSubmitting}
                                        />
                                        {state}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>How did you hear about our club? *</label>
                            <div className={styles.checkboxGroup}>
                                {[
                                    'Friend/Member referral',
                                    'Website',
                                    'Social media (Instagram/Facebook/LinkedIn)',
                                    'University event/fair',
                                    'Workshop or presentation',
                                    'Other'
                                ].map(option => (
                                    <label key={option} className={styles.checkboxLabel}>
                                        <input
                                            type="radio"
                                            name="howDidYouHear"
                                            value={option}
                                            checked={formData.howDidYouHear === option}
                                            onChange={handleChange}
                                            className={styles.radio}
                                            disabled={isSubmitting}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                            {formData.howDidYouHear === 'Other' && (
                                <input
                                    type="text"
                                    name="howDidYouHearOther"
                                    value={formData.howDidYouHearOther}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="Please specify..."
                                    disabled={isSubmitting}
                                />
                            )}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Experience</h2>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Previous club/organization experience (if exists)</label>
                            <textarea
                                name="previousClubExperience"
                                value={formData.previousClubExperience}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="3"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Any leadership experience</label>
                            <textarea
                                name="leadershipExperience"
                                value={formData.leadershipExperience}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="3"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Portfolio/Previous work links (GitHub, Behance, YouTube, etc.)</label>
                            <textarea
                                name="portfolioLinks"
                                value={formData.portfolioLinks}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="2"
                                placeholder="Please provide links to your work..."
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Membership Details */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Membership Details</h2>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Interests and hobbies  *</label>
                            <textarea
                                name="interests"
                                value={formData.interests}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="3"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Why do you want to join this club? *</label>
                            <textarea
                                name="whyJoin"
                                value={formData.whyJoin}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="4"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>What do you hope to achieve through this club? *</label>
                            <textarea
                                name="whatToAchieve"
                                value={formData.whatToAchieve}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="4"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>How much time can you commit weekly to club activities? *</label>
                            <div className={styles.checkboxGroup}>
                                {['2-4 hours', '5-8 hours', '9-12 hours', '13+ hours'].map(option => (
                                    <label key={option} className={styles.checkboxLabel}>
                                        <input
                                            type="radio"
                                            name="timeCommitment"
                                            value={option}
                                            checked={formData.timeCommitment === option}
                                            onChange={handleChange}
                                            className={styles.radio}
                                            disabled={isSubmitting}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Team Selection */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Team Selection - Choose Your Adventure! 🚀</h2>
                        <p className={styles.sectionDescription}>
                            Rank from 1-5, with 1 being your most preferred team. Each team must have a unique ranking: <br />
                            <b> <i> Important Note : </i> <br />
                                Your team choice does not affect workshop attendance. All participants can join every training session and workshop, no matter which team they belong to.</b>
                        </p>

                        {/* Display ranking errors */}
                        {Object.keys(rankingErrors).length > 0 && (
                            <div className={styles.errorMessage}>
                                {Object.values(rankingErrors).map((error, index) => (
                                    <p key={index} className={styles.errorText}>⚠️ {error}</p>
                                ))}
                            </div>
                        )}

                        <div className={styles.teamRankings}>
                            {teams.map(team => (
                                <div key={team.key} className={styles.teamRankingItem}>
                                    <div className={styles.teamInfo}>
                                        <h4>{team.name}</h4>
                                        <p>{team.desc}</p>
                                    </div>
                                    <div className={styles.rankingInput}>
                                        <label>Your ranking:</label>
                                        <select
                                            value={formData.teamRankings[team.key]}
                                            onChange={(e) => handleRankingChange(team.key, e.target.value)}
                                            className={`${styles.select} ${rankingErrors.duplicate && formData.teamRankings[team.key] ? styles.errorInput : ''
                                                }`}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Select</option>
                                            {getAvailableRankings(team.key).map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                            {/* Keep current selection even if it creates a duplicate */}
                                            {formData.teamRankings[team.key] &&
                                                !getAvailableRankings(team.key).includes(parseInt(formData.teamRankings[team.key])) && (
                                                    <option value={formData.teamRankings[team.key]}>
                                                        {formData.teamRankings[team.key]} (duplicate)
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                    {/* Show current selection status */}
                                    <div className={styles.rankingStatus}>
                                        {formData.teamRankings[team.key] && (
                                            <span className={`${styles.rankingBadge} ${Object.values(formData.teamRankings).filter(r => r === formData.teamRankings[team.key]).length > 1
                                                ? styles.duplicate : styles.valid
                                                }`}>
                                                Rank {formData.teamRankings[team.key]}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Ranking Summary */}
                        <div className={styles.rankingSummary}>
                            <h4>Current Rankings Summary:</h4>
                            <div className={styles.summaryGrid}>
                                {teams.map(team => (
                                    <div key={team.key} className={styles.summaryItem}>
                                        <span className={styles.teamNameShort}>
                                            {team.name.split(' ')[0]} {team.name.split(' ')[1]}
                                        </span>
                                        <span className={`${styles.summaryRank} ${formData.teamRankings[team.key] ?
                                            (Object.values(formData.teamRankings).filter(r => r === formData.teamRankings[team.key]).length > 1
                                                ? styles.duplicate : styles.valid)
                                            : styles.empty
                                            }`}>
                                            {formData.teamRankings[team.key] || '-'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Additional Questions */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Additional Questions</h2>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>What's your biggest strength that you'd contribute to the club? *</label>
                            <textarea
                                name="biggestStrength"
                                value={formData.biggestStrength}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="3"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>What's one skill you'd like to learn or improve through club participation? *</label>
                            <textarea
                                name="skillToLearn"
                                value={formData.skillToLearn}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="2"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Are you available for weekend activities/events? *</label>
                            <div className={styles.checkboxGroup}>
                                {['Yes, always', 'Sometimes', 'Rarely', 'No'].map(option => (
                                    <label key={option} className={styles.checkboxLabel}>
                                        <input
                                            type="radio"
                                            name="weekendAvailability"
                                            value={option}
                                            checked={formData.weekendAvailability === option}
                                            onChange={handleChange}
                                            className={styles.radio}
                                            disabled={isSubmitting}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Do you have any scheduling conflicts we should know about?</label>
                            <textarea
                                name="schedulingConflicts"
                                value={formData.schedulingConflicts}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="2"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>On a scale of 1-10, how excited are you to be part of our club? *</label>
                            <div className={styles.scaleGroup}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <label key={num} className={styles.scaleLabel}>
                                        <input
                                            type="radio"
                                            name="excitementLevel"
                                            value={num}
                                            checked={formData.excitementLevel === num.toString()}
                                            onChange={handleChange}
                                            className={styles.radio}
                                            disabled={isSubmitting}
                                        />
                                        {num}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Any additional comments or questions for us?</label>
                            <textarea
                                name="additionalComments"
                                value={formData.additionalComments}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="4"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Agreement */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Agreement and Signature</h2>

                        <div className={styles.agreementSection}>
                            <label className={styles.agreementLabel}>
                                <input
                                    type="checkbox"
                                    name="agreement"
                                    checked={formData.agreement}
                                    onChange={handleChange}
                                    className={styles.checkbox}
                                    required
                                    disabled={isSubmitting}
                                />
                                <span className={styles.agreementText}>
                                    I agree to the terms and conditions of joining ISAMM Microsoft Club and understand that
                                    my participation requires commitment to club activities and values. I confirm that all
                                    information provided is accurate and complete.
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.submitSection}>
                        <button
                            type="submit"
                            className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className={styles.spinner}></span>
                                    Submitting Application...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default JoinUs;
