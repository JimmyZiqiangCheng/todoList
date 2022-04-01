const router = require("express").Router();
const pool = require("../db");
const todoController = require("../controllers/todoController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/todos", authenticateToken, todoController.createTodo);
router.get("/", authenticateToken, todoController.getAllTodos);
router.get("/todos/:id", authenticateToken, todoController.getTodo);
router.put("/todos/:id", authenticateToken, todoController.updateTodo);
router.delete("/todos/:id", authenticateToken, todoController.deleteTodo);

module.exports = router;
