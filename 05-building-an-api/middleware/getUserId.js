const getConnection = require("../config/db.js");

async function getUserId(username) {
	getConnection()
		.then((db) => {
			db.get("SELECT id FROM users WHERE username = ?", [username]).then(
				(user) => {
					return user.id;
				}
			);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err });
		});
}

getUserId("test");
module.exports = getUserId;
