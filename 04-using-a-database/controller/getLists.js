const { db } = require('../db-client');

async function getLists() {
  return new Promise((resolve, reject) => {
    db.all("SELECT url_id as id, name FROM lists", [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}
module.exports = getLists;
