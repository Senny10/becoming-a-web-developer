const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const { getTodos, getLists, addTodo, updateTodo } = require("./todos");

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
				<section>
				<ul class="listOfLists">
					<li>
						<label for="listOfTasklists">Your List:</label>
						<select name="listname" id="listOfTasklists" onchange="window.location.href = this.value">
						${option}
						</select>
					</li>
				</ul>
					
				</section>
			</form>
			<form action="/lists/${listId}/update-todos" method="POST">
					<section>
						${content}
					</section>
					<ul class="task">
						<li>
							<label>
							Edit your tasks: <button type="submit">Update</button>
							</label>

						</li>
					</ul>
					
			</form>
			
			<form action="/lists/${listId}/add-todo" method="POST">
				<section>
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
							<button type="submit">Create</button>
						</li>
					</ul>
				</section>
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
<label
  ><input type="checkbox" name="complete-${todo.id}" ${
		todo.complete ? "checked" : ""
	} />${sanitise(todo.task)}
</label>
<button type="button">Delete</button>
</li>`;

sanitise = (value) => {
	var ret = value.replace(/>/g, "&gt;");
	ret = ret.replace(/</g, "&lt;");
	return ret;
};

// * Middleware functions
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// * Routers
app.get("/", (req, res) => {
	res.redirect(`/lists/default/`);
});
app.get("/lists/:listId", (req, res) => {
	const { listId } = req.params;
	const todos = getTodos(listId);
	const lists = getLists();
	const html = mainTemplate(
		renderOptions(lists, listId),
		renderTodos(todos),
		listId
	);
	res.send(html);
});
app.post("/lists/:listId/add-todo", (req, res) => {
	const listId = req.params.listId;
	const newTask = {
		task: req.body.task,
		complete: req.body.complete,
	};
	addTodo(listId, newTask);
	res.redirect(`/lists/${listId}/`);
});
app.post("/lists/:listId/update-todos", (req, res) => {
	// const listId = req.params.listId;
	// const updatedTodo = {
	// 	id: req.body.id,
	// 	task: req.body.task,
	// 	complete: req.body,
	// };
	// console.log(req.body.complete[req.body.id]);
	// updateTodo(listId, updatedTodo);
	// res.redirect(`/lists/${listId}/`);
});

//* Server Port
app.listen(port, () => {
	console.log(`Server Side Rendering app listening on port ${port}`);
});
