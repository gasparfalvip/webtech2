const express = require('express');
const app = express();
const procedureRoute = express.Router();

// Procedure model
let Models = require('../Models');
let Procedure = Models.procedure;

// Add Procedure
procedureRoute.route('/addPR').post((req, res, next) => {
    Procedure.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data)
        }
    });
});

// Get All Procedure
procedureRoute.route('/getallPR').get((req, res) => {
    Procedure.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get single Procedure
procedureRoute.route('/getPR/:id').get((req, res) => {
    Procedure.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get procedure by query
procedureRoute.route('/getPR/:name').get((req, res) => {
    Procedure.find(req.params, req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})



// Update Procedure
procedureRoute.route('/updatePR/:id').put((req, res, next) => {
    Procedure.findByIdAndUpdate(req.params.id, {
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

// Delete Procedure
procedureRoute.route('/deletePR/:id').delete((req, res, next) => {
    Procedure.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = procedureRoute;