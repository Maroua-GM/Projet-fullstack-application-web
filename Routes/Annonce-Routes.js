const AnnonceContronller = require("../Controllers/Annonce-Controller");
const { check } = require("express-validator");
const express = require("express");

const { auth } = require("../Middlwares/auth");
const router = express.Router();

router.post("/add", auth, AnnonceContronller.createAnnonce);
router.get("/annonces", AnnonceContronller.getAnnonces);
module.exports = router;
