import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar';
import BookingsList from './components/BookingsList';
import AddBooking from './components/AddBooking';
import EditBooking from './components/EditBooking';

// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>  
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<BookingsList />} />
          <Route path="/add" element={<AddBooking />} />
          <Route path="/edit/:id" element={<EditBooking />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
