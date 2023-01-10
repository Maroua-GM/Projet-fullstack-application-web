const AnnonceContronller = require("../Controllers/Annonce-Controller");
const { check } = require("express-validator");
const express = require("express");

const { auth } = require("../Middlwares/auth");
const router = express.Router();

router.get("/getAnnonceUser", auth, AnnonceContronller.getAnnonceUser);
router.post("/add", auth, AnnonceContronller.createAnnonce);
router.get("/annonces", AnnonceContronller.getAnnonces);
router.get("/:id", AnnonceContronller.getAnnonce);
router.put("/:id", auth, AnnonceContronller.updateAnnonce);
router.delete("/:id", auth, AnnonceContronller.deleteAnnonce);
module.exports = router;
