const getConnection = require("./config/db");

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
        CREATE UNIQUE INDEX IF NOT EXISTS uidx_username ON users (username);
        CREATE UNIQUE INDEX IF NOT EXISTS uidx_lid ON lists (url_id); `);
    })
    .catch(console.error);
