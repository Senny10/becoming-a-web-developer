const sqlite3 = require("sqlite3").verbose();

async function getLists() {
	let db = new sqlite3.Database(
		"../db/todos.db",
		sqlite3.OPEN_READONLY,
		(err) => {
			if (err) {
				console.error(err.message);
			}
			console.log("Connected to the Todos database.");
		}
	);
	db.all("SELECT url_id as id, name FROM lists", [], (err, rows) => {
		if (err) {
			throw err;
		}
		return rows;
	});
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
	});
}
module.exports = getLists;
