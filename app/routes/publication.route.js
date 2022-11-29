const express = require("express");
const router = express.Router();
const {
  newPublication,
  deletePublication,
  modifyPublication,
  getPublications,
  getUserPublications,
  newReview,
  deleteReview,
  modifyReview,
} = require("../controllers/publication.controller");

router.get("/getPublications", getPublications);
router.post("/newPublication", newPublication);
router.delete("/deletePublication", deletePublication);
router.put("/modifyPublication", modifyPublication);
router.get("/getUserPublications/:CC", getUserPublications);
router.post("/newReview", newReview);
router.delete("/deleteReview", deleteReview);
router.put("/modifyReview", modifyReview);

module.exports = router;
