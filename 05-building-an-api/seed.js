const getConnection = require("./config/db");
// See https://fakerjs.dev/
const { faker } = require("@faker-js/faker");
const numberOfUsers = 5;
const listLength = 25;

const fakerUsers = Array.from({ length: numberOfUsers }, () => ({
	username: faker.internet.userName(),
	password: faker.internet.password(),
}));

const fakerLists = Array.from({ length: listLength }, () => {
	let name = faker.lorem.words(2).toUpperCase();
	let url_id = name.toLowerCase().replace(/\s/, "_");
	let user_id = faker.number.int({ min: 1, max: numberOfUsers });
	return { url_id, name, user_id };
});


const fakerTodos = Array.from({ length: numberOfUsers }, () => {
	return {
		list_id: faker.number.int({ min: 1, max: listLength }),
		task: faker.lorem.sentence(),
		complete: faker.datatype.boolean(),
	};
});

getConnection()
	.then(async (db) => {
		await db.run("DROP TABLE IF EXISTS todos");
		await db.run("DROP TABLE IF EXISTS lists");
		await db.run("DROP TABLE IF EXISTS users");

		await db.exec(`
	CREATE TABLE lists (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	url_id TEXT NOT NULL,
	name TEXT NOT NULL,
	user_id INTEGER NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT
	);
	CREATE TABLE todos (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	list_id INTEGER NOT NULL,
	task TEXT NOT NULL,
	complete BOOLEAN,
	FOREIGN KEY (list_id) REFERENCES lists (id) ON DELETE RESTRICT
	);
	CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	username TEXT NOT NULL,
	password TEXT NOT NULL
	);
	CREATE UNIQUE INDEX uidx_username ON users (username);
	CREATE UNIQUE INDEX uidx_lid ON lists (url_id); `);
		return db;
	})
	.then(async (db) => {
		for (const fakeUser of fakerUsers) {
			db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
				fakeUser.username,
				fakeUser.password,
			]).then((insert) => ({ id: insert.lastID, username: insert.username, password: insert.password }));
		}

		for (const fakeList of fakerLists) {
			db.run("INSERT INTO lists ( url_id, name, user_id) VALUES (?, ?, ?)", [
				fakeList.url_id,
				fakeList.name,
				fakeList.user_id,
			]).then((insert) => ({ id: insert.lastID, url_id: insert.url_id, name: insert.name, user_id: insert.user_id }));

			for (const fakeTodo of fakerTodos) {
				db.run("INSERT INTO todos (list_id, task, complete) VALUES (?, ?, ?)", [
					fakeTodo.list_id,
					fakeTodo.task,
					fakeTodo.complete,
				]).then((insert) => ({ id: insert.lastID, list_id: insert.list_id, task: insert.task, complete: insert.complete }));
			}
		}
	})
	.catch(console.error);
