module.exports = app => {
    const tipos = require("../controllers/tipoLocalidad.controller.js");
  
    // Create a new Centro
    app.post("/tipo_localidad", tipos.create);
  
    // Retrieve all Centros
    app.get("/tipo_localidad", tipos.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/tipo_localidad/:id", tipos.findOne);
  
    // Update a Customer with customerId
    app.put("/tipo_localidad/:id", tipos.update);
  
    // Delete a Customer with customerId
    app.delete("/tipo_localidad/:id", tipos.delete);
  
  };