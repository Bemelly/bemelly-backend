const express = require("express");
const { updatePhotoProfile } = require("../controllers/profile.controller");
const router = express.Router();
const multer = require("multer");
const { tokenValidation } = require("../utilities/middlewares/authValidation");

const upload = multer();

router.post(
  "/updatePhotoProfile",
  tokenValidation,
  upload.single("photo"),
  updatePhotoProfile
);

module.exports = router;
