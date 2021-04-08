const Personal = require("../models/personal.model.js");

// Create and Save a new Departamento

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const personal = new Personal({
        codigo : req.body.codigo,
        nombres : req.body.nombres,
        apellidos : req.body.apellidos,
        direccion : req.body.direccion,
        correo : req.body.correo,
        telefono1 : req.body.telefono1,
        telefono2 : req.body.telefono2,
        movil : req.body.movil,
        departamento : req.body.departamento,
        cargo : req.body.cargo,
        nivelEstudio : req.body.nivelEstudio,
        estado : req.body.estado,
        foto : req.body.foto,
        tipoContrato : req.body.tipoContrato,
        tipoSangre : req.body.tipoSangre
    });

    Personal.create(personal, (err, data) => {
        if (err)
            res.status(500).send(err);
        else res.send(data);
    });

};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Personal.getAll((err, data) => {
        if (err)
            res.status(500).send(err);
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Personal.findById(req.params.id, (err, data) => {
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

    Personal.updateById(
        req.params.id,
        new Perosnal(req.body),
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
    Personal.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        } else res.send(data);
    });
};

exports.updatePhoto = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Personal.updatePhoto(req.body.id, req.body.photo, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        } else res.send(data);
    });
};

exports.updateFingerprint = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Personal.updateFingerprint(req.body.id, req.body.fingerprint, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        } else res.send(data);
    });
};

exports.getPhoto = (req, res) => {
    Personal.getPhoto(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        } else res.send(data);
    });
};

exports.getFingerprint = (req, res) => {
    Personal.getFingerprint(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        } else res.send(data);
    });
};
