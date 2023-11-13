const sqlite3 = require("sqlite3").verbose();

async function getList(listId) {
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
	db.get("SELECT id FROM lists WHERE url_id = ?", [listId], (err, rows) => {
		if (err) {
			throw err;
		}
		console.log(rows.id);
	});
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
	});
}
getList("default");
module.exports = getList;
