const { db } = require('../db-client')

async function addTodo(listId, task) {
	const id = await getList(listId);
	console.log(id);
	console.log(task);

	db.run(
		`INSERT INTO todos (list_id, task, complete)
	VALUES(${id}, ${task}, FALSE)`,
		[],
		(error) => {
			if (error) {
				console.error(error);
			}
		}
	);
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
	});
}
module.exports = addTodo;
