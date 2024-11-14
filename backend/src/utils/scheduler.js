const nodeCron = require('node-cron');
const Booking = require('../models/Booking');
const sendSMS = require('./smsSender');
const sendCalendarInvite = require('./mailer');

nodeCron.schedule('* * * * *', async () => {
    console.log('Running a task every minute');
    const bookings = await Booking.getUpcomingBookings(); // Implement this method to fetch upcoming bookings
    bookings.forEach(async (booking) => {
        const message = `Reminder: Your booking for ${booking.event_time} is coming up.`;
        await sendSMS(booking.phone, message);
        const bookingDetails = {
            email: booking.email,
            eventTime: booking.event_time,
            summary: 'Your Booking Confirmation',
            description: 'Details about the event.'
        };
        await sendCalendarInvite(booking.email, bookingDetails);
    });
});
