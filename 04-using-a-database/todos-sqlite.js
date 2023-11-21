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
	return await getConnection()
		.then((db) =>
			db.all(
				"SELECT todos.* FROM todos JOIN lists ON lists.id = todos.list_id WHERE lists.url_id = ?",
				[list]
			)
		)
		.catch((err) => console.error(err));
}

async function getLists() {
	return await getConnection()
		.then((db) => db.all("SELECT url_id as id, name FROM lists"))
		.catch((err) => console.error(err));
}

async function getList(listId) {
	return await getConnection()
		.then((db) => db.get("SELECT id FROM lists WHERE url_id = ?", [listId]))
		.then((r) => r.id)
		.catch((err) => console.error(err));
	// const db = await getConnection();
	// return await db
	// 	.get("SELECT id FROM lists WHERE url_id = ?", [listId])
	// 	.then((r) => r.id);
}
// getList("default").then(console.log);

async function addTodo(listId, task) {
	const id = await getList(listId);
	const newTask = task.toString();
	return await getConnection()
		.then((db) =>
			db.run(
				"INSERT INTO todos (list_id, task, complete) VALUES (?, ?, FALSE)",
				[id, newTask]
			)
		)
		.catch((err) => console.error(err));
}

async function addList(list) {
	return await getConnection()
		.then((db) =>
			db.run("INSERT INTO lists (url_id, name) VALUES (?, ?)", [
				list,
				list.charAt(0).toUpperCase() + list.slice(1),
			])
		)
		.catch((err) => console.error(err));
}

async function updateTodoState(todoId, isComplete) {
	const sql = "UPDATE todos SET complete = ? WHERE id = ?";
	return await getConnection()
		.then((db) => db.run(sql, [isComplete, todoId]))
		.catch((err) => console.error(err));
}

// async function updateList(list) {
// 	const db = await getConnection();
// }

async function deleteTodo(id) {
	const sql = "DELETE FROM todos WHERE id = ?";
	return await getConnection()
		.then((db) => db.run(sql, [id]))
		.catch((err) => console.error(err));
}

// async function deleteList(id) {
// 	const sql = "DELETE FROM lists WHERE ?";
// 	const db = await getConnection();
// }

module.exports = {
	getTodos,
	addTodo,
	updateTodoState,
	deleteTodo,
	getLists,
	getList,
	addList,
};

// const API_URL = 'https://example.com/file.json';
// ​
// async function namedAsyncFetcher() {
//     const response = await fetch(API_URL);
//     return await response.json();
// }
// ​
// const anonymousAsyncFetcher = async () => {
//     const response = await fetch(API_URL);
//     return await response.json();
// };
// ​
// const anonymousFetcher = () =>
//     new Promise(resolve => {
//         fetch(API_URL)
//             .then(r => r.json())
//             .then(d => resolve(d));
//     });
// ​
// const fetcher = () => fetch(API_URL).then(r => r.json());
// console.log(await fetcher());
// ​
// const willFetch = fetch(API_URL).then(r => r.json());
// ​
// console.log(await willFetch);
