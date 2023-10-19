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

function addTodos(listId, todoRecord) {
	const { task, complete } = todoRecord;

	const newTodo = {
		id: todos[listId].length + 1,
		task: task,
		complete: complete,
	};
	return [...todos[listId].todos, newTodo];
}

module.exports = { getLists, getTodos, addTodos };
