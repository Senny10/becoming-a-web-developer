const express = require("express");
const router = express.Router();
const listController = require("../../controllers/listController");

router
	.route("/api/lists")
	.get(listController.getLists)
	.post(listController.createList);
router
	.route("/api/lists/:urlId")
	.get(listController.getListByUrlId)
	.patch(listController.updateList)
	.delete(listController.deleteList);

module.exports = router;
