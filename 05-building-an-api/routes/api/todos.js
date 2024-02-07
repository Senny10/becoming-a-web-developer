const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/todosController");

router
	.route("")
	.get(todoController.getTodoByUserId)
	.post(todoController.createTodo);

router
	.route(":todoId")
	.patch(todoController.updateTodoById)
	.delete(todoController.deleteTodoById);

module.exports = router;
