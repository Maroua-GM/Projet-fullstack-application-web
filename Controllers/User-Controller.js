const jwt = require("jsonwebtoken");
const User = require("../Moduls/User");
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
		token = jwt.sign({ userId: user.id, email: email }, "le_secret_de_wiskas");

		/**envoyer une reponse */
		return res.status(200).json({ message: "compte crée", token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "erreur lors de la creation de compte " });
	}
};
