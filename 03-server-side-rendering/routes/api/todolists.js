const getTodos = require("../../todos.js")
const express = require('express');
const router = express.Router();

const lists = getTodos.getLists
const todos = getTodos.getTodos

const listOfTodos = todos()
const listOfLists = lists()

router.get("/", (req, res) => res.send(listOfTodos))
// testLists.forEach(ls => console.log(ls.name))
// testArray.forEach(todo => {
//    console.log(todo.id) 
// });
module.exports = router;
