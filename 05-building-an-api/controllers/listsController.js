const getConnection = require("../config/db");

// TODO 3. Add pagination to this endpoint
// /api/lists?page=1 - return the second page of results
// total - is the total number of rows in the lists table
// perPage - the number of results per page
function getLists(req, res) {
	let query = "SELECT * FROM lists";
	const queryParameters = [];

	if (req.query.user_id) {
		query += " WHERE user_id = ?";
		queryParameters.push(req.query.user_id);
	}

	// Pagination
	const perPage = req.query.per_page || 10; // Number of results per page
	const page = req.query.page || 1; // Page number
	const offset = (page - 1) * perPage; // Calculate the offset

	query += " LIMIT ? OFFSET ?";
	queryParameters.push(perPage, offset);

	getConnection().then((db) => {
		db.all(query, queryParameters).then((lists) => {
			res.json({
				lists: lists.map((list) => ({
					...list,
					meta: {
						view: `http://localhost:8000/api/list/${list.id}`,
					},
				})),
			});
		});
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
function updateList(req, res) {
	const list = req.body;

	getConnection()
		.then((db) => {
			db.run("UPDATE lists SET name = ? WHERE url_id = ?", [
				list.name,
				list.urlId,
			]).then(() => {
				res.status(200).json({
					list,
				});
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
}

// 2. Turn this into a non-async function
// respond with nothing
// 204
function deleteList(req, res) {
	const list = req.body;

	getConnection()
		.then((db) => {
			db.run("DELETE FROM lists WHERE url_id = ?", [list.urlId]).then(
				() => {
					res.status(204).json({ message: "List deleted" });
				}
			);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
}

module.exports = { getLists, createList, updateList, deleteList };
