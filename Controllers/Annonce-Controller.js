const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Annonce = require("../Moduls/Annonce");
const User = require("../Moduls/User");
const { default: mongoose } = require("mongoose");

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
		/**creer une instance Annonce */
		const annonce = new Annonce({ nom, prix, description, qteDipso, categorie, user: req.userData.id });
		/**verifier si l'utilisateur existe bien dans la base de donnees */
		user = await User.findById(req.userData.id);
		if (!user) {
			return res.status(404).json({ message: "utilisateur n'existe pas" });
		}
		/**utiliser les transaction et les sessions */
		const session = await mongoose.startSession();
		session.startTransaction();
		result = await annonce.save({ session });
		//faire un commit
		await session.commitTransaction();
		return res.status(201).json({ message: "Annonce crée", result: annonce });
	} catch (error) {}
};
