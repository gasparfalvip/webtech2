const express = require('express');
const app = express();
const patientRoute = express.Router();

// Patient model
let Models = require('../Models');
let Patient = Models.patient;

// Add Patient
patientRoute.route('/addP').post((req, res, next) => {
    Patient.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data)
        }
    });
});

// Get All Patient
patientRoute.route('/getallP').get((req, res) => {
    Patient.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get single Patient
patientRoute.route('/getP:id').get((req, res) => {
    Patient.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Patient
patientRoute.route('/updateP/:id').put((req, res, next) => {
    Patient.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
})


// Delete Patient (Only for testing! Actual deletion only results in state change)
patientRoute.route('/deleteP/:id').delete((req, res, next) => {
    Patient.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = patientRoute;
