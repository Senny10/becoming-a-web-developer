const getConnection = require("./config/db");
// See https://fakerjs.dev/
const { faker } = require("@faker-js/faker");
const numberOfUsers = 5;
const numberOfLists = 25;

const fakerUsers = (length) =>
	Array.from({ length }, () => ({
		username: faker.internet.userName(),
		password: faker.internet.password(),
	}));

const fakerLists = (length) =>
	Array.from({ length }, () => {
		let name = faker.lorem.words(2).toUpperCase();
		let url_id = name.toLowerCase().replace(/\s/, "_");
		return { url_id, name };
	});

const fakerTodos = (length) =>
	Array.from({ length }, () => ({
		task: faker.lorem.sentence(),
		complete: faker.datatype.boolean(),
	}));

const resetDatabase = async (db) => {
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
		CREATE UNIQUE INDEX uidx_lid ON lists (url_id);
	`);
	return db;
};

getConnection()
	.then(resetDatabase)
	.then(async (db) => {
		for (const fakeUser of fakerUsers(numberOfUsers)) {
			const insertedUser = await db
				.run("INSERT INTO users (username, password) VALUES (?, ?)", [
					fakeUser.username,
					fakeUser.password,
				])
				.then((insert) => ({
					...fakeUser,
					id: insert.lastID,
				}));

			for (const fakeList of fakerLists(numberOfLists)) {
				const insertedList = await db
					.run(
						"INSERT INTO lists ( url_id, name, user_id) VALUES (?, ?, ?)",
						[fakeList.url_id, fakeList.name, insertedUser.id]
					)
					.then((insert) => ({
						...fakeList,
						id: insert.lastID,
					}));

				for (const fakeTodo of fakerTodos(
					faker.number.int({ min: 0, max: 10 })
				)) {
					await db
						.run(
							"INSERT INTO todos (list_id, task, complete) VALUES (?, ?, ?)",
							[insertedList.id, fakeTodo.task, fakeTodo.complete]
						)
						.then((insert) => ({
							...fakeTodo,
							id: insert.lastID,
						}));
				}
			}
		}
	})
	.catch(console.error);
