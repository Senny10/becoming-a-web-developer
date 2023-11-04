const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database("./todos.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log("Connected to the Todos database.");
});

function getTodos(list = "default") {
	return db.all(
		`SELECT * FROM todos JOIN lists ON lists.id = todos.list_id WHERE lists.name = ?`,
		[list],
		(err, rows) => {
			if (err) {
				console.error(err.message);
			}
			rows.forEach((row) => {
				console.log(row.task);
			});
		}
	);
}
getTodos();
async function addTodo(task) {}

async function updateTodo(todo) {}

async function deleteTodo(id) {}

async function getLists() {}

async function getList() {}

async function addList(list) {}

async function updateList(list) {}

async function deleteList(id) {}
db.close((err) => {
	if (err) {
		console.error(err.message);
	}
	console.log("Close the database connection.");
});
module.exports = {
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
	getLists,
	getList,
	addList,
	updateList,
	deleteList,
};
