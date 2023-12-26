const getConnection = require("../config/db");

function getUserById(req, res) {
	getConnection()
		.then((db) => {
			const id = req.body.id;
			db.get("SELECT username FROM users WHERE id = ?", [id]).then(
				(user) => {
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
