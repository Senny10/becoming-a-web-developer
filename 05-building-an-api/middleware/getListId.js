async function getIdByUrlId(req, res) {
	return await getConnection().then(async (db) => {
		db.get("SELECT id FROM lists WHERE url_id = ?", [
			req.params.listId,
		]).catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
	});
}
module.exports = getIdByUrlId;
