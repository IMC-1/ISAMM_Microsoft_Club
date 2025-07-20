import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/BoardApplication.module.css';

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

        // Position-Specific Questions (will be populated based on selected position)
        specificAnswers: {},
        secondChoiceAnswers: {},

        // Motivation & Vision
        whyThisPosition: '',
        visionForClub: '',
        availabilityCommitment: '',

        // References
        reference1Name: '',
        reference1Contact: '',
        reference1Relationship: '',
        reference2Name: '',
        reference2Contact: '',
        reference2Relationship: '',

        // Agreement
        agreement: false
    });

    const positions = [
        'President',
        'Vice President',
        'Production Manager',
        'Project Manager',
        'Sponsoring Manager',
        'Community Manager',
        'Training Manager',
        'Logistics Manager'
    ];

    const technicalSkillOptions = [
        'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
        'Video Editing', 'Photography', 'Digital Marketing', 'Social Media Management',
        'Project Management', 'Event Planning', 'Public Speaking', 'Content Creation',
        'Data Analysis', 'Microsoft Office Suite', 'Adobe Creative Suite', 'Figma',
        'Programming Languages', 'Cloud Computing', 'Database Management', 'Other'
    ];

    // Position-specific questions
    const positionQuestions = {
        'President': [
            'What is your vision for the future of ISAMM Microsoft Club?',
            'How would you handle conflicts within the executive board?',
            'Describe a situation where you successfully led a team through a challenging project.',
            'What strategies would you implement to increase club membership and engagement?',
            'How do you plan to maintain relationships with university administration and external partners?'
        ],
        'Vice President': [
            'How would you support the President in achieving the club\'s goals?',
            'What role do you see yourself playing in strategic decision-making?',
            'Describe your experience with project coordination and team management.',
            'How would you handle situations where you disagree with the President\'s decisions?',
            'What initiatives would you propose to improve club operations?'
        ],
        'Production Manager': [
            'Describe your experience with video production, photography, or content creation.',
            'What software and tools are you proficient in for multimedia production?',
            'How would you ensure consistent branding across all club content?',
            'Describe a creative project you\'ve managed from concept to completion.',
            'How would you coordinate with other teams to create promotional materials for events?'
        ],
        'Project Manager': [
            'What project management methodologies are you familiar with?',
            'Describe a complex project you\'ve successfully managed.',
            'How do you handle project deadlines and resource constraints?',
            'What tools do you use for project planning and team collaboration?',
            'How would you ensure quality deliverables while maintaining timelines?'
        ],
        'Sponsoring Manager': [
            'Describe your experience with business development or partnership building.',
            'How would you approach potential sponsors and present the club\'s value proposition?',
            'What strategies would you use to maintain long-term sponsor relationships?',
            'How comfortable are you with presenting and negotiating?',
            'What do you think makes a successful sponsorship proposal?'
        ],
        'Community Manager': [
            'Describe your experience with social media management and digital marketing.',
            'How would you increase community engagement across different platforms?',
            'What content strategies would you implement to attract and retain followers?',
            'How do you measure the success of community engagement initiatives?',
            'Describe a time when you successfully built or grew an online community.'
        ],
        'Training Manager': [
            'Describe your experience with teaching, training, or curriculum development.',
            'What topics would you prioritize in the club\'s training programs?',
            'How would you assess the effectiveness of training sessions?',
            'What methods do you use to accommodate different learning styles?',
            'How would you coordinate with external trainers and certification bodies?'
        ],
        'Logistics Manager': [
            'Describe your experience with event planning and coordination.',
            'How do you approach budget management for events and activities?',
            'What contingency planning strategies do you employ?',
            'How would you coordinate with venues, vendors, and service providers?',
            'Describe a challenging logistical problem you\'ve solved.'
        ]
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Board Application submitted:', formData);
        alert('Thank you for your application! We will review it and contact you within 2 weeks.');
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
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
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
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>LinkedIn Profile *</label>
                            <input
                                type="url"
                                name="linkedinProfile"
                                value={formData.linkedinProfile}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                placeholder="https://www.linkedin.com/in/yourprofile"
                            />
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
                                rows="4"
                                required
                                placeholder="Describe your leadership roles, responsibilities, and achievements..."
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Relevant Skills & Expertise *</label>
                            <textarea
                                name="relevantSkills"
                                value={formData.relevantSkills}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="3"
                                required
                                placeholder="List your key skills relevant to your desired positions..."
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
                                rows="2"
                                placeholder="GitHub, portfolio website, projects, etc."
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Notable Achievements</label>
                            <textarea
                                name="achievements"
                                value={formData.achievements}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="3"
                                placeholder="Awards, recognitions, successful projects, etc."
                            />
                        </div>
                    </div>

                    {/* Primary Position-Specific Questions */}
                    {formData.desiredPosition && positionQuestions[formData.desiredPosition] && (
                        <div className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>
                                {formData.desiredPosition} - Specific Questions
                            </h2>
                            <p className={styles.sectionNote}>
                                Please answer these questions specifically for your desired position: <strong>{formData.desiredPosition}</strong>
                            </p>
                            {positionQuestions[formData.desiredPosition].map((question, index) => (
                                <div key={index} className={styles.inputGroup}>
                                    <label className={styles.label}>
                                        {index + 1}. {question} *
                                    </label>
                                    <textarea
                                        name={`specificAnswer_${index}`}
                                        value={formData.specificAnswers[index] || ''}
                                        onChange={handleChange}
                                        className={styles.textarea}
                                        rows="4"
                                        required
                                        placeholder="Please provide a detailed answer..."
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Second Choice Position-Specific Questions */}
                    {formData.secondChoicePosition && positionQuestions[formData.secondChoicePosition] && (
                        <div className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>
                                {formData.secondChoicePosition} - Specific Questions
                            </h2>
                            <p className={styles.sectionNote}>
                                Please answer these questions specifically for your second choice position: <strong>{formData.secondChoicePosition}</strong>
                            </p>
                            {positionQuestions[formData.secondChoicePosition].map((question, index) => (
                                <div key={index} className={styles.inputGroup}>
                                    <label className={styles.label}>
                                        {index + 1}. {question} *
                                    </label>
                                    <textarea
                                        name={`secondChoiceAnswer_${index}`}
                                        value={formData.secondChoiceAnswers[index] || ''}
                                        onChange={handleChange}
                                        className={styles.textarea}
                                        rows="4"
                                        required
                                        placeholder="Please provide a detailed answer for this second choice position..."
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
                                rows="4"
                                required
                                placeholder="Explain your motivation for both your desired position and second choice position..."
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Your Vision for the Club *</label>
                            <textarea
                                name="visionForClub"
                                value={formData.visionForClub}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="4"
                                required
                                placeholder="Share your vision for the future of ISAMM Microsoft Club and how you would contribute in either role..."
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Availability & Time Commitment *</label>
                            <textarea
                                name="availabilityCommitment"
                                value={formData.availabilityCommitment}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="3"
                                required
                                placeholder="Describe your availability and how many hours per week you can commit to executive board responsibilities..."
                            />
                        </div>
                    </div>

                    {/* References */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>References</h2>
                        <p className={styles.sectionNote}>
                            Please provide two references (professors, previous employers, mentors, etc.)
                        </p>

                        <div className={styles.referenceContainer}>
                            <h3 className={styles.referenceTitle}>Reference 1</h3>
                            <div className={styles.inputRow}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Full Name *</label>
                                    <input
                                        type="text"
                                        name="reference1Name"
                                        value={formData.reference1Name}
                                        onChange={handleChange}
                                        className={styles.input}
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Contact Information *</label>
                                    <input
                                        type="text"
                                        name="reference1Contact"
                                        value={formData.reference1Contact}
                                        onChange={handleChange}
                                        className={styles.input}
                                        required
                                        placeholder="Email or phone number"
                                    />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Relationship to You *</label>
                                <input
                                    type="text"
                                    name="reference1Relationship"
                                    value={formData.reference1Relationship}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                    placeholder="e.g., Professor, Manager, Mentor"
                                />
                            </div>
                        </div>

                        <div className={styles.referenceContainer}>
                            <h3 className={styles.referenceTitle}>Reference 2</h3>
                            <div className={styles.inputRow}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Full Name *</label>
                                    <input
                                        type="text"
                                        name="reference2Name"
                                        value={formData.reference2Name}
                                        onChange={handleChange}
                                        className={styles.input}
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Contact Information *</label>
                                    <input
                                        type="text"
                                        name="reference2Contact"
                                        value={formData.reference2Contact}
                                        onChange={handleChange}
                                        className={styles.input}
                                        required
                                        placeholder="Email or phone number"
                                    />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Relationship to You *</label>
                                <input
                                    type="text"
                                    name="reference2Relationship"
                                    value={formData.reference2Relationship}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                    placeholder="e.g., Professor, Manager, Mentor"
                                />
                            </div>
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
                                />
                                <span className={styles.agreementText}>
                                    I understand that serving on the executive board requires significant time commitment and dedication.
                                    I agree to fulfill my responsibilities for either my desired position or second choice position,
                                    attend regular meetings, and contribute actively to the club's mission. All information provided
                                    in this application is accurate and complete. I authorize the club to contact my references for verification.
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

export default BoardApplication;
