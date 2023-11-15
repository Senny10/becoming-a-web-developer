const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  require.resolve(path.join(__dirname, "./db/todos.db"))
);

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.bind(db)(...args, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  };
}

module.exports = {
  db: db,
  promisify,
};
