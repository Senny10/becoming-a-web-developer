const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const { getTodos, getLists } = require("./todos");

// * Render Logic
const mainTemplate = (option, content) => `<!DOCTYPE html>
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
		<header><h1 class="title">Senny's To-Do List</h1></header>
		<main>
            <section>
			<label for="listOfTasklists">Your List:</label>
			<select name="" id="listOfTasklists">
			${option}
			</select>
			
			</section>
			<section>
				${content}
			</section>
			<section>
				<ul class="newTask">
					<li>
						<label>
							<span>New To-do:</span>
							<input
								id="new_task"
								type="text"
								name="new_task"
								placeholder="What do you have to do next?"
							/>
						</label>
						<button type="button">Create</button>
					</li>
				</ul>
			</section>
		</main>
	</body>
</html>
`;

const renderOptions = (listOfOptions) => {
	let listHtml = "";
	listOfOptions.forEach(
		(option) =>
			(listHtml += `<option value=${option.name}>${option.name}</option>)`)
	);

	return listHtml;
};

const renderTodos = (todos) => {
	let todosHtml = "";
	todos.forEach((todo) => {
		todosHtml += renderTodo(todo);
	});
	return `<ul class="task">
${todosHtml}
</ul>`;
};

const renderTodo = (todo) =>
	`<li>
<label
  ><input type="checkbox" name="existingTask${todo.id}" ${
		todo.complete ? "checked" : ""
	} />${todo.task}
</label>
<button type="button">Delete</button>
</li>`;

// * Middleware functions
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// * Routers
app.get("/", (req, res) => {
	const todos = getTodos();
	const lists = getLists();
	const html = mainTemplate(renderOptions(lists), renderTodos(todos));
	res.send(html);
});
app.get("/lists/:listId", (req, res) => {
	const { listId } = req.params;
	const todos = getTodos(listId);
	const lists = getLists();
	const html = mainTemplate(renderOptions(lists), renderTodos(todos));
	res.send(html);
});
app.post("/lists/:listId/add-todo", (req, res) => {
	const newList = req.body.listname;
	const newTask = {
		task: req.body.task,
		complete: req.body.complete,
	};
	addTodos(newList, newTask);
});

//* Server Port
app.listen(port, () => {
	console.log(`Server Side Rendering app listening on port ${port}`);
});
