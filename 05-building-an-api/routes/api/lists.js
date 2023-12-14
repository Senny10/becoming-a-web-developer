const express = require("express");
const router = express.Router();
const listController = require("../../controllers/listsController");

router
	.route("/api/lists")
	.get(listController.getLists)
	.post(listController.createList);
router
	.route("/api/lists/:listId")
	.patch(listController.updateList)
	.delete(listController.deleteList);

module.exports = router;
