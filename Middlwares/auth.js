require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
	let token;
	try {
		/**recuperer le jeton de headers */
		token = req.headers.authorization.split(" ")[1];
		if (!token) {
			res.status(422).json("authentification a échoué");
		}
		/**verifier le jeton envoyé par le client avec la clé secret  */
		const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);

		req.userData = { id: decodedToken.userId, email: decodedToken.email };
		next();
	} catch (error) {
		console.log(error);
		return res.status(422).json({ message: "erreur de token et d'authentification" });
	}
};
