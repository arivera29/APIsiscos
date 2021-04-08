module.exports = app => {
    const departamentos = require("../controllers/departamentos.controller.js");
  
    // Create a new Centro
    app.post("/departamentos", departamentos.create);
  
    // Retrieve all Centros
    app.get("/departamentos", departamentos.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/departamentos/:id", departamentos.findOne);
  
    // Update a Customer with customerId
    app.put("/departamentos/:id", departamentos.update);
  
    // Delete a Customer with customerId
    app.delete("/departamentos/:id", departamentos.delete);
  
  };