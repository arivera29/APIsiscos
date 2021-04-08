const Departamentos = require("../models/departamentos.model.js");

// Create and Save a new Departamento

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const dpto = new Departamentos({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        suministro: req.body.suministro,
        estado: req.body.estado
    });

    Departamentos.create(dpto, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.send(data);
    });

};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Departamentos.getAll((err, data) => {
        if (err)
            res.status(500).send(err);
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Departamentos.findById(req.params.id, (err, data) => {
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

    Departamentos.updateById(
        req.params.id,
        new Departamentos(req.body),
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
    Departamentos.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        } else res.send(data);
    });
};

