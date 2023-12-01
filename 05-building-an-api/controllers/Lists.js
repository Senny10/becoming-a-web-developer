const getConnection = require("../config/db");

async function getLists(req, res) {
    return await getConnection().then(async (db) => {
        db.all("SELECT * FROM lists").catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    });
}
