const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
	{
		username: String,
		password: String,
	},
	{
		collection: "users",
	}
);

let rentableSchema = new Schema(
	{
		title: String,
		dateofAcquisition: Date,
		serNum: {
			type: Number,
		},
		state: {
			type: String,
			enum: ["AVAILABLE", "RENTED", "RUINED"],
			default: "AVAILABLE",
		},
		type: {
			type: String,
			enum: ["BOOK","DVD", "CASSETTE", "OTHER"],
			default: "BOOK",
		},
	},
	{
		collection: "rentables",
	}
);

let rentSchema = new Schema(
	{
		dateofRent: Date,
		expiry: Date,
		Rented: [],
	},
	{
		collection: "rents",
	}
);

let clientSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phoneNum: {
			type: Number,
		},
		IDnum: {
			type: Number,
			unique: true,
			required: true,
		},
		address: {
			city: String,
			street: String,
			house: Number,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		Rents: [],
	},
	{
		collection: "clients",
	}
);

module.exports = {
	user: mongoose.model("User", userSchema),
	rentable: mongoose.model("Rentable", rentableSchema),
	rent: mongoose.model("Rent", rentSchema),
	client: mongoose.model("Client", clientSchema)
};
