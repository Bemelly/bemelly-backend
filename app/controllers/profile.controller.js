const uploadFromBuffer = require("../utilities/files/uploadFiles");
const Profile = require("../models/profile.model");

const updatePhotoProfile = async (req, res) => {
  console.log(req.file);
  const resultUploadPhoto = await uploadFromBuffer(req.file);
  try {
    if (!resultUploadPhoto) {
      return res.status(400).json({
        ok: false,
        message: "No se pudo obtener la url de la foto",
      });
    }

    const photoUpdated = await Profile.findOneAndUpdate(
      { idUser: req.user.id },
      { photoProfile: resultUploadPhoto.url }
    );
    if (!photoUpdated) {
      await Profile.create({
        idUser: req.user.id,
        photoProfile: resultUploadPhoto.url,
      });
    }

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ idUser: req.user.id });

    if (!profile) {
      return res.status(404).json({
        ok: false,
        message: "Perfil no encontrado",
      });
    }
    return res.status(200).json({
      ok: true,
      data: profile,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error,
    });
  }
};

module.exports = {
  updatePhotoProfile,
  getProfile,
};
