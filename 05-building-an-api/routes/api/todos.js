const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/todosController");

router
	.route("/api/todos")
	.get(todoController.getTodoByUserId)
	.post(todoController.createTodo);

router
	.route("/api/todos/:todoId")
	.patch(todoController.updateTodo)
	.delete(todoController.deleteTodo);

module.exports = router;
