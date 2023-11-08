const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

let db = new sqlite3.Database("./todos.db", (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log("Connected to the SQlite database.");
});

async function getTodosFromDB(list) {
	const sql = `SELECT task FROM todos JOIN lists ON lists.id = todos.list_id WHERE lists.url_id = ?`;

	await db.all(sql, list, (err, rows) => {
		let tasks = [];
		if (err) {
			throw err;
		}
		rows.forEach((row) => tasks.push(row.task));
		return tasks;
	});
}
async function addTodoFromDB(task) {}

async function updateTodoFromDB(todo) {}

async function deleteTodoFromDB(id) {}

async function getListsFromDB() {
	const sql = "SELECT name FROM lists;";
	await db.all(sql, (err, rows) => {
		let lists = [];
		if (err) {
			throw err;
		}
		rows.forEach((row) => lists.push(row.name));
		return lists;
	});
}

async function getListFromDB() {}

async function addListFromDB(list) {}

async function updateListFromDB(list) {}

async function deleteListFromDB(id) {}

module.exports = {
	getTodosFromDB,
	addTodoFromDB,
	updateTodoFromDB,
	deleteTodoFromDB,
	getListsFromDB,
	getListFromDB,
	addListFromDB,
	updateListFromDB,
	deleteListFromDB,
};
