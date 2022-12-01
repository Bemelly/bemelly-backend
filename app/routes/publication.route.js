const express = require("express");
const PublicationService = require("../controllers/publication.controller");
const router = express.Router();
const publicationService = new PublicationService();

router.get("/getPublications", publicationService.getPublications);
router.post("/newPublication", publicationService.newPublication);
router.delete("/deletePublication", publicationService.deletePublication);
router.put("/modifyPublication", publicationService.modifyPublication);
router.get("/getUserPublications/:CC", publicationService.getUserPublications);
router.post("/newReview", publicationService.newReview);
router.delete("/deleteReview", publicationService.deleteReview);
router.put("/modifyReview", publicationService.modifyReview);

module.exports = router;
