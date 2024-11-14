import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

export default function AddBooking() {
  const [bookingData, setBookingData] = useState({
    userId: '', eventTime: '', email: '', phone: ''
  });

  const handleChange = (prop) => (event) => {
    setBookingData({ ...bookingData, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/bookings', {
      user_id: bookingData.userId,
      event_time: bookingData.eventTime,
      email: bookingData.email,
      phone: bookingData.phone
    })
    .then(() => {
      alert('Booking added successfully!');
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <TextField
        label="User ID"
        value={bookingData.userId}
        onChange={handleChange('userId')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Event Time"
        type="datetime-local"
        value={bookingData.eventTime}
        onChange={handleChange('eventTime')}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Email"
        type="email"
        value={bookingData.email}
        onChange={handleChange('email')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        value={bookingData.phone}
        onChange={handleChange('phone')}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">Add Booking</Button>
    </form>
  );
}
