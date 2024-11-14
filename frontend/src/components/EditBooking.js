import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

export default function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    userId: '', eventTime: '', email: '', phone: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/bookings/${id}`)
      .then(response => {
        const data = response.data;
        setBookingData({
          userId: data.user_id,
          eventTime: data.event_time,
          email: data.email,
          phone: data.phone
        });
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (prop) => (event) => {
    setBookingData({ ...bookingData, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/bookings/${id}`, {
      user_id: bookingData.userId,
      event_time: bookingData.eventTime,
      email: bookingData.email,
      phone: bookingData.phone
    })
    .then(() => {
      alert('Booking updated successfully!');
      navigate('/');
    })
    .catch(console.error);
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
      <Button type="submit" variant="contained" color="primary">Update Booking</Button>
    </form>
  );
}
