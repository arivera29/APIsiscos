const Tipos = require("../models/tipoLocalidad.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const tipo = new Tipos({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        estado: req.body.estado,
    });

    Tipos.create(centro, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.send(data);
    });

};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Tipos.getAll((err, data) => {
        if (err)
            res.status(500).send(err);
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Tipos.findById(req.params.id, (err, data) => {
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

    Tipos.updateById(
        req.params.id,
        new Tipos(req.body),
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
    Tipos.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        } else res.send(data);
    });
};