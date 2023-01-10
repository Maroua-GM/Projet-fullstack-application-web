const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Annonce = require("../Moduls/Annonce");
const User = require("../Moduls/User");

/**POST creer une annonce */
exports.createAnnonce = async (req, res) => {
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
exports.getAnnonces = async (req, res) => {
	try {
		const annonces = await Annonce.find();
		return res.status(200).json({ annonces });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};
/**GET ANNONCE */
exports.getAnnonce = async (req, res) => {
	try {
		const annonce = await Annonce.findById(req.params.id);
		if (annonce) {
			res.status(200).json(annonce);
		}
	} catch (error) {
		return res.status(500).json({ message: "annonce not found" });
	}
};

/**PUT modifier une annonce */
exports.updateAnnonce = async (req, res) => {
	/**recuperer les informations d'une nouvelle annonce */
	const { nom, prix, description, qteDispo, categorie } = req.body;
	let user;
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
		let annonce = await Annonce.findById(req.params.id);
		if (annonce && annonce.user.toString() === req.userData.id) {
			annonce.nom = nom;
			annonce.prix = prix;
			annonce.description = description;
			annonce.qteDispo = qteDispo;
			annonce.categorie = categorie;
			await annonce.save();
			return res.status(200).json({ message: "l'annonce a été mit à jour avec succès", annonce });
		} else {
			return res.status(404).json({ message: "vous pouvez pas modifer l'annonce" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la mise à jour d'annonce" });
	}
};
/** DELETE supprimer une annonce */
exports.deleteAnnonce = async (req, res) => {
	let user;
	try {
		/**verifier si l'utilisateur existe bien dans la base de donnees */
		user = await User.findById(req.userData.id);

		const annonce = await Annonce.findById(req.params.id);

		if (annonce && annonce.user.toString() === req.userData.id) {
			await annonce.delete();
			return res.status(204).json();
		} else {
			return res.status(404).json({ message: "vous ne pouvez pas supprimer l'annonce" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la suppression d'annonce" });
	}
};
/** GET avoir la liste les annonces d'un seule utilisateur*/
exports.getAnnonceUser = async (req, res) => {
	const iduser = req.userData.id;
	let user;
	let annonces;
	try {
		/**verifier si l'utilisateur existe bien dans la base de donnees */
		user = await User.findById(req.userData.id);

		annonces = await Annonce.find({ user: iduser });
		res.status(200).json({ annonces });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};
