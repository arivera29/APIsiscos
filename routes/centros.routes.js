module.exports = app => {
    const centros = require("../controllers/centros.controller.js");
  
    // Create a new Centro
    app.post("/centros", centros.create);
  
    // Retrieve all Centros
    app.get("/centros", centros.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/centros/:id", centros.findOne);
  
    // Update a Customer with customerId
    app.put("/centros/:id", centros.update);
  
    // Delete a Customer with customerId
    app.delete("/centros/:id", centros.delete);
  
  };