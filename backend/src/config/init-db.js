const db = require('./db');

const createTable = `
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_time DATETIME NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL
);
`;

const insertDummyData = `
INSERT INTO bookings (user_id, event_time, email, phone) VALUES
(1, '2024-12-15 14:00:00', 'user@example.com', '+1234567890'),
(2, '2024-12-16 15:00:00', 'user2@example.com', '+1234567891'),
(3, '2024-12-17 16:00:00', 'user3@example.com', '+1234567892');
`;

db.query(createTable)
  .then(() => {
    console.log('Booking table created or already exists.');
    return db.query('SELECT COUNT(*) AS count FROM bookings');
  })
  .then(result => {
    if (result[0][0].count === 0) {
      console.log('Inserting dummy data...');
      return db.query(insertDummyData);
    } else {
      console.log('Dummy data already present.');
    }
  })
  .then(() => {
    console.log('Database initialized.');
  })
  .catch(err => {
    console.error('Error initializing database:', err);
  });
