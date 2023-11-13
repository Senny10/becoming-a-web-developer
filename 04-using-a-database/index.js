const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const addTodo = require("./controller/addTodo");
const getLists = require("./controller/getLists");
const getTodos = require("./controller/getTodos");
const updateTodo = require("./controller/updateTodo");
const addNewList = require("./controller/addNewList");

// * Render Logic
const mainTemplate = (option, content, listId) => `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/style.css" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=M+PLUS+Code+Latin:wght@700&display=swap"
			rel="stylesheet"
		/>
		<title>Senny's To-Do List</title>
	</head>
	<body>
		<header>
		<h1 class="title">Senny's To-Do List</h1>
		</header>
		<main>
			<form action="/lists/${listId}/" method="POST">
				<fieldset>
				<ul class="listOfLists">
					<li>
						<label for="listOfTasklists">Your List:</label>
						<select name="listname" id="listOfTasklists" onchange="window.location.href = this.value">
						${option}
						</select>
					</li>
				</ul>	
				</fieldset>
			</form>
			<form action="/lists/${listId}/update-todos" method="POST">
					<fieldset>
						${content}
					
					<ul class="task">
						<li>
							<label>
							Edit your tasks: <button type="submit">Update</button>
							</label>

						</li>
					</ul>
					</fieldset>
			</form>
			
			<form action="/lists/${listId}/add-todo" method="post">
				<fieldset>
					<ul class="newTask">
						<li>
							<label>
								<span>New To-do:</span>
								<input
									id="new_task"
									type="text"
									name="task"
									placeholder="What do you have to do next?"
								/>
							</label>
							<label>
								<span>New List:</span>
								<input
									id="new_list"
									type="text"
									name="list"
									placeholder="Add a new list"
								/>
							</label>
							<button type="submit">Create</button>
						</li>
					</ul>
				</fieldset>
			</form>
		</main>
	</body>
</html>
`;

const renderOptions = (listOfOptions, listId) => {
	let listHtml = "";

	listOfOptions.forEach((option) => {
		const isSelected = listId === option.id;
		return (listHtml += `<option value="/lists/${option.id}" ${
			isSelected ? "selected" : ""
		}>${option.name}</option>)`);
	});
	return listHtml;
};

const renderTodos = (todos) => {
	let todosHtml = "";

	todos.forEach((todo) => {
		todosHtml += renderTodo(todo);
	});
	return `<ul class="task">${todosHtml}</ul>`;
};

const renderTodo = (todo) =>
	`<li>
	<input type="checkbox" id="task-${todo.id}" name="complete-${todo.id}" ${
		todo.complete ? "checked" : ""
	} />
	<label for="task-${todo.id}">${sanitise(todo.task)}</label>
	<button type="submit" name="deleted" value="task-${todo.id}">Delete</button>
	</li>`;

function sanitise(value) {
	var ret = value.replace(/>/g, "&gt;");
	ret = ret.replace(/</g, "&lt;");
	return ret;
}

// * Middleware functions
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// * Routers
app.get("/", (req, res) => {
	res.redirect(`/lists/default/`);
});
app.get("/lists/:listId", async (req, res) => {
	const { listId } = req.params;
	const todos = await getTodos(listId);
	const lists = await getLists();
	const html = mainTemplate(
		renderOptions(lists, listId),
		renderTodos(todos),
		listId
	);
	res.send(html);
});
app.post("/lists/:listId/add-todo", async (req, res) => {
	const listId = req.params.listId;
	const newListId = req.body.list;
	const newTask = req.body.task;

	if (newTask) {
		await addTodo(listId, newTask);
	}

	if (newListId) {
		addNewList(newListId);
	}
	res.redirect(`/lists/${listId}/`);
});
app.post("/lists/:listId/update-todos", async (req, res) => {
	const listId = req.params.listId;
	const updatedTodos = req.body;
	let updatedTodo;
	let todos = await getTodos(listId);
	todos.forEach((todo) => {
		console.log(todos);
		const desiredState = updatedTodos[`complete-${todo.id}`] === "on";
		const actualState = todo.complete;
		const deleted = updatedTodos["deleted"] === `task-${todo.id}`;
		if (desiredState !== actualState) {
			updatedTodo = {
				...todo,
				complete: desiredState,
			};
			updateTodo(listId, updatedTodo);
		}
		if (deleted) {
			deleteTodo(listId, todo.id);
		}
	});

	res.redirect(`/lists/${listId}/`);
});

//* Server Port
app.listen(port, () => {
	console.log(`Server Side Rendering app listening on port ${port}`);
});
