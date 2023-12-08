const getConnection = require("../config/db");

async function getTodos(req, res) {
	return await getConnection().then(async (db) => {
		db.all("SELECT * FROM todos").catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}
async function getTodoById(req, res, id) {
	return await getConnection().then(async (db) => {
		db.get("SELECT * FROM todos WHERE id = ?", [id]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}
async function createTodo(
	req,
	res,
	id,
	name,
	description,
	dueDate,
	completed,
	listId
) {
	return await getConnection().then(async (db) => {
		db.run(
			"INSERT INTO todos (id, name, description, due_date, completed, list_id) VALUES (?, ?, ?, ?, ?, ?)",
			[id, name, description, dueDate, completed, listId]
		).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}
async function deleteTodoById(req, res, id) {
	return await getConnection().then(async (db) => {
		db.run("DELETE FROM todos WHERE id = ?", [id]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}

module.exports = { getTodos, getTodoById, createTodo, deleteTodoById };
