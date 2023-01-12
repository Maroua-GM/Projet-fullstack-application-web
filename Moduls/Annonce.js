const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	prix: { type: String, required: true },
	description: { type: String },
	qteDispo: { type: Number, required: true },
	categorie: { type: String, required: true },
	image_url: { type: String },
	user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;
