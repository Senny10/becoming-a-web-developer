const getConnection = require("./config/db");
// See https://fakerjs.dev/
const { faker } = require("@faker-js/faker");
const numberOfUsers = 5;

const fakerUsers = Array.from({ length: numberOfUsers }, () => ({
	username: faker.internet.userName(),
	password: faker.internet.password(),
}));

const fakerLists = Array.from({ length: numberOfUsers }, () => {
	let name = faker.lorem.words(2).toUpperCase();
	let url_id = name.toLowerCase().replace(/\s/, "_");
	let user_id = 0;
	return { url_id, name, user_id };
});

const fakerTodos = Array.from({ length: numberOfUsers }, () => {
	return {
		list_id: faker.number.int({ min: 1, max: numberOfUsers }),
		task: faker.lorem.sentence(),
		complete: faker.datatype.boolean(),
	};
});

getConnection()
	.then(async (db) => {
		await db.run("DELETE FROM todos");

		await db.run("DELETE FROM lists");

		await db.run("DELETE FROM users");

		for (const fakeUser of fakerUsers) {
			db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
				fakeUser.username,
				fakeUser.password,
			]).then((insert) => ({ id: insert.lastID, username: insert.username, password: insert.password }));


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
		}
	})
	.catch(console.error);
