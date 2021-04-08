const sql = require('./db.js');

const TipoLocalidad = function(tipo) {
    this.codigo = tipo.codigo;
    this.nombre = tipo.nombre;
    this.estado = tipo.estado;
};


TipoLocalidad.create = (dpto, result) => {
    sql.query("INSERT INTO tipoloca (tilocodi,tilodesc,tiloaacti) VALUES (?,?,?)",
     [tipo.codigo,tipo.nombre,tipo.estado], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Tipo de localidad creado: ", { ...dpto });
        result(null, { state: "RECORD_SAVED", message: "" });
    });
};

TipoLocalidad.findById = (codigo, result) => {
    sql.query(`SELECT tilocodi AS codigo,
                      tilodesc AS nombre,
                      tiloacti AS estado 
                FROM tipoloca 
                WHERE tipocodi = '${codigo}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Tipo localidad encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

TipoLocalidad.getAll = result => {
    sql.query(`SELECT tilocodi AS codigo,
                      tilodesc AS nombre,
                      tiloacti AS estado 
                FROM tipoloca
                ORDER BY tilodesc`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }

        console.log("Tipos localidad: ", res);
        result(null, res);
    });
};

TipoLocalidad.updateById = (id, dpto, result) => {
    sql.query(
      "UPDATE tipoloca SET tilocodi = ?, tilodesc = ?,  tiloacti = ? WHERE tilocodi = ?",
      [dpto.codigo, dpto.nombre, dpto.estado, id],
      (err, res) => {
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
  
        console.log("Tipo de localidad actualizado: ", { id: id, ...centro });
        result(null, { status  : "RECORD_UPDATED", message : "" });
      }
    );
  };

  TipoLocalidad.remove = (id, result) => {
    sql.query("DELETE FROM tipoloca WHERE tilocodi = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({kind: "not_found" }, null);
        return;
      }
  
      console.log("Tipo de localidad Eliminado. ID: ", id);
      result(null, {status : "DELETED_RECORD", message : ""});
    });
  };

module.exports = TipoLocalidad;