const {db, promisify} = require('../db-client')

async function getList(listId) {
	const list = await promisify(db.get)("SELECT id FROM lists WHERE url_id = ?", [listId]);
	return list;
}
getList("default");
module.exports = getList;
