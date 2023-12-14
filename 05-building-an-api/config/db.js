const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

let _db;
async function getConnection() {
	if (_db != null) return _db;

	try {
		_db = await open({
			filename: path.join(process.cwd(), "todos.db"),
			driver: sqlite3.Database,
		});
	} catch (e) {
		console.log("Database is not connected");
	}

	return _db;
}
module.exports = getConnection;
