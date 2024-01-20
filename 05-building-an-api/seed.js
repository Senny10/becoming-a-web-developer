const getConnection = require("./config/db");
// See https://fakerjs.dev/
const { faker } = require("@faker-js/faker");
const numberOfUsers = 5;

const fakerUser = Array.from({ length: numberOfUsers }, () => ({
	username: faker.internet.userName(),
	password: faker.internet.password(),
}));

const insertUser = (db, { username, password }) =>
	db
		.run("INSERT INTO users (username, password) VALUES (?, ?)", [
			username,
			password,
		])
		.then((insert) => ({ id: insert.lastID, username, password }));

const fakerList = Array.from({ length: numberOfUsers }, () => {
	let name = faker.lorem.words(2).toUpperCase();
	let url_id = name.toLowerCase().replace(/\s/, "_");
	let user_id = 0;
	return { url_id, name, user_id };
});

const insertList = (db, { url_id, name, user_id }) =>
	db
		.run("INSERT INTO lists ( url_id, name, user_id) VALUES (?, ?, ?)", [
			url_id,
			name,
			user_id,
		])
		.then((insert) => ({ id: insert.lastID, url_id, name, user_id }));

const fakerTodo = Array.from({ length: numberOfUsers }, () => {
	return {
		list_id: faker.number.int({ min: 1, max: numberOfUsers }),
		task: faker.lorem.sentence(),
		complete: faker.datatype.boolean(),
	};
});

const insertTodo = (db, { list_id, task, complete }) =>
	db
		.run("INSERT INTO todos (list_id, task, complete) VALUES (?, ?, ?)", [
			list_id,
			task,
			complete,
		])
		.then((insert) => ({ id: insert.lastID, list_id, task, complete }));


// getConnection()
//   .then(async (db) => {
//     await db.run("DELETE FROM todos");

//     await db.run("DELETE FROM lists");

//     await db.run("DELETE FROM users");

//     const fakeUsers = makeFakes(numberOfUsers, fakerUser());

//     for (const fakeUser of fakeUsers) {
//       const fakeUsersinDB = await insertUser(db, fakeUser);

//       const fakeLists = makeFakes(
//         numberOfUsers,
//         fakerList((user_id = fakeUsersinDB.id))
//       );

//       for (const fakeList of fakeLists) {
//         const fakeListinDB = await insertList(db, fakeList);

//         const fakeTodos = makeFakes(numberOfUsers, fakerTodo(fakeListinDB.id));
//         for (const fakeTodo of fakeTodos) {
//           await insertTodo(db, fakeTodo);
//         }
//       }
//     }
//   })
//   .catch(console.error);
