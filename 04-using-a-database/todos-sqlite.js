const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let _db;
async function getConnection() {
	if (_db != null) return _db;

	try {
		_db = await open({
			filename: "./todos.db",
			driver: sqlite3.Database,
		});
	} catch (e) {
		console.log("Database is not connected");
	}

	return _db;
}

async function getTodos(list = "default") {
	const db = await getConnection();
	return await db.all(
		`SELECT * FROM todos JOIN lists ON lists.id = todos.list_id WHERE lists.url_id = ${list};`
	);
}

async function getLists() {
	const db = await getConnection();
	return await db.all(`SELECT url_id as id, name FROM lists;`);
}

async function getList(listId) {
	const db = await getConnection();
	return db.get(`SELECT id FROM lists WHERE url_id = ${listId}`);
}
console.log(getList("default"));
async function addTodo(task) {
	const db = await getConnection();
}

async function addList(list) {
	const db = await getConnection();
}

async function updateTodo(task) {
	const db = await getConnection();
}

async function updateList(list) {
	const db = await getConnection();
}

async function deleteTodo(id) {
	const db = await getConnection();
}

async function deleteList(id) {
	const db = await getConnection();
}

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
