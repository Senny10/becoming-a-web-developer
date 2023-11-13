const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;
(async () => {
	db = await open({
		filename: "./todos.db",
		driver: sqlite3.Database,
	});
})();

async function deleteTodo(id) {}

module.exports = deleteTodo;
