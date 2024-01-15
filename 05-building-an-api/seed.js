const getConnection = require("./config/db");

// See https://fakerjs.dev/
const { faker } = require("@faker-js/faker");
const numberOfUsers = 5;
const ListofLists = [];
const numberOfTasks = 5 * ListofLists.length;

// Create an user object that includes name and password
function createUser() {
	const user = {
		username: faker.internet.userName(),
		password: faker.internet.password(),
	};
	return user;
}

// Create a list object that includes name user_id and url_id
function createList() {
	const name = faker.lorem.words(2).toUpperCase();
	const url_id = name.toLowerCase();

	const list = {
		name: name,
		user_id: faker.number.int({ min: 1, max: numberOfUsers }),
		url_id: url_id,
	};
	return list;
}
// Create an array of todo object that includes task, list_id and complete
function createTask() {
	const task = {
		task: faker.lorem.sentence(),
		list_id: ListofLists[Math.random(0, ListofLists.length - 1)],
		complete: faker.datatype.boolean(),
	};
	return task;
}

// (async () => {
//     getConnection().then(async (db) => {
//         await db.run("DROP TABLE IF EXISTS todos");
//         await db.run("DROP TABLE IF EXISTS lists");
//         await db.run("DROP TABLE IF EXISTS users");

//         await db.exec(`
//         CREATE TABLE lists (
//         id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//         url_id TEXT NOT NULL,
//         name TEXT NOT NULL,
//         user_id INTEGER NOT NULL,
//         FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT
//         );
//         CREATE TABLE todos (
//         id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//         list_id INTEGER NOT NULL,
//         task TEXT NOT NULL,
//         complete BOOLEAN,
//         FOREIGN KEY (list_id) REFERENCES lists (id) ON DELETE RESTRICT
//         );
//         CREATE TABLE users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//         username TEXT NOT NULL,
//         password TEXT NOT NULL
//         );
//         CREATE UNIQUE INDEX uidx_username ON users (username);
//         CREATE UNIQUE INDEX uidx_lid ON lists (url_id); `);

//         await db.exec(`
//         INSERT INTO lists (url_id, name, user_id)
//         VALUES ('default', 'Default', 'admin');
//         INSERT INTO lists (url_id, name, user_id)
//         VALUES ('shopping', 'Shopping List', 'test');
//         INSERT INTO todos (list_id, task, complete)
//         VALUES(1, 'Learn some HTML', TRUE);
//         INSERT INTO todos (list_id, task, complete)
//         VALUES(1, 'Learn some CSS', TRUE);
//         INSERT INTO todos (list_id, task, complete)
//         VALUES (1, 'Become a full fullstack developer', FALSE);
//         INSERT INTO todos (list_id, task, complete)
//         VALUES(2, 'Buy some milk', FALSE);
//         INSERT INTO todos (list_id, task, complete)
//         VALUES (2, 'Buy some bananas', FALSE);
//         INSERT INTO todos (list_id, task, complete)
//         VALUES (2, 'Buy some red velvet cake', FALSE);
//         INSERT INTO users (username, password)
//         VALUES ('admin', 'admin');
//         INSERT INTO users (username, password)
//         VALUES ('user', 'user');
//         INSERT INTO users (username, password)
//         VALUES ('test', 'test');
//         `);
//     });
// })()
//     .then(() => {
//         console.log("Dummy data inserted successfully");
//     })
//     .catch(console.error);

const fakeUser = () => ({
	username: faker.internet.userName(),
	password: faker.internet.password(),
});

const insertUser = (db, { username, password }) =>
	db
		.run("INSERT INTO users (username, password) VALUES (?, ?)", [
			username,
			password,
		])
		.then((insert) => ({ username, password, id: insert.lastID }));

const fakeList = () => {
	const name = faker.lorem.words(2).toUpperCase();
	const url_id = name.toLowerCase().replace(/\s/, "_");

	return { name, user_id, url_id };
};

const insertList = (db, { name, user_id, url_id }) =>
	db
		.run("INSERT INTO lists (name, user_id, url_id) VALUES (?, ?, ?)", [
			name,
			user_id,
			url_id,
		])
		.then((insert) => ({ name, user_id, url_id, id: insert.lastID }));

const fakeTodo = ({ id: list_id }) => ({
	task: faker.lorem.sentence(),
	list_id,
	complete: faker.datatype.boolean(),
});

const insertTodo = (db, { list_id, task, complete }) =>
	db
		.run("INSERT INTO todos (list_id, task, complete) VALUES (?, ?, ?)", [
			list_id,
			task,
			complete,
		])
		.then((insert) => ({ list_id, task, complete, id: insert.lastID }));

const makeFakes = (count, factory) =>
	new Array(count).fill(null).map(() => factory());

getConnection()
	.then(async (db) => {
		await db.run("DELETE FROM todos");
		await db.run("DELETE FROM lists");
		await db.run("DELETE FROM users");

		const fakeUsers = makeFakes(numberOfUsers, fakeUser);

		for (const fakeUser of fakeUsers) {
			await insertUser(db, fakeUser);
// TODO: Ask Lawrence how to get the id of the user
			const fakeLists = makeFakes(numberOfUsers, fakeList);

			for (const fakeList of fakeLists) {
				await insertList(db, fakeList);

				const fakeTodos = makeFakes(numberOfUsers, fakeTodo);

				for (const fakeTodo of fakeTodos) {
					await insertTodo(db, fakeTodo);
				}
			}
		}
	})
	.catch(console.error);
