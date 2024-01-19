const getConnection = require("./config/db");
// See https://fakerjs.dev/
const { faker } = require("@faker-js/faker");
const numberOfUsers = 5;

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
			const fakeUsersinDB = await insertUser(db, fakeUser);
			let userFactory = fakeList(user_id = fakeUsersinDB.id);
			const fakeLists = makeFakes(numberOfUsers, userFactory);
			// for (const fakeList of fakeLists) {
			// 	const fakeListinDB = await insertList(db, fakeList);

			// 	const fakeTodos = makeFakes(numberOfUsers, fakeTodo(list_id = fakeListinDB.id));
			// 	for (const fakeTodo of fakeTodos) {
			// 		await insertTodo(db, fakeTodo);

			// 	}
			// }
		}
	})
	.catch(console.error);
