const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;
(async () => {
	db = await open({
		filename: "../db/todos.db",
		driver: sqlite3.Database,
	});
})();

async function getList(listId) {
	return await db.get(`SELECT id FROM lists WHERE url_id = ${listId}`);
}

module.exports = getList;
