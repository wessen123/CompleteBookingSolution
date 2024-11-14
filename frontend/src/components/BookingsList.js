import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  function deleteBooking(id) {
    axios.delete(`http://localhost:5000/bookings/${id}`)
      .then(() => {
        setBookings(bookings.filter(booking => booking.id !== id));
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <List>
      {bookings.map(booking => (
        <ListItem
          key={booking.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => deleteBooking(booking.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={`Booking for User ID: ${booking.user_id}`}
            secondary={`Scheduled Time: ${booking.event_time}`}
          />
          <Button component={Link} to={`/edit/${booking.id}`}>Edit</Button>
        </ListItem>
      ))}
    </List>
  );
}
