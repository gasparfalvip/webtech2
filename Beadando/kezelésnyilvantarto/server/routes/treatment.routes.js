const express = require("express");
const app = express();
const rentRoute = express.Router();

// Treatment model
let Models = require("../Models");
let Treatment = Models.treatment;

// Add Treatment
rentRoute.route("/addT").post((req, res, next) => {
	Treatment.create(req.body, (error, data) => {
		if (error) {
			console.log(error);
		} else {
			res.json(data);
		}
	});
});

// Get All Treatment
rentRoute.route("/getallT").get((req, res) => {
	Treatment.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// Get single Treatment
rentRoute.route("/getT/:id").get((req, res) => {
	Treatment.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// Update Treatment
rentRoute.route("/updateT/:id").put((req, res, next) => {
	Treatment.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body,
		},
		(error, data) => {
			if (error) {
				return next(error);
				console.log(error);
			} else {
				res.json(data);
				console.log("Data updated successfully");
			}
		}
	);
});

// Delete Treatment
rentRoute.route("/deleteT/:id").delete((req, res, next) => {
	Treatment.findOneAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data,
			});
		}
	});
});


module.exports = rentRoute;
