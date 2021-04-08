const sql = require('./db.js');

const Departamentos = function(departamento) {
    this.codigo = departamento.codigo;
    this.nombre = departamento.nombre;
    this.estado = departamento.estado;
};


Departamentos.create = (dpto, result) => {
    sql.query("INSERT INTO departamento (depacodi,depadesc,depaacti) VALUES (?,?,?)",
     [dpto.codigo,dpto.nombre,dpto.estado], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Departamento creado: ", { ...dpto });
        result(null, { state: "RECORD_SAVED", message: "" });
    });
};

Departamentos.findById = (codigo, result) => {
    sql.query(`SELECT depacodi AS codigo,
                      depadesc AS nombre,
                      depaacti AS estado 
                FROM departamento 
                WHERE depacodi = '${codigo}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Departamento encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Departamentos.getAll = result => {
    sql.query(`SELECT depacodi AS codigo,
                      depadesc AS nombre,
                      depaacti AS estado 
                FROM departamento
                ORDER BY depadesc`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }

        console.log("Departamentos: ", res);
        result(null, res);
    });
};

Departamentos.updateById = (id, dpto, result) => {
    sql.query(
      "UPDATE depatamento SET depacodi = ?, depadesc = ?,  depaacti = ? WHERE depacodi = ?",
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
  
        console.log("Departamento actualizado: ", { id: id, ...centro });
        result(null, { status  : "RECORD_UPDATED", message : "" });
      }
    );
  };

  Departamentos.remove = (id, result) => {
    sql.query("DELETE FROM departamento WHERE depacodi = ?", id, (err, res) => {
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
  
      console.log("Departamento Eliminado. ID: ", id);
      result(null, {status : "DELETED_RECORD", message : ""});
    });
  };

module.exports = Departamentos;