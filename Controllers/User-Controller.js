require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Moduls/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.signup = async (req, res, next) => {
	//recuperer les données
	const {
		body: { nom, prenom, email, password },
	} = req;

	let existingUser;
	let user;
	let token;
	try {
		//expres validateur
		const errorsObj = validationResult(req);
		if (!errorsObj.isEmpty()) {
			const errorsClient = errorsObj.errors.map((error) => {
				return { message: error.msg, field: error.param };
			});

			return res.status(422).json({ errors: errorsClient });
		}
		/**Verifier si l'utilisateur existe dans la base de données */
		existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(422).json({ message: "l'utilisateur existe deja dans la base de donnees " });
		}
		/**Inserer l'utilisateur dans la base de donnees */
		user = await User.create(req.body);

		/**la creation de jeton */
		token = jwt.sign({ userId: user.id, email: email }, process.env.PRIVATE_KEY);

		/**envoyer une reponse */
		return res.status(200).json({ message: "compte crée", token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "erreur lors de la creation de compte " });
	}
};
exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	let user, token;
	let isValid = false;
	try {
		//expres validateur
		const errorsObj = validationResult(req);
		if (!errorsObj.isEmpty()) {
			const errorsClient = errorsObj.errors.map((error) => {
				return { message: error.msg, field: error.param };
			});

			return res.status(422).json({ errors: errorsClient });
		}
		/**verifier si le compte existe bien dans la base de donnees */
		user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "compte non trouvé" });
		}
		/**verifier si le bon mot de passe */
		isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return res.status(401).json({ message: "mot de passe erroné" });
		}
		/**creer le token */
		token = jwt.sign({ userId: user.id, email: user.email }, process.env.PRIVATE_KEY, { expiresIn: "3h" });
		return res.status(200).json({ message: "Vous etes connecté", token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error });
	}
};
