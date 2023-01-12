require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
	.connect(process.env.URL)
	.then(() => {
		console.log("connexion à la base établie");
	})
	.catch((error) => {
		console.log(error);
		console.log("connexion à la base de données a échoué");
	});

app.use("/api/user", require("./Routes/User-Routes"));
app.use("/api/annonce", require("./Routes/Annonce-Routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Serveur écoute sur le port 5000"));
