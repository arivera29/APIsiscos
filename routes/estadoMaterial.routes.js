module.exports = app => {
    const estados = require("../controllers/estadoMaterial.controller.js");
  
    // Create a new Centro
    app.post("/estados_material", estados.create);
  
    // Retrieve all Centros
    app.get("/estados_material", estados.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/estados_material/:id", estados.findOne);
  
    // Update a Customer with customerId
    app.put("/estados_material/:id", estados.update);
  
    // Delete a Customer with customerId
    app.delete("/estados_material/:id", estados.delete);
  
  };