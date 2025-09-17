import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/BoardApplication.module.css';
import { sendBoardApplicationNotification } from '../services/telegramService';
import { positions, technicalSkillOptions, positionQuestions } from '../data/BoardApplicationQuestions';

const BoardApplication = () => {
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        dateOfBirth: '',
        gender: '',
        university: '',
        yearOfStudy: '',
        fieldOfStudy: '',
        phoneNumber: '',
        email: '',
        linkedinProfile: '',

        // Position Application
        desiredPosition: '',
        secondChoicePosition: '',

        // Experience & Skills
        previousLeadershipExperience: '',
        relevantSkills: '',
        technicalSkills: [],
        portfolioLinks: '',
        achievements: '',

        // Position-Specific Questions
        specificAnswers: {},
        secondChoiceAnswers: {},

        // Motivation & Vision
        whyThisPosition: '',
        visionForClub: '',
        availabilityCommitment: '',

        // Agreement
        agreement: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'technicalSkills') {
            setFormData(prev => ({
                ...prev,
                technicalSkills: checked
                    ? [...prev.technicalSkills, value]
                    : prev.technicalSkills.filter(skill => skill !== value)
            }));
        } else if (name.startsWith('specificAnswer_')) {
            const questionIndex = name.split('_')[1];
            setFormData(prev => ({
                ...prev,
                specificAnswers: {
                    ...prev.specificAnswers,
                    [questionIndex]: value
                }
            }));
        } else if (name.startsWith('secondChoiceAnswer_')) {
            const questionIndex = name.split('_')[1];
            setFormData(prev => ({
                ...prev,
                secondChoiceAnswers: {
                    ...prev.secondChoiceAnswers,
                    [questionIndex]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            // Send Telegram notification with all form data
            const telegramSent = await sendBoardApplicationNotification(formData);

            if (telegramSent) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Thank you for your application! We will review it and contact you within 2 weeks. 🎉'
                });

                // Reset form after successful submission
                setTimeout(() => {
                    setFormData({
                        fullName: '', dateOfBirth: '', gender: '', university: '', yearOfStudy: '',
                        fieldOfStudy: '', phoneNumber: '', email: '', linkedinProfile: '',
                        desiredPosition: '', secondChoicePosition: '', previousLeadershipExperience: '',
                        relevantSkills: '', technicalSkills: [], portfolioLinks: '', achievements: '',
                        specificAnswers: {}, secondChoiceAnswers: {}, whyThisPosition: '',
                        visionForClub: '', availabilityCommitment: '', agreement: false
                    });
                    setSubmitStatus({ type: '', message: '' });
                }, 5000);
            } else {
                throw new Error('Failed to send application notification');
            }
        } catch (error) {
            console.error('Application submission error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Failed to submit application. Please try again or contact support.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.boardApplicationPage}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.pageHeader}
                >
                    <h1 className={styles.pageTitle}>Executive Board Application</h1>
                    <p className={styles.pageSubtitle}>
                        Join the leadership team of ISAMM Microsoft Club and make a lasting impact on our community!
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
                    className={styles.applicationForm}
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

                        <div className={styles.inputRow}>
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
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
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

                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Year of Study *</label>
                                <select
                                    name="yearOfStudy"
                                    value={formData.yearOfStudy}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select Year</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                    <option value="5th Year">5th Year</option>
                                    <option value="Graduate">Graduate</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Field of Study *</label>
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

                        <div className={styles.inputRow}>
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
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>LinkedIn Profile *</label>
                            <input
                                type="text"
                                name="linkedinProfile"
                                value={formData.linkedinProfile}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                placeholder="https://www.linkedin.com/in/yourprofile or your LinkedIn username"
                                disabled={isSubmitting}
                            />
                            <small className={styles.inputHint}>
                                We prefer a direct link to your LinkedIn profile, but you can also provide your username.
                            </small>
                        </div>
                    </div>

                    {/* Position Application */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Position Application</h2>

                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Desired Position *</label>
                                <select
                                    name="desiredPosition"
                                    value={formData.desiredPosition}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select Position</option>
                                    {positions.map(position => (
                                        <option key={position} value={position}>{position}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Second Choice Position *</label>
                                <select
                                    name="secondChoicePosition"
                                    value={formData.secondChoicePosition}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select Second Choice</option>
                                    {positions.filter(pos => pos !== formData.desiredPosition).map(position => (
                                        <option key={position} value={position}>{position}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.positionNote}>
                            <p>
                                <strong>Note:</strong> You must select both a desired position and a second choice position.
                                This increases your chances of being selected for the executive board and helps us find the best fit for your skills.
                            </p>
                        </div>
                    </div>

                    {/* Experience & Skills */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Experience & Skills</h2>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Previous Leadership Experience *</label>
                            <textarea
                                name="previousLeadershipExperience"
                                value={formData.previousLeadershipExperience}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows={4}
                                required
                                placeholder="Describe your leadership roles, responsibilities, and achievements..."
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Relevant Skills & Expertise *</label>
                            <textarea
                                name="relevantSkills"
                                value={formData.relevantSkills}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows={3}
                                required
                                placeholder="List your key skills relevant to your desired positions..."
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Technical Skills (Select all that apply)</label>
                            <div className={styles.checkboxGrid}>
                                {technicalSkillOptions.map(skill => (
                                    <label key={skill} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            name="technicalSkills"
                                            value={skill}
                                            checked={formData.technicalSkills.includes(skill)}
                                            onChange={handleChange}
                                            className={styles.checkbox}
                                            disabled={isSubmitting}
                                        />
                                        {skill}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Portfolio/Work Links</label>
                            <textarea
                                name="portfolioLinks"
                                value={formData.portfolioLinks}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows={2}
                                placeholder="GitHub, portfolio website, projects, etc."
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Notable Achievements</label>
                            <textarea
                                name="achievements"
                                value={formData.achievements}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows={3}
                                placeholder="Awards, recognitions, successful projects, etc."
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Primary Position-Specific Questions */}
                    {formData.desiredPosition && positionQuestions[formData.desiredPosition] && (
                        <div className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>{formData.desiredPosition} - Specific Questions</h2>
                            <p className={styles.sectionNote}>
                                Please answer these questions specifically for your desired position: <strong>{formData.desiredPosition}</strong>
                            </p>

                            {positionQuestions[formData.desiredPosition].map((question, index) => (
                                <div key={index} className={styles.inputGroup}>
                                    <label className={styles.label}>
                                        {index + 1}. {question}
                                    </label>
                                    <textarea
                                        name={`specificAnswer_${index}`}
                                        value={formData.specificAnswers[index] || ''}
                                        onChange={handleChange}
                                        className={styles.textarea}
                                        rows={4}
                                        required
                                        placeholder="Please provide a detailed answer..."
                                        disabled={isSubmitting}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Second Choice Position-Specific Questions */}
                    {formData.secondChoicePosition && positionQuestions[formData.secondChoicePosition] && (
                        <div className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>{formData.secondChoicePosition} - Specific Questions</h2>
                            <p className={styles.sectionNote}>
                                Please answer these questions specifically for your second choice position: <strong>{formData.secondChoicePosition}</strong>
                            </p>

                            {positionQuestions[formData.secondChoicePosition].map((question, index) => (
                                <div key={index} className={styles.inputGroup}>
                                    <label className={styles.label}>
                                        {index + 1}. {question}
                                    </label>
                                    <textarea
                                        name={`secondChoiceAnswer_${index}`}
                                        value={formData.secondChoiceAnswers[index] || ''}
                                        onChange={handleChange}
                                        className={styles.textarea}
                                        rows={4}
                                        required
                                        placeholder="Please provide a detailed answer for this second choice position..."
                                        disabled={isSubmitting}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Motivation & Vision */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Motivation & Vision</h2>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Why do you want these positions? *</label>
                            <textarea
                                name="whyThisPosition"
                                value={formData.whyThisPosition}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows={4}
                                required
                                placeholder="Explain your motivation for both your desired position and second choice position..."
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Your Vision for the Club *</label>
                            <textarea
                                name="visionForClub"
                                value={formData.visionForClub}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows={4}
                                required
                                placeholder="Share your vision for the future of ISAMM Microsoft Club and how you would contribute in either role..."
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Availability & Time Commitment *</label>
                            <textarea
                                name="availabilityCommitment"
                                value={formData.availabilityCommitment}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows={3}
                                required
                                placeholder="Describe your availability and how many hours per week you can commit to executive board responsibilities..."
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Agreement */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Agreement & Commitment</h2>

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
                                    I understand that serving on the executive board requires significant time commitment and dedication.
                                    I agree to fulfill my responsibilities for either my desired position or second choice position,
                                    attend regular meetings, and contribute actively to the club's mission.
                                    All information provided in this application is accurate and complete.
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.submitSection}>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default BoardApplication;
