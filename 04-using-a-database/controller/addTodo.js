const sqlite3 = require("sqlite3");
const getList = require("../controller/getList");

async function addTodo(listId, task) {
	const id = await getList(listId);
	console.log(id);
	console.log(task);

	// let db = new sqlite3.Database(
	// 	"../db/todos.db",
	// 	sqlite3.OPEN_READWRITE,
	// 	(err) => {
	// 		if (err) {
	// 			console.error(err.message);
	// 		}

	// 		console.log("Connected to the Todos database.");
	// 	}
	// );

	// db.run(
	// 	`INSERT INTO todos (list_id, task, complete)
	// VALUES(${id}, ${task}, FALSE)`,
	// 	[],
	// 	(error) => {
	// 		if (error) {
	// 			console.error(error);
	// 		}
	// 	}
	// );
	// db.close((err) => {
	// 	if (err) {
	// 		console.error(err.message);
	// 	}
	// });
}
addTodo("default", "This is a test");
module.exports = addTodo;
