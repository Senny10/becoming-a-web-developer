const express = require("express");
const router = express.Router();
const listController = require("../../controllers/listsController");
const todoController = require("../../controllers/todosController");

router
	.route("")
	.get(listController.getLists)
	.post(listController.createList);

router
	.route(":listId")
	.patch(listController.updateList)
	.delete(listController.deleteList);

router
	.route(":listId/todo")
	.get(todoController.getTodoByList)
	.post(todoController.createTodo);

router
	.route(":listId/todo/:todoId")
	.patch(todoController.updateTodoById)
	.delete(todoController.deleteTodoById);

module.exports = router;
