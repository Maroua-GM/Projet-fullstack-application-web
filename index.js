const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const URL = require("./database.js");

const app = express();

app.use(bodyParser.json());

mongoose
	.connect(URL)
	.then(() => {
		console.log("connexion à la base établie");
		app.listen(5000, () => console.log("Serveur écoute sur le port 5000"));
	})
	.catch((error) => {
		console.log(error);
		console.log("connexion à la base de données a échoué");
	});
