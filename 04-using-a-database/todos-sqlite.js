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
	return await getConnection().then((db) =>
		db.all(
			"SELECT * FROM todos JOIN lists ON lists.id = todos.list_id WHERE lists.url_id = ?",
			[list]
		)
	);
}

async function getLists() {
	return await getConnection().then((db) =>
		db.all("SELECT url_id as id, name FROM lists")
	);
}

async function getList(listId) {
	return await getConnection()
		.then((db) => db.get("SELECT id FROM lists WHERE url_id = ?", [listId]))
		.then((r) => r.id);
	// const db = await getConnection();
	// return await db
	// 	.get("SELECT id FROM lists WHERE url_id = ?", [listId])
	// 	.then((r) => r.id);
}
// getList("default").then(console.log);

async function addTodo(listId, task) {
	const id = await getList(listId);
	return await getConnection().then((db) =>
		db.run(
			"INSERT INTO todos (list_id, task, complete) VALUES (?, ?, FALSE)",
			[id, task]
		)
	);
}

async function addList(list) {
	return await getConnection().then((db) =>
		db.run("INSERT INTO lists (url_id, name) VALUES (?, ?)", [
			list,
			list.charAt(0).toUpperCase() + list.slice(1),
		])
	);
}
addList("groceries");
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
