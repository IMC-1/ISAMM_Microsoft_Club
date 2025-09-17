// Telegram Service for Board Applications using Environment Variables
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

import { positionQuestions } from '../data/BoardApplicationQuestions';

// Helper function to format field names for display
const formatFieldName = (key) => {
    const fieldNameMap = {
        fullName: '👤 Full Name',
        dateOfBirth: '📅 Date of Birth',
        gender: '⚧ Gender',
        university: '🏫 University',
        yearOfStudy: '🎓 Year of Study',
        fieldOfStudy: '📚 Field of Study',
        phoneNumber: '📱 Phone Number',
        email: '📧 Email',
        linkedinProfile: '🔗 LinkedIn Profile',
        desiredPosition: '🎯 Desired Position',
        secondChoicePosition: '🔄 Second Choice Position',
        previousLeadershipExperience: '💼 Leadership Experience',
        relevantSkills: '🛠️ Relevant Skills',
        technicalSkills: '💻 Technical Skills',
        portfolioLinks: '🏆 Portfolio Links',
        achievements: '🏅 Achievements',
        whyThisPosition: '💡 Why These Positions',
        visionForClub: '🔮 Vision for Club',
        availabilityCommitment: '⏰ Availability & Commitment'
    };

    return fieldNameMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

// Helper function to format field values
const formatFieldValue = (key, value) => {
    if (!value) return 'Not provided';

    if (Array.isArray(value)) {
        return value.length > 0 ? value.join(', ') : 'None selected';
    }

    // Truncate long text fields for readability
    const longTextFields = ['previousLeadershipExperience', 'whyThisPosition', 'visionForClub', 'availabilityCommitment', 'relevantSkills', 'achievements'];
    if (longTextFields.includes(key) && value.length > 300) {
        return value.substring(0, 300) + '...';
    }

    return value;
};

export const sendBoardApplicationNotification = async (applicationData) => {
    // Check if environment variables are loaded
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error('Telegram credentials not found in environment variables');
        return false;
    }

    try {
        // Create comprehensive message with all form data
        let message = `🏆 *NEW EXECUTIVE BOARD APPLICATION RECEIVED!*\n\n`;

        // Personal Information Section
        message += `📋 *PERSONAL INFORMATION*\n`;
        const personalFields = ['fullName', 'dateOfBirth', 'gender', 'university', 'yearOfStudy', 'fieldOfStudy', 'phoneNumber', 'email', 'linkedinProfile'];
        personalFields.forEach(field => {
            if (applicationData[field] !== undefined) {
                message += `${formatFieldName(field)}: ${formatFieldValue(field, applicationData[field])}\n`;
            }
        });

        // Position Application Section
        message += `\n🎯 *POSITION APPLICATION*\n`;
        const positionFields = ['desiredPosition', 'secondChoicePosition'];
        positionFields.forEach(field => {
            if (applicationData[field] !== undefined) {
                message += `${formatFieldName(field)}: ${formatFieldValue(field, applicationData[field])}\n`;
            }
        });

        // Experience & Skills Section
        message += `\n💼 *EXPERIENCE & SKILLS*\n`;
        const experienceFields = ['previousLeadershipExperience', 'relevantSkills', 'technicalSkills', 'portfolioLinks', 'achievements'];
        experienceFields.forEach(field => {
            if (applicationData[field] !== undefined) {
                message += `${formatFieldName(field)}: ${formatFieldValue(field, applicationData[field])}\n`;
            }
        });

        // Position-Specific Answers
        if (applicationData.specificAnswers && Object.keys(applicationData.specificAnswers).length > 0) {
            message += `\n📝 *${applicationData.desiredPosition?.toUpperCase()} SPECIFIC ANSWERS*\n`;
            const questions = positionQuestions[applicationData.desiredPosition] || [];
            Object.entries(applicationData.specificAnswers).forEach(([index, answer]) => {
                if (answer) {
                    const questionText = questions[parseInt(index)] || `Question ${parseInt(index) + 1}`;
                    const truncatedQuestion = questionText.length > 100 ? questionText.substring(0, 100) + '...' : questionText;
                    const truncatedAnswer = answer.length > 200 ? answer.substring(0, 200) + '...' : answer;
                    message += `\n*Q${parseInt(index) + 1}:* ${truncatedQuestion}\n*A:* ${truncatedAnswer}\n`;
                }
            });
        }

        if (applicationData.secondChoiceAnswers && Object.keys(applicationData.secondChoiceAnswers).length > 0) {
            message += `\n📝 *${applicationData.secondChoicePosition?.toUpperCase()} SPECIFIC ANSWERS*\n`;
            const questions = positionQuestions[applicationData.secondChoicePosition] || [];
            Object.entries(applicationData.secondChoiceAnswers).forEach(([index, answer]) => {
                if (answer) {
                    const questionText = questions[parseInt(index)] || `Question ${parseInt(index) + 1}`;
                    const truncatedQuestion = questionText.length > 100 ? questionText.substring(0, 100) + '...' : questionText;
                    const truncatedAnswer = answer.length > 200 ? answer.substring(0, 200) + '...' : answer;
                    message += `\n*Q${parseInt(index) + 1}:* ${truncatedQuestion}\n*A:* ${truncatedAnswer}\n`;
                }
            });
        }

        // Motivation & Vision Section
        message += `\n🎯 *MOTIVATION & VISION*\n`;
        const motivationFields = ['whyThisPosition', 'visionForClub', 'availabilityCommitment'];
        motivationFields.forEach(field => {
            if (applicationData[field] !== undefined) {
                message += `${formatFieldName(field)}: ${formatFieldValue(field, applicationData[field])}\n`;
            }
        });

        message += `\n📊 View complete application details in the system!`;

        // Split message if it's too long (Telegram has a 4096 character limit)
        const messages = [];
        if (message.length > 4000) {
            // Split into multiple messages
            const parts = message.split('\n\n');
            let currentMessage = parts[0];

            for (let i = 1; i < parts.length; i++) {
                const nextPart = parts[i];
                if ((currentMessage + '\n\n' + nextPart).length > 4000) {
                    messages.push(currentMessage);
                    currentMessage = parts[i];
                } else {
                    currentMessage += '\n\n' + nextPart;
                }
            }
            messages.push(currentMessage);
        } else {
            messages.push(message);
        }

        // Send all message parts
        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        for (let i = 0; i < messages.length; i++) {
            const payload = {
                chat_id: TELEGRAM_CHAT_ID,
                text: messages[i],
                parse_mode: 'Markdown'
            };

            const response = await fetch(telegramApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Failed to send Telegram message ${i + 1}:`, errorData);
                return false;
            }

            // Small delay between messages to avoid rate limiting
            if (i < messages.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        console.log('All Telegram notifications sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
        return false;
    }
};

// Optional: Function to test Telegram connection
export const testTelegramConnection = async () => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error('Telegram credentials not configured');
        return false;
    }

    const testMessage = '🧪 Test message from IMC Board Application system';

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const payload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: testMessage
    };

    try {
        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return response.ok;
    } catch (error) {
        console.error('Telegram connection test failed:', error);
        return false;
    }
};
