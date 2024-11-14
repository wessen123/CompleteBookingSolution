const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
  try {
    const [rows] = await Booking.fetchAll();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const [booking] = await Booking.findById(req.params.id);
    res.status(200).json(booking[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const result = await Booking.create(req.body);
    res.status(201).json({ message: 'Booking created', bookingId: result[0].insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    await Booking.update(req.params.id, req.body);
    res.status(200).json({ message: 'Booking updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.delete(req.params.id);
    res.status(200).json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
