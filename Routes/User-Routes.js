const { signup } = require("../Controllers/User-Controller");
const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

router.post("/signup", [check("nom").notEmpty(), check("prenom").notEmpty(), check("email").normalizeEmail().isEmail().withMessage("email est invalide"), check("password").isLength({ min: 4, max: 8 }).withMessage("mot de passe doit etre entre 4 et 8 caracteres")], signup);

module.exports = router;
