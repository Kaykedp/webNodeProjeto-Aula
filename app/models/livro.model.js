const pool = require("./db.js");
// constructor
const Livro = function (livro) {
 this.idlivro = livro.idlivro;
 this.nome = livro.nome;
};
Livro.create = (newlivro, result) => {
 pool.query("INSERT INTO tutorials SET ?", newlivro, (err, res) =>
{
 if (err) {
 console.log("error: ", err);
 result(err, null);
 return;
 }
 console.log("created livro: ", { id: res.insertId, ...newlivro
});
 result(null, { id: res.insertId, ...newlivro });
 });
};
livro.findById = (id, result) => {
 console.log('findById id = ', id)
 pool.query('SELECT * FROM livro WHERE idlivro = $1', [id], (err,
res) => {
 if (err) {
 //throw error
 console.log("error: ", err);
 result(err, null);
 return;
 }
 if (res.rows.length) {
 console.log("livro encontrado: ", res.rows[0]);
 result(null, res.rows[0]);
 return;
 }
 // not found livro with the id
 console.log("livro nao encontrado: res.length = ", res);
 result({ kind: "not_found" }, null);
 });
};
livro.getAll = (nome, result) => {
 let query = "SELECT * FROM livro";
 if (nome) {
 query += " WHERE nome LIKE '%${nome}%'";
 }
 pool.query(query, (err, res) => {
 if (err) {
 console.log("error: ", err);
 result(null, err);
 return;
 }
 console.log("livros: ", res.rows);
 result(null, res);
 });
};
livro.updateById = (id, livro, result) => {
 pool.query("UPDATE livro SET nome = $1 WHERE idlivro = $2",
[livro.nome, id], (err, res) => {
 if (err) {
 console.log("error: ", err);
 result(null, err);
 return;
 }
 if (res.affectedRows == 0) {
 // not found livro with the id
 result({ kind: "not_found" }, null);
 return;
 }
 console.log("updated livro: ", { id: id, ...tutorial });
 result(null, { id: id, ...tutorial });
 }
 );
};
livro.remove = (id, result) => {
 pool.query("DELETE FROM livro WHERE idlivro = ?", id, (err, res) => {
 if (err) {
 console.log("error: ", err);
 result(null, err);
 return;
 }
 if (res.affectedRows == 0) {
 // not found livro with the id
 result({ kind: "not_found" }, null);
 return;
 }
 console.log("deleted livro with idlivro: ", id);
 result(null, res);
 });
};
livro.removeAll = result => {
 pool.query("DELETE FROM livro", (err, res) => {
 if (err) {
 console.log("error: ", err);
 result(null, err);
 return;
 }
 console.log(`deleted ${res.affectedRows} livros`);
 result(null, res);
 });
};
module.exports = livro;