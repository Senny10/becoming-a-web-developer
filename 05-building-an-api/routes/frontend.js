const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/user", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "user.html"));
});
router.get("/todos", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "todos.html"));
});

module.exports = router;
