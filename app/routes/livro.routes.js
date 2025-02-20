module.exports = app => {
    const livro = require("../controllers/livro.controller.js");
    var router = require("express").Router();
    // Create a new livro
    router.post("/", livro.create);
    // Retrieve all livro
    router.get("/", livro.findAll);
    // Retrieve a single livro with id
    router.get("/:id", livro.findOne);
    // Update a livro with id
    router.put("/:id", livro.update);
    // Delete a livro with id
    router.delete("/:id", livro.delete);
    // Delete all livro
    router.delete("/", livro.deleteAll);
    app.use('/api/livro', router);
   };