let todos = {
	default: {
		name: "Default",
		todos: [
			{ id: 1, task: "Learn some HTML", complete: true },
			{ id: 2, task: "Learn some CSS", complete: true },
			{ id: 3, task: "Become a web developer", complete: false },
		],
	},
	shopping: {
		name: "Shopping List",
		todos: [
			{ id: 4, task: "Buy some milk", complete: false },
			{ id: 5, task: "Buy some bananas", complete: false },
			{ id: 6, task: "Buy some chocolate", complete: false },
		],
	},
};

function getLists() {
	return Object.entries(todos).map(([id, list]) => ({
		id,
		name: list.name,
		count: list.todos.length,
	}));
}

function getTodos(list = "default") {
	return todos[list].todos;
}

function addTodo(listId, todoRecord) {
	const { task, complete } = todoRecord;

	const newTodo = {
		id: todos[listId].length + 1,
		task: task,
		complete: complete,
	};
	todos[listId].todos.push(newTodo);
}

function updateTodo(listId, todoRecord) {
	const { id, task, complete } = todoRecord;
	const todosObj = todos[listId].todos;
	todosObj.id = id;
	todosObj.task = task;
	todosObj.complete = complete;
	return todosObj;
}

module.exports = { getLists, getTodos, addTodo, updateTodo };
