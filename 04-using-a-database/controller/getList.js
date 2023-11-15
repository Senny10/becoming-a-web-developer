const sqlite3 = require("sqlite3").verbose();

async function getList(listId) {
	let db = new sqlite3.Database(
		"/Users/senaka.saunders/Documents/00_Academy/becoming-a-web-developer/04-using-a-database/controller/todos.db",
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
		return rows.id;
	});
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
	});
}
getList("default");
module.exports = getList;
