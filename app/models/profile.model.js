const { Schema, model } = require("mongoose");

const profileShema = new Schema({
  idUser: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  photoProfile: {
    type: String,
  },
});

module.exports = model("Profile", profileShema);
