const Booking = require("../models/booking.model");
const Counter = require("../models/counter.model");

class BookingService {
  async getBookings(req, res) {
    const result = await Booking.find();
    return res.send(result);
  }

  async getUserBookings(req, res) {
    const user = req.params.user;
    const result = await Booking.find({ idClient: user });
    return res.send(result);
  }

  async newBooking(req, res) {
    let booking = req.body;
    booking.id = await counterFn("bookingCounter");
    await Booking.create(booking);
    res.status(200).send("Reserva creada correctamente");
  }
  async deleteBooking(req, res) {
    const client = req.body.client;
    const booking = req.body.booking;
    await Booking.findOneAndDelete({ idClient: client, id: booking });
    res.send("La reserva ha sido cancelada");
  }
}

const counterFn = async (counterName) => {
  let contador = await Counter.findOne({ id: counterName });
  newValue = contador.seq_value + 1;
  await Counter.findOneAndUpdate({ id: counterName }, { seq_value: newValue });
  return contador.seq_value;
};

module.exports = BookingService;
