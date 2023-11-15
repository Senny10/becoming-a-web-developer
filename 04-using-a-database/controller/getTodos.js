const { db, promisify } = require("../db-client");

async function getTodos(list = "default") {
  return promisify(db.all)(
    `SELECT * FROM todos JOIN lists ON lists.id = todos.list_id WHERE lists.url_id = ?`,
    [list]
  ).catch(err => {
    console.error(err)
  });
}

module.exports = getTodos;
