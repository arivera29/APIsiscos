const sql = require('./db.js');


// constructor

const Estados = function (estado) {

    this.codigo = estado.codigo;
    this.nombre = estado.nombre;
    this.devolucion = estado.devolucion;
    this.entrega = estado.entrega;
};


Estados.create = (estado, result) => {
    sql.query("INSERT INTO estamate (estacodi,estadesc,estadevo,estaentr) VALUES (?,?,?,?)",
     [estado.codigo,estado.nombre,estado.devolucion,estado.entrega], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Estado creado: ", { ...estado });
        result(null, { status : "RECORD_SAVED" });
    });
};

Estados.findById = (codigo, result) => {
    sql.query(`SELECT estacodi AS codigo,
                      estadesc AS nombre,
                      estadevo AS devolucion,
                      estaentr AS entrega 
                FROM estamate 
                WHERE estacodi = '${codigo}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Estado encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Estados.getAll = result => {
    sql.query(`SELECT estacodi AS codigo,
                      estadesc AS nombre,
                      estadevo AS devolucion,
                      estaentr AS entrega  
                FROM estamate
                ORDER BY estadesc`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Estados: ", res);
        result(null, res);
    });
};

Estados.updateById = (id, estado, result) => {
    sql.query(
      "UPDATE estamate SET estacodi = ?, estadesc = ?, estadevo=?, estaentr = ? WHERE estacodi = ?",
      [estado.codigo, estado.nombre, estado.suministro, estado.estado, id],
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
  
        console.log("Estado actualizado: ", { id: id, ...centro });
        result(null, { status : "RECORD_UPDATED" });
      }
    );
  };

  Estados.remove = (id, result) => {
    sql.query("DELETE FROM estamate WHERE estacodi = ?", id, (err, res) => {
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
  
      console.log("Estado Eliminado. ID: ", id);
      result(null, {status : "RECORD_DELETED"});
    });
  };

  module.exports = Estados;