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
module.exports = getConnection;
