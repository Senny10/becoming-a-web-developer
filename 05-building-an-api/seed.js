const getConnection = require("./config/db");

// See https://fakerjs.dev/

(async () => {
	getConnection().then(async (db) => {
		// Delete the existing todos.db file
		await db.run("DROP TABLE IF EXISTS todos");
		await db.run("DROP TABLE IF EXISTS lists");
		await db.run("DROP TABLE IF EXISTS users");
		// Create a new todos.db file and run migrations
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
		// Insert many records into database
		// await db.run("INSERT")
		await db.exec(`
        INSERT INTO lists (url_id, name, user_id)
        VALUES ('default', 'Default', 'admin');
        INSERT INTO lists (url_id, name, user_id)
        VALUES ('shopping', 'Shopping List', 'test');
        INSERT INTO todos (list_id, task, complete)
        VALUES(1, 'Learn some HTML', TRUE);
        INSERT INTO todos (list_id, task, complete)
        VALUES(1, 'Learn some CSS', TRUE);
        INSERT INTO todos (list_id, task, complete)
        VALUES (1, 'Become a full fullstack developer', FALSE);
        INSERT INTO todos (list_id, task, complete)
        VALUES(2, 'Buy some milk', FALSE);
        INSERT INTO todos (list_id, task, complete)
        VALUES (2, 'Buy some bananas', FALSE);
        INSERT INTO todos (list_id, task, complete)
        VALUES (2, 'Buy some red velvet cake', FALSE);
        INSERT INTO users (username, password)
        VALUES ('admin', 'admin');
        INSERT INTO users (username, password)
        VALUES ('user', 'user');
        INSERT INTO users (username, password)
        VALUES ('test', 'test');
        `);
	});
})()
	.then(() => {
		console.log("DONE!");
	})
	.catch(console.error);
