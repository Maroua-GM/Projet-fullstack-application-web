const jwt = require("jsonwebtoken");
const User = require("../Moduls/User");
const { validationResult } = require("express-validator");

const signup = async (req, res, next) => {
	//expres validateur
	const errorsObj = validationResult(req);
	if (!errorsObj.isEmpty()) {
		const errorsClient = errorsObj.errors.map((error) => {
			return { message: error.msg, field: error.param };
		});

		return res.status(422).json({ message: "donnees invalides", errors: errorsClient });
	}

	//recuperer les données

	const {
		body: { nom, prenom, email, password },
	} = req;
	/**Verifier si l'utilisateur existe dans la base de données */
	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
		if (existingUser) {
			return res.status(422).json({ message: "l'utilisateur existe deja dans la base de donnees " });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "erreur lors de la creation de compte " });
	}

	/**Inserer l'utilisateur dans la base de donnees */
	const user = new User({ nom: nom, prenom: prenom, email: email, password: password });
	try {
		await user.save();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "erreur lors de la creation de compte " });
	}

	/**la creation de jeton */
	let token;
	try {
		token = jwt.sign({ userId: user.id, email: email }, "le_secret_de_wiskas");
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "erreur lors de la creation de jeton " });
	}

	/**envoyer une reponse */
	return res.status(200).json({ message: "compte crée", token: token });
};

exports.signup = signup;
