const express = require("express");
const router = express.Router()
const path = require("path")
const { getTodos } = require("../todos")


router.get("^/$|/index(.html)?", (req, res) => {
    
    res.sendFile(path.join(__dirname, "public", "index.html"))
  });

module.exports = router;
