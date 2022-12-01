const express = require("express");
const router = express.Router();
const BookingService = require("../controllers/booking.controller");
const bookingService = new BookingService();

router.get("/getBookings", bookingService.getBookings);
router.get("/getUserBookings/:user", bookingService.getUserBookings);
router.post("/newBooking", bookingService.newBooking);
router.delete("/deleteBooking", bookingService.deleteBooking);

module.exports = router;
