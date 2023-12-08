const getConnection = require("../config/db");

async function getLists(req, res) {
	return await getConnection().then(async (db) => {
		db.all("SELECT * FROM lists").catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}
async function getListByUrlId(req, res, urlId) {
	return await getConnection().then(async (db) => {
		db.get("SELECT * FROM lists WHERE id = ?", [urlId]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}

async function createList(req, res, urlId) {
	return await getConnection().then(async (db) => {
		db.run("INSERT INTO lists (url_id, name) VALUES (?, ?)", [
			urlId,
			urlId.charAt(0).toUpperCase() + list.slice(1),
		]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}

async function updateList(req, res, urlId, id) {
	return await getConnection().then(async (db) => {
		db.run("UPDATE lists SET name = ? WHERE id = ?", [urlId, id]).catch(
			(err) => {
				console.log(err);
				res.status(500).json({ error: err });
			}
		);
	});
}

async function deleteList(req, res, id) {
	return await getConnection().then(async (db) => {
		db.run("DELETE FROM lists WHERE id = ?", [id]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}
module.exports = { getLists, getListByUrlId, createList, updateList, deleteList };
