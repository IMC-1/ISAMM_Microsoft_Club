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
            logisticsTeam: ''
        },

        // Skills by team (will be dynamically shown)
        designSkills: [],
        designTools: [],
        designExperience: '',
        designPortfolio: '',

        businessSkills: [],
        languages: [],
        businessExperience: '',
        partnerships: '',

        videoSkills: [],
        productionTools: [],
        videoExperience: '',
        videoPortfolio: '',

        programmingLanguages: [],
        developmentAreas: [],
        developmentTools: [],
        programmingExperience: '',
        codePortfolio: '',

        eventSkills: [],
        planningTools: [],
        eventExperience: '',
        largestEvent: '',

        // Team specific questions
        whyThisTeam: '',
        uniqueSkills: '',
        projectIdea: '',

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

    const teams = [
        { key: 'designTeam', name: '🎨 Design Team', desc: 'UI/UX design, graphics, and visual branding' },
        { key: 'sponsoringTeam', name: '🤝 Sponsoring Team', desc: 'Partnerships, business development, and negotiations' },
        { key: 'productionTeam', name: '🎬 Production Team', desc: 'Video editing, filming, and content creation' },
        { key: 'projectTeam', name: '💻 Project Team', desc: 'Web development, programming, and technical solutions' },
        { key: 'logisticsTeam', name: '📋 Logistics Team', desc: 'Event planning, coordination, and project management' }
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation for rankings
        const rankingValidation = validateRankings(formData.teamRankings);
        const allRankingsFilled = Object.values(formData.teamRankings).every(r => r !== '');

        if (Object.keys(rankingValidation).length > 0) {
            setRankingErrors(rankingValidation);
            alert('Please fix the ranking errors before submitting.');
            return;
        }

        if (!allRankingsFilled) {
            setRankingErrors({ incomplete: 'Please rank all teams from 1 to 5.' });
            alert('Please rank all teams from 1 to 5.');
            return;
        }

        console.log('Form submitted:', formData);
        // Handle form submission here
        alert('Thank you for your application! We will contact you soon.');
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
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Facebook or Instagram Profile *</label>
                            <input
                                type="url"
                                name="socialProfile"
                                value={formData.socialProfile}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>LinkedIn Profile (optional)</label>
                            <input
                                type="url"
                                name="linkedinProfile"
                                value={formData.linkedinProfile}
                                onChange={handleChange}
                                className={styles.input}
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
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Team Selection - Updated with unique ranking validation */}
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
                        <button type="submit" className={styles.submitButton}>
                            Submit Application
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default JoinUs;
