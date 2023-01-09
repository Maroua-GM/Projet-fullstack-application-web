const mongoose = require("mongoose");

const produitAnnance = mongoose.Schema({
	qteAchat: { type: Number, required: true },
});
