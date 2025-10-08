import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
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
    socialMediaPage: '', // New Instagram/Facebook field
    
    // Position Application
    desiredPosition: '',
    secondChoicePosition: '',
    
    // Experience & Skills
    previousLeadershipExperience: '',
    relevantSkills: '',
    technicalSkills: [],
    portfolioLinks: '',
    achievements: '',
    
    // Position-specific answers
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Auto-hide popups after 5 seconds
  useEffect(() => {
    if (showSuccessPopup || showErrorPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
        setShowErrorPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup, showErrorPopup]);

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

  const validateForm = () => {
    // Check required fields
    if (!formData.fullName.trim()) {
      showError('Please fill in your Full Name');
      return false;
    }
    if (!formData.dateOfBirth) {
      showError('Please select your Date of Birth');
      return false;
    }
    if (!formData.gender) {
      showError('Please select your Gender');
      return false;
    }
    if (!formData.university.trim()) {
      showError('Please fill in your University');
      return false;
    }
    if (!formData.yearOfStudy) {
      showError('Please select your Year of Study');
      return false;
    }
    if (!formData.fieldOfStudy.trim()) {
      showError('Please fill in your Field of Study');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      showError('Please fill in your Phone Number');
      return false;
    }
    if (!formData.email.trim()) {
      showError('Please fill in your Email Address');
      return false;
    }
    if (!formData.linkedinProfile.trim()) {
      showError('Please fill in your LinkedIn Profile');
      return false;
    }
    if (!formData.desiredPosition) {
      showError('Please select your Desired Position');
      return false;
    }
    if (!formData.secondChoicePosition) {
      showError('Please select your Second Choice Position');
      return false;
    }
    if (formData.desiredPosition === formData.secondChoicePosition) {
      showError('Desired Position and Second Choice cannot be the same');
      return false;
    }
    if (!formData.previousLeadershipExperience.trim()) {
      showError('Please describe your Previous Leadership Experience');
      return false;
    }
    if (!formData.relevantSkills.trim()) {
      showError('Please describe your Relevant Skills');
      return false;
    }

    // Check position-specific answers
    const primaryQuestions = positionQuestions[formData.desiredPosition] || [];
    for (let i = 0; i < primaryQuestions.length; i++) {
      if (!formData.specificAnswers[i]?.trim()) {
        showError(`Please answer all questions for ${formData.desiredPosition}`);
        return false;
      }
    }

    const secondaryQuestions = positionQuestions[formData.secondChoicePosition] || [];
    for (let i = 0; i < secondaryQuestions.length; i++) {
      if (!formData.secondChoiceAnswers[i]?.trim()) {
        showError(`Please answer all questions for ${formData.secondChoicePosition}`);
        return false;
      }
    }

    if (!formData.whyThisPosition.trim()) {
      showError('Please explain why you want these positions');
      return false;
    }
    if (!formData.visionForClub.trim()) {
      showError('Please share your Vision for the Club');
      return false;
    }
    if (!formData.availabilityCommitment.trim()) {
      showError('Please describe your Availability & Commitment');
      return false;
    }
    if (!formData.agreement) {
      showError('Please agree to the commitment terms');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const telegramSent = await sendBoardApplicationNotification(formData);
      
      if (telegramSent) {
        showSuccess('Thank you! Your application has been submitted successfully. We will review it and contact you within 2 weeks. 🎉');
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            fullName: '',
            dateOfBirth: '',
            gender: '',
            university: '',
            yearOfStudy: '',
            fieldOfStudy: '',
            phoneNumber: '',
            email: '',
            linkedinProfile: '',
            socialMediaPage: '',
            desiredPosition: '',
            secondChoicePosition: '',
            previousLeadershipExperience: '',
            relevantSkills: '',
            technicalSkills: [],
            portfolioLinks: '',
            achievements: '',
            specificAnswers: {},
            secondChoiceAnswers: {},
            whyThisPosition: '',
            visionForClub: '',
            availabilityCommitment: '',
            agreement: false
          });
        }, 2000);
      } else {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showError('Failed to submit application. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showError = (message) => {
    setPopupMessage(message);
    setShowErrorPopup(true);
    setShowSuccessPopup(false);
  };

  const showSuccess = (message) => {
    setPopupMessage(message);
    setShowSuccessPopup(true);
    setShowErrorPopup(false);
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
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
                placeholder="https://www.linkedin.com/in/yourprofile or username"
                disabled={isSubmitting}
              />
              <small className={styles.inputHint}>
                We prefer a direct link for better results (e.g., https://linkedin.com/in/yourprofile). 
                If you don't know how or can't provide a link, it's okay to use just your username.
              </small>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Instagram or Facebook Page</label>
              <input
                type="text"
                name="socialMediaPage"
                value={formData.socialMediaPage}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://instagram.com/yourhandle or https://facebook.com/yourprofile"
                disabled={isSubmitting}
              />
              <small className={styles.inputHint}>
                We prefer a direct link for better results. If you don't have one or can't provide a link, you can use your username.
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

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            className={styles.popupContainer}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`${styles.popup} ${styles.successPopup}`}>
              <button className={styles.popupClose} onClick={closePopup}>
                <FaTimes />
              </button>
              <FaCheckCircle className={styles.popupIcon} />
              <p className={styles.popupMessage}>{popupMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Popup */}
      <AnimatePresence>
        {showErrorPopup && (
          <motion.div
            className={styles.popupContainer}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`${styles.popup} ${styles.errorPopup}`}>
              <button className={styles.popupClose} onClick={closePopup}>
                <FaTimes />
              </button>
              <FaExclamationCircle className={styles.popupIcon} />
              <p className={styles.popupMessage}>{popupMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BoardApplication;
