const router = require("express").Router();
const pool = require("../db");
const todoController = require("../controllers/todoController");

// create a todo
router.post("/", todoController.createTodo);
// get all todos
router.get("/", todoController.getAllTodos);
// get a todo
router.get("/:id", todoController.getTodo);
// update a todo
router.put("/:id", todoController.updateTodo);
// delete a todo
router.delete("/:id", todoController.deleteTodo);

module.exports = router;