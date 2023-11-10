const { getTodosFromDB, getListsFromDB } = require("./todos-sqlite");

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

async function getTodos(list = "default") {
	try {
		return await getTodosFromDB(list);
	} catch (error) {
		console.error("Error:", error);
	}
}

function addTodo(listId, todoRecord) {
	const { task, complete } = todoRecord;
	const todosArray = todos[listId].todos;
	const newTodo = {
		id: todosArray.length + 1,
		task: task,
		complete: complete,
	};
	console.log(newTodo.id);
	todos[listId].todos.push(newTodo);
}

function updateTodo(listId, todoRecord) {
	const { id } = todoRecord;
	const todosArray = todos[listId].todos;
	todosArray.forEach((todo) => {
		if (todo.id === id) {
			todo.complete = todoRecord.complete;
			todo.task = todoRecord.task;
		}
	});
}

function deleteTodo(listId, taskId) {
	let newTodos;
	let todosArray = todos[listId].todos;
	newTodos = todosArray.filter((todo) => todo.id !== taskId);
	todos[listId].todos = newTodos;
}

function addNewList(listId) {
	const newList = { listId: { name: listId.toUpperCase(), todos: [] } };
	todos = { ...todos, ...newList };
}

module.exports = {
	getLists,
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
	addNewList,
};
