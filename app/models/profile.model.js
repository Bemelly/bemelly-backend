const { Schema, model } = require("mongoose");
const { schema } = require("./counter.model");

const profileShema = new Schema({
  idUser: {
    type: schema.CC,
    ref: "User",
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
