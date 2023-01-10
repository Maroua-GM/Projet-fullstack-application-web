const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Annonce = require("../Moduls/Annonce");
const User = require("../Moduls/User");

/**POST creer une annonce */
exports.createAnnonce = async (req, res, next) => {
	/**recuperer les informations d'une annonce */
	const { nom, prix, description, qteDispo, categorie } = req.body;
	let user,
		result = null;
	try {
		//expres validateur
		const errorsObj = validationResult(req);
		if (!errorsObj.isEmpty()) {
			const errorsClient = errorsObj.errors.map((error) => {
				return { message: error.msg, field: error.param };
			});

			return res.status(422).json({ errors: errorsClient });
		}

		/**verifier si l'utilisateur existe bien dans la base de donnees */
		user = await User.findById(req.userData.id);
		if (!user) {
			return res.status(404).json({ message: "utilisateur n'existe pas" });
		}

		result = await Annonce.create({ nom, prix, description, qteDispo, categorie, user: req.userData.id });

		return res.status(201).json({ message: "Annonce crée", result: result });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error });
	}
};
/**GET get all annonces */
exports.getAnnonces = async (req, res, next) => {
	try {
		const annonces = await Annonce.find();
		if (annonces.length !== 0) {
			return res.status(200).json({ annonces });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};
