const router = require("express").Router();
const pool = require("../db");

// create a todo
router.post("/", async(req, res) => {
    try{
        const {content} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (content) VALUES($1)", 
            [content]
        );

        res.json(newTodo);
    }catch (err) {
        console.error (err.message);
    }
})
// get all todos
router.get("/", async(req, res) => {
    try{
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        );
        
        res.json(allTodos.rows);
    }catch (err) {
        console.error (err.message);
    }
})

// get a todo
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );

        res.json(todo.rows[0]);
    } catch (err) {
        console.error (err.message);
    }
})

// update a todo
router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET content = $1 WHERE todo_id = $2",
            [content, id]
        );

        res.json("updated... ");
    } catch (err) {
        console.error (err.message);
    }
})

// delete a todo
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );

        res.json("deleted... ");
    } catch (err) {
        console.error (err.message);
    }
})



module.exports = router;