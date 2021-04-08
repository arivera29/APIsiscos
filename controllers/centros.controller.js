const Centros = require("../models/centros.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const centro = new Centros({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        suministro: req.body.suministro,
        estado: req.body.estado,
    });

    Centros.create(centro, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.send(data);
    });

};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Centros.getAll((err, data) => {
        if (err)
            res.status(500).send(err);
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Centros.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        } else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Centros.updateById(
        req.params.id,
        new Centros(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send(err);
                } else {
                    res.status(500).send(err);
                }
            } else res.send(data);
        }
    );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Centros.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        } else res.send(data);
    });
};