require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Require CORS
const bookingRoutes = require('./routes/bookings');
require('./config/init-db'); // Database initialization

const app = express();

// Use CORS with default options to allow all cross-origin requests
// You can also customize the options to restrict to specific origins
app.use(cors());

app.use(bodyParser.json());
app.use('/bookings', bookingRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
