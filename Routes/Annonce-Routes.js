const AnnonceContronller = require("../Controllers/Annonce-Controller");
const { check } = require("express-validator");
const express = require("express");
const { application } = require("express");
const { auth } = require("../Middlwares/auth");
const router = express.Router();

application.use(auth);
router.post("/add", AnnonceContronller.createAnnonce);

module.exports = router;
