const sqlite3 = require("sqlite3").verbose();

async function getTodos(list = "default") {
	let db = new sqlite3.Database("../db/todos.db", sqlite3.OPEN_READONLY, (err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Connected to the Todos database.');
	});
	db.all(
		`SELECT * FROM todos JOIN lists ON lists.id = todos.list_id WHERE lists.url_id = '${list}'`, [], (err, rows) => {
			if (err) {
				throw err;
			}
			return rows

		});

	db.close((err) => {
		if (err) {
			console.error(err.message);
		}

	});
}

module.exports = getTodos;
