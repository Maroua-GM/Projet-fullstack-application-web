const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	prix: { type: String, required: true },
	description: { type: String },
	qteDipso: { type: Number, required: true },
	categorie: { type: String, required: true },
	user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Annonce = mongoose.model("Annance", annonceSchema);

module.exports = Annonce;
