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

let procedureSchema = new Schema(
	{
		name: String,
		serNum: {
			type: Number,
		},
		state: {
			type: String,
			enum: ["AVAILABLE", "OCCUPIED", "OUTDATED"],
			default: "AVAILABLE",
		},
		type: {
			type: String,
			enum: ["SURGERY","CHEMOTHERAPY", "RADIATION THERAPY", "OTHER"],
			default: "SUREGERY",
		},
	},
	{
		collection: "procedures",
	}
);

let treatmentSchema = new Schema(
	{
		startdate: Date,
		enddate: Date,
		Procedures: [],
	},
	{
		collection: "treatments",
	}
);

let patientSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phoneNum: {
			type: Number,
		},
		TAJnum: {
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
		Treatments: [],
	},
	{
		collection: "patients",
	}
);

module.exports = {
	user: mongoose.model("User", userSchema),
	procedure: mongoose.model("Procedure", procedureSchema),
	treatment: mongoose.model("Treatement", treatmentSchema),
	patient: mongoose.model("Patient", patientSchema)
};
