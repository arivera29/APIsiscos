const sql = require('./db.js');


// constructor

const Centros = function (centro) {

    this.codigo = centro.codigo;
    this.nombre = centro.nombre;
    this.suministro = centro.suministro;
    this.estado = centro.estado;
};


Centros.create = (newCentro, result) => {
    sql.query("INSERT INTO centros (centcodi,centdesc,centprov,centesta) VALUES (?,?,?,?)",
     [newCentro.codigo,newCentro.nombre,newCentro.suministro,newCentro.estado], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Centro creado: ", { ...newCentro });
        result(null, { status : "RECORD_SAVED" });
    });
};

Centros.findById = (codigo, result) => {
    sql.query(`SELECT centcodi AS codigo,
                      centdesc AS nombre,
                      centprov AS suministro,
                      centesta AS estado 
                FROM centros 
                WHERE centcodi = '${codigo}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Centro encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Centros.getAll = result => {
    sql.query(`SELECT centcodi AS codigo,
                      centdesc AS nombre,
                      centprov AS suministro,
                      centesta AS estado 
                FROM centros
                ORDER BY centdesc`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Centros: ", res);
        result(null, res);
    });
};

Centros.updateById = (id, centro, result) => {
    sql.query(
      "UPDATE centros SET centcodi = ?, centdesc = ?, centrprov=?, centesta = ? WHERE centcodi = ?",
      [centro.codigo, centro.nombre, centro.suministro, centro.estado, id],
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
  
        console.log("Centro actualizado: ", { id: id, ...centro });
        result(null, { status : "RECORD_UPDATED" });
      }
    );
  };

  Centros.remove = (id, result) => {
    sql.query("DELETE FROM centros WHERE centcodi = ?", id, (err, res) => {
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
  
      console.log("Centro Eliminado. ID: ", id);
      result(null, {status : "RECORD_DELETED"});
    });
  };

  module.exports = Centros;