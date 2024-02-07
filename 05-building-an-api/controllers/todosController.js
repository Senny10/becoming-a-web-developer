const getConnection = require("../config/db");


function getTodoByList(req, res) {
	console.log(req.params);
	getConnection().then((db) => {
		db.get("SELECT * FROM todos WHERE user_id = ? AND url_id = ?", [
			userId,
			url_id,
		])
			.then((row, err) => {
				res.json({ row });
				if (err) {
					console.log(err);
					return res.status(500).json({ error: err });
				}
				if (row) {
					return res.status(200).json({ message: "Todos found" });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(404).json({ message: "Todos not found." });
			});
	});
}

function getTodoByUserId(req, res) {
	const { userId, url_id } = req.body;
	getConnection().then((db) => {
		db.get("SELECT * FROM todos WHERE user_id = ? AND url_id = ?", [
			userId,
			url_id,
		])
			.then((row, err) => {
				res.json({ row });
				if (err) {
					console.log(err);
					return res.status(500).json({ error: err });
				}
				if (row) {
					return res.status(200).json({ message: "Todos found" });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(404).json({ message: "Todos not found." });
			});
	});
}

function createTodo() {
	const { userId, url_id, task, completed } = req.body;
	getConnection().then((db) => {
		db.run(
			"INSERT INTO todos (user_id, url_id, task, completed) VALUES (?, ?, ?, ?)",
			[userId, url_id, task, completed]
		)
			.then((row, err) => {
				res.json({ row });
				if (err) {
					console.log(err);
					return res.status(500).json({ error: err });
				}
				if (row) {
					return res.status(200).json({ message: "Todos created" });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(404).json({ message: "Something went wrong." });
			});
	});
}

function updateTodoById(req, res) {
	const { task, completed } = req.body;
	getConnection().then((db) => {
		db.run("UPDATE todos SET task = ?, completed = ? WHERE id = ?", [
			task,
			completed,
			id,
		])
			.then((row, err) => {
				res.json({ row });
				if (err) {
					console.log(err);
					return res.status(500).json({ error: err });
				}
				if (row) {
					return res.status(200).json({ message: "Todos updated" });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(404).json({ message: "Something went wrong." });
			});
	});
}

function deleteTodoById(req, res) {
	const { id } = req.body;
	getConnection().then((db) => {
		db.run("DELETE FROM todos WHERE id = ?", [id])
			.then((row, err) => {
				res.json({ row });
				if (err) {
					console.log(err);
					return res.status(500).json({ error: err });
				}
				if (row) {
					return res.status(200).json({ message: "Todos deleted" });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(404).json({ message: "Something went wrong." });
			});
	});
}

module.exports = {
	getTodoByList,
	getTodoByUserId,
	createTodo,
	updateTodoById,
	deleteTodoById,
};
