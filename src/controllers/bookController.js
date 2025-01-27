const { bookService } = require('../services');
const { catchAsync } = require('../utils/error');

const makeBooking = catchAsync(async (req, res) => {
  // const userId = req.userId;
  const userId = 4;
  const productId = req.params.productId;
  const { price, guests, startDate, endDate } = req.body;

  if (!price || !guests || !startDate || !endDate) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  };

  await bookService.makeBooking(userId, productId, price, guests, startDate, endDate);
  res.status(201).json({ message: "PLEASE_PROCEED_PAYMENT" });
})

const checkBookingInfo = catchAsync(async (req, res) => {
  const userId = 1;
  const bookingInfo = await bookService.checkBookingInfo(userId);
  console.log("bookingINfo" + JSON.stringify(bookingInfo))
  return res.status(200).json({ data: bookingInfo });
})

const confirmBooking = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { price, guests, startDate, endDate } = req.body;

  if (!price || !guests || !startDate || !endDate) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  };

  await bookService.confirmBooking(userId, price, guests, startDate, endDate);

  res.status(200).json({ message: 'BOOKING_CONFIRMED!' });
})

const completeBooking = catchAsync(async (req, res) => {
  const userId = req.userId;
  const orderedbooking = await bookService.completeBooking(userId);

  return res.status(200).json({ data: orderedbooking });
})

const getAllBookings = catchAsync(async (req, res) => {
  // const userId = req.userId;
  const userId = 1;
  const bookings = await bookService.getAllBookings(userId);

  return res.status(200).json({ data: bookings });
})

const cancelBooking = catchAsync(async (req, res) => {
  const userId = req.userId;
  const productId = req.params.productId;
  const startDate = req.body['start_date'];
  const endDate = req.body['end_date'];

  if (!productId || !startDate || !endDate) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await bookService.cancelBooking(userId, productId, startDate, endDate);

  res.status(200).json({ message: 'BOOKING_CANCELED' });
})

module.exports = {
  makeBooking,
  getAllBookings,
  checkBookingInfo,
  confirmBooking,
  cancelBooking,
  completeBooking
}