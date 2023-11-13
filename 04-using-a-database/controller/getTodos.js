const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;
(async () => {
	db = await open({
		filename: "../db/todos.db",
		driver: sqlite3.Database,
	});
})();

async function getTodos(list = "default") {
	return db.all(
		`SELECT * FROM todos JOIN lists ON lists.id = todos.list_id WHERE lists.url_id = '${list}'`
	);
}

module.exports = getTodos;
