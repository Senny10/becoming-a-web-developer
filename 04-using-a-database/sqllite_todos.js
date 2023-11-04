const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database("./todos.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log("Connected to the Todos database.");
});

async function getTodosFromDB(list) {
	let tasks = [];
	db.all(
		`SELECT task FROM todos JOIN lists ON lists.id = todos.list_id WHERE lists.url_id = ?`,
		[list],
		(err, rows) => {
			if (err) {
				console.error(err.message);
			}

			rows.forEach((row) => {
				tasks.push(row.task);
			});
		}
	);
	console.log(tasks);
	return tasks;
}
getTodosFromDB();
async function addTodoFromDB(task) {}

async function updateTodoFromDB(todo) {}

async function deleteTodoFromDB(id) {}

async function getListsFromDB() {
	return null;
}

async function getListFromDB() {}

async function addListToDB(list) {}

async function updateListFromDB(list) {}

async function deleteListFromDB(id) {}

db.close((err) => {
	if (err) {
		console.error(err.message);
	}
	console.log("Close the database connection.");
});
module.exports = {
	getTodosFromDB,
	addTodoFromDB,
	updateTodoFromDB,
	deleteTodoFromDB,
	getListsFromDB,
	getListFromDB,
	addListToDB,
	updateListFromDB,
	deleteListFromDB,
};
