const getConnection = require("../config/db");

// 3. Add pagination to this endpoint
// /api/lists?page=1 - return the second page of results
// total - is the total number of rows in the lists table
// perPage - the number of results per page
function getLists(req, res) {
	getConnection()
		.then((db) => {
			db.all("SELECT * FROM lists").then((lists) => {
				res.json({
					lists,
				});
			});
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err });
		});
}

function createList(req, res) {
	getConnection()
		.then((db) => {
			const list = req.body;

			db.run(
				"INSERT INTO lists (url_id, name, user_id) VALUES (?, ?, ?)",
				[
					list.listId,
					list.listId.charAt(0).toUpperCase() + list.listId.slice(1),
					1,
				]
			).then(() => {
				res.status(201).json({
					meta: {
						links: {
							update: `PATCH /api/lists/${list.listId}`,
							delete: `DELETE /api/lists/${list.listId}`,
						},
					},
				});
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
}

// 1. Turn this into a non-async function
// respond with the updated list
// 200
async function updateList(req, res) {
	return await getConnection().then(async (db) => {
		db.run("UPDATE lists SET name = ? WHERE id = ?", [urlId, id]).catch(
			(err) => {
				console.log(err);
				res.status(500).json({ error: err });
			}
		);
	});
}

// 2. Turn this into a non-async function
// respond with nothing
// 204
async function deleteList(req, res, id) {
	return await getConnection().then(async (db) => {
		db.run("DELETE FROM lists WHERE id = ?", [id]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}

module.exports = { getLists, createList, updateList, deleteList };
