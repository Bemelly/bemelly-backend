const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    place: {
      type: String,
    },
    date: {
      type: Number,
      required: true,
    },
    idPublication: {
      type: Number,
      required: true,
    },
    idClient: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Booking", bookingSchema);
