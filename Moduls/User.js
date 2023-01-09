const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	prenom: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 4 },
});
//cette partie va etre executer avec de sauvgarder un utilisateur
UserSchema.pre("save", function () {
	if (this.isModified("password")) {
		this.password = bcrypt.hashSync(this.password, 10);
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
