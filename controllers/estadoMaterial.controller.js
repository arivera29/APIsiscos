const Estados = require("../models/estadoMaterial.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const estado = new Estados({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        devolucion: req.body.devolucion,
        entrega: req.body.entrega,
    });

    Estados.create(estado, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.send(data);
    });

};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Estados.getAll((err, data) => {
        if (err)
            res.status(500).send(err);
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Estados.findById(req.params.id, (err, data) => {
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

    Estados.updateById(
        req.params.id,
        new Estados(req.body),
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
    Estados.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        } else res.send(data);
    });
};