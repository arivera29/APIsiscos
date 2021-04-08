const sql = require('./db.js');

const Personal = function (personal) {
    this.codigo = personal.codigo;
    this.nombres = personal.nombres;
    this.apellidos = personal.apellidos;
    this.direccion = personal.direccion;
    this.correo = personal.correo;
    this.telefono1 = personal.telefono1;
    this.telefono2 = personal.telefono2;
    this.movil = personal.movil;
    this.departamento = personal.departamento;
    this.cargo = personal.cargo;
    this.nivelEstudio = personal.nivelEstudio;
    this.estado = personal.estado;
    this.foto = personal.foto;
    this.tipoContrato = personal.tipoContrato;
    this.tipoSangre = personal.tipoSangre;
    this.huella = personal.huella;
};

Personal.create = (personal, result) => {
    sql.query("INSERT INTO personal (perscodi,persnomb,persapel,persdire,persmail,perstel1,perstel2,persmovi,persdepa,perscarg,persmati,persesta,persfoto,perstico,persfarh) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [personal.codigo, personal.nombre, personal.apellidos, personal.direccion, personal.correo, personal.telefono1, personal.telefono2, personal.movil, personal.departamento, personal.cargo, personal.nivelEstudio, personal.estado, personal.foto, personal.tipoContrato, personal.tipoSangre], (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            console.log("Personal creado: ", { ...personal });
            result(null, { state: "RECORD_SAVED", message: "" });
        });
};

Personal.findById = (codigo, result) => {
    sql.query(`SELECT perscodi AS codigo,
                persnomb AS nombres,
                persapel AS apellidos,
                persdire AS direccion,
                persmail AS correo,
                perstel1 AS telefono1,
                perstel2 AS telefono2,
                persmovi AS movil,
                persdepa AS departamento,
                perscarg AS cargo,
                persmati AS nivelEstudio,
                persesta AS estado,
                persfoto AS foto,
                perstico AS tipoContrato,
                persfarh AS tipoSangre,
                persfing AS huella 
                FROM personal 
                WHERE perscodi = '${codigo}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Persoanl encontrado: ", res[0]);
            if (res[0].foto != null) {
                var bufferBase64 = new Buffer.from( res[0].foto, "binary" ).toString("base64");
                res[0].foto = bufferBase64;
            }
            
            if (res[0].huella != null) {
                var bufferBase64 = new Buffer.from( res[0].huella, "binary" ).toString("base64");
                res[0].huella = bufferBase64;
            }


            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Personal.getAll = result => {
    sql.query(`SELECT perscodi AS codigo,
                persnomb AS nombres,
                persapel AS apellidos,
                persdire AS direccion,
                persmail AS correo,
                perstel1 AS telefono1,
                perstel2 AS telefono2,
                persmovi AS movil,
                persdepa AS departamento,
                perscarg AS cargo,
                persmati AS nivelEstudio,
                persesta AS estado,
                persfoto AS foto,
                perstico AS tipoContrato,
                persfarh AS tipoSangre 
                FROM personal 
                ORDER BY persapel,persnomb`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Personal: ", res);
        result(null, res);
    });
};

Personal.updateById = (id, personal, result) => {
    sql.query("UPDATE personal SET perscodi=?,persnomb=?,persapel=?,persdire=?,persmail=?,perstel1=?,perstel2=?,persmovi=?,persdepa=?,perscarg=?,persmati=?,persesta=?,persfoto=?,perstico=?,persfarh=? WHERE perscodi=?",
        [personal.codigo, personal.nombre, personal.apellidos, personal.direccion, personal.correo, personal.telefono1, personal.telefono2, personal.movil, personal.departamento, personal.cargo, personal.nivelEstudio, personal.estado, personal.foto, personal.tipoContrato, personal.tipoSangre, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Personal actualizado: ", { id: id, ...personal });
            result(null, { status: "RECORD_UPDATED", message: "" });
        }
    );
};

Personal.remove = (id, result) => {
    sql.query("DELETE FROM personal WHERE perscodi = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Personal Eliminado. ID: ", id);
        result(null, { status: "DELETED_RECORD", message: "" });
    });
};

Personal.updateFingerprint = (id,huella,result) => {
    let buff = new Buffer.from(huella, 'base64');

    sql.query("UPDATE personal SET persfing = ? WHERE perscodi = ?", [buff,id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Huella actualizada ID: ", id);
        result(null, { status: "UPDATE_RECORD", message: "" });
    });

};

Personal.updatePhoto = (id,foto,result) => {
    let buff = new Buffer.from(foto, 'base64');
    sql.query("UPDATE personal SET persfoto = ? WHERE perscodi = ?", [buff,id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Foto actualizada ID: ", id);
        result(null, { status: "UPDATE_RECORD", message: "" });
    });

};

Personal.getPhoto = (codigo, result) => {
    sql.query(`SELECT persfoto AS foto 
                FROM personal 
                WHERE perscodi = '${codigo}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Persoanl encontrado: ", res[0]);
            if (res[0].foto != null) {
                var bufferBase64 = new Buffer.from( res[0].foto, "binary" ).toString("base64");
                res[0].foto = bufferBase64;
            }
            

            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};


Personal.getFingerprint = (codigo, result) => {
    sql.query(`SELECT persfing AS huella 
                FROM personal 
                WHERE perscodi = '${codigo}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Persoanl encontrado: ", res[0]);
            
            if (res[0].huella != null) {
                var bufferBase64 = new Buffer.from( res[0].huella, "binary" ).toString("base64");
                res[0].huella = bufferBase64;
            }


            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};


module.exports = Personal;