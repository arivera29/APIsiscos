module.exports = app => {
    const personal = require("../controllers/personal.controller.js");
  
    // Create a new Centro
    app.post("/personal", personal.create);
  
    // Retrieve all Centros
    app.get("/personal", personal.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/personal/:id", personal.findOne);
  
    // Update a Customer with customerId
    app.put("/personal/:id", personal.update);
  
    // Delete a Customer with customerId
    app.delete("/personal/:id", personal.delete);

    app.post("/personal/update_photo", personal.updatePhoto);

    app.post("/personal/update_fingerprint", personal.updateFingerprint);

    app.get("/personal/:id/photo", personal.getPhoto);

    app.get("/personal/:id/fingerprint", personal.getFingerprint);
  
  };