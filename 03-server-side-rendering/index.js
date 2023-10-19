const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const { getTodos, getLists } = require("./todos").default;

// * Rendering Logic






// * Middleware functions
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use("^/$|/index(.html)?", require("./routes/root"))
// app.use("/todos", require("./routes/api/todolists"))
// app.use("/users", require("./routes/api/users"))

// * Routers
app.get("/", (req, res) => {
	const todos = getTodos();
	const lists = getLists();
	const html = mainTemplate(renderTodos(todos));
	res.send(html);
});
app.get("/lists/:listId", (req, res) => {
	const { listId } = req.params;
	const todos = getTodos(listId);
	console.log(todos);
	const html = mainTemplate(renderTodos(todos));
	res.send(html);
});

//* Server Port
app.listen(port, () => {
	console.log(`Server Side Rendering app listening on port ${port}`);
});
