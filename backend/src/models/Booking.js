const db = require('../config/db');

class Booking {
  static fetchAll() {
    return db.execute('SELECT * FROM bookings');
  }

  static findById(id) {
    return db.execute('SELECT * FROM bookings WHERE id = ?', [id]);
  }

  static create(newBooking) {
    return db.execute(
      'INSERT INTO bookings (user_id, event_time, email, phone) VALUES (?, ?, ?, ?)',
      [newBooking.user_id, newBooking.event_time, newBooking.email, newBooking.phone]
    );
  }

  static update(id, updatedBooking) {
    return db.execute(
      'UPDATE bookings SET user_id = ?, event_time = ?, email = ?, phone = ? WHERE id = ?',
      [updatedBooking.user_id, updatedBooking.event_time, updatedBooking.email, updatedBooking.phone, id]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM bookings WHERE id = ?', [id]);
  }
}

module.exports = Booking;
