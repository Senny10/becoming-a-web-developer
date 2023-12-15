const getConnection = require("../config/db");
const md5 = require("md5");

function getUserById(req, res) {
	getConnection()
		.then((db) => {
			db.get("SELECT username FROM users WHERE id = ?", [id]).then((user) => {
				res.json({
					user,
				});
			}
			);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err });
		});
}

async function createUser(req, res, username, password) {
	return await getConnection().then(async (db) => {
		db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
			username,
			md5(password),
		]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}

async function updateUserById(req, res, id, username) {
	return await getConnection().then(async (db) => {
		db.run("UPDATE users SET username = ? WHERE id = ?", [
			username,
			id,
		]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}

async function updateUserPasswordById(req, res, id, password) {
	return await getConnection().then(async (db) => {
		db.run("UPDATE users SET password = ? WHERE id = ?", [
			md5(password),
			id,
		]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}

async function deleteUserById(req, res, id) {
	return await getConnection().then(async (db) => {
		db.run("DELETE FROM users WHERE id = ?", [id]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}
module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUserById,
	updateUserPasswordById,
	deleteUserById,
};
