const nodemailer = require('nodemailer');
const { createEvent } = require('ics');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

function sendCalendarInvite(email, bookingDetails) {
    const { eventTime, summary, description, duration = 60 } = bookingDetails;
    const eventDate = new Date(eventTime);
    const endDate = new Date(eventDate.getTime() + duration * 60000);

    const event = {
        start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), eventDate.getHours(), eventDate.getMinutes()],
        end: [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate(), endDate.getHours(), endDate.getMinutes()],
        title: summary,
        description: description,
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'Booking System', email: process.env.SMTP_USER }
    };

    createEvent(event, (error, value) => {
        if (error) {
            console.log('Failed to create calendar event:', error);
            return;
        }

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Your Booking Confirmation',
            text: 'Please find attached your booking confirmation.',
            icalEvent: {
                filename: 'invitation.ics',
                method: 'request',
                content: value
            }
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Failed to send email:', err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
}

module.exports = sendCalendarInvite;
