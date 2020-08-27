const router = require("express").Router();
const pool = require("../db");
const todoController = require("../controllers/todoController");
const authenticateToken = require("../middleware/authenticateToken");

// create a todo
router.post("/todos", authenticateToken, todoController.createTodo);
// get all todos and user
router.get("/", authenticateToken, todoController.getAllTodos);
// get a todo
router.get("/todos/:id", authenticateToken, todoController.getTodo);
// update a todo
router.put("/todos/:id", authenticateToken, todoController.updateTodo);
// delete a todo
router.delete("/todos/:id", authenticateToken, todoController.deleteTodo);

module.exports = router;