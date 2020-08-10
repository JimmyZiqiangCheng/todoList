const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());  //req.body

// ROUTES //
// create a todo
app.post("/todos", async(req, res) => {
    try{
        const {content} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (todo_id, content) VALUES(uuid_generate_v4(), $1)", 
            [content]
        );

        res.json(newTodo);
    }catch (err) {
        console.error (err.message);
    }
})
// get all todos
app.get("/todos", async(req, res) => {
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
app.get("/todos/:id", async (req, res) => {
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
app.put("/todos/:id", async (req, res) => {
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
app.delete("/todos/:id", async (req, res) => {
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

app.listen(5000, () => {
    console.log("server has started on port 5000");
})