const livro = require("../models/livro.model.js");
// Create and Save a new livro
exports.create = (req, res) => {
 // Validate request
 if (!req.body) {
 res.status(400).send({
 message: "Content can not be empty!"
 });
 }
 // Create a livro
 const livro = new livro({
 nome: req.body.nome || false
 });
 // Save livro in the database
 livro.create(livro, (err, data) => {
 if (err)
 res.status(500).send({
 message:
 err.message || "Some error occurred while creating the livro."
 });
 else res.send(data);
 });
};
// Retrieve all livros from the database (with condition).
exports.findAll = (req, res) => {
 const nome = req.query.nome;
 livro.getAll(nome, (err, data) => {
 if (err)
 res.status(500).send({
 message:
 err.message || "Some error occurred while retrieving livros."
 });
 else res.send(data);
 });
};
// Find a single livro by Id
exports.findOne = (req, res) => {
 livro.findById(req.params.id, (err, data) => {
 if (err) {
 if (err.kind === "not_found") {
 res.status(404).send({
 message: "livro nao encontrado com id${req.params.id}."
 });
 } else {
 res.status(500).send({
 message: "Erro buscando livro com id " +
req.params.id
 });
 }
 } else
 res.send(data);
 });
};
// Update a livro identified by the id in the request
exports.update = (req, res) => {
 // Validate Request
 if (!req.body) {
 res.status(400).send({
 message: "Content can not be empty!"
 });
 }
 console.log(req.body);
 livro.updateById(
 req.params.id,
 new livro(req.body),
 (err, data) => {
 if (err) {
 if (err.kind === "not_found") {
 res.status(404).send({
 message: `Not found livro with id
${req.params.id}.`
 });
 } else {
 res.status(500).send({
 message: "Error updating livro with id " +
req.params.id
 });
 }
 } else res.send(data);
 }
 );
};
// Delete a livro with the specified id in the request
exports.delete = (req, res) => {
 livro.remove(req.params.id, (err, data) => {
 if (err) {
 if (err.kind === "not_found") {
 res.status(404).send({
 message: `Not found livro with id
${req.params.id}.`
 });
 } else {
 res.status(500).send({
 message: "Could not delete livro with id " +
req.params.id
 });
 }
 } else res.send({ message: `livro was deleted successfully!`
});
 });
};
// Delete all livros from the database.
exports.deleteAll = (req, res) => {
 livro.removeAll((err, data) => {
 if (err)
 res.status(500).send({
 message:
 err.message || "Some error occurred while removing all livros."
 });
 else res.send({ message: `All livros were deleted
successfully!` });
 });
};