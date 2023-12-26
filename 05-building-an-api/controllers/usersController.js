const getConnection = require("../config/db");
const md5 = require("md5");
const getUserId = require("../middleware/getUserId");

async function userLogin(req, res) {
	const { username, password } = req.body;
	if (!username || !password)
		return res
			.status(400)
			.json({ message: "Username and password are required." });

	const db = await getConnection();
	db.get(
		"SELECT * FROM users WHERE username = ? AND password = ?",
		[username, md5(password)],
		(err, row) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ error: err });
			}
			if (row) {
				// User found
			} else {
				// User not found
				return res.status(500).json({ message: "User not found." });
			}
		}
	);
}

async function createUser(req, res) {
	const { username, password } = req.body;
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

async function updateUserById(req, res) {
	const { username } = req.body;
	const id = getUserId(username);
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

async function updateUserPasswordById(req, res) {
	const { username, password } = req.body;
	const id = getUserId(username);
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
	const { username } = req.body;
	const id = getUserId(username);
	return await getConnection().then(async (db) => {
		db.run("DELETE FROM users WHERE id = ?", [id]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}
module.exports = {
	userLogin,
	createUser,
	updateUserById,
	updateUserPasswordById,
	deleteUserById,
};
