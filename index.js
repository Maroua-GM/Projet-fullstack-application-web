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
	})
	.catch((error) => {
		console.log(error);
		console.log("connexion à la base de données a échoué");
	});

app.use("/api/user", require("./Routes/User-Routes"));

const PORT = 5000;
app.listen(PORT, () => console.log("Serveur écoute sur le port 5000"));
