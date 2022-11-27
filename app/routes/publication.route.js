const express = require("express");
const router = express.Router();
const {
  newPublication,
  deletePublication,
  modifyPublication,
  getPublications,
  getUserPublications,
  newReview,
} = require("../controllers/publication.controller");

router.get("/getPublications", getPublications);
router.post("/newPublication", newPublication);
router.delete("/deletePublication", deletePublication);
router.put("/modifyPublication", modifyPublication);
router.get("/getUserPublications/:CC", getUserPublications);
router.post("/newReview", newReview);

module.exports = router;
