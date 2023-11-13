const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const getList = require("../controller/getList")

let db;
(async () => {
	db = await open({
		filename: "../db/todos.db",
		driver: sqlite3.Database,
	});
})();

async function addTodo(listId, task) {
	const id = await getList(listId);
	console.log(id);
	return db.run(`INSERT INTO todos (list_id, task, complete)
	VALUES(${id}, ${task}, FALSE)`);
}
addTodo("default", "This is a test")
module.exports = addTodo;
