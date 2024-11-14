const Twilio = require('twilio');
const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSMS(to, message) {
    try {
        const response = await client.messages.create({
            body: message,
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER
        });
        console.log('SMS sent:', response.sid);
    } catch (error) {
        console.error('Failed to send SMS:', error);
    }
}

module.exports = sendSMS;
