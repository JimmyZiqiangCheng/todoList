const pool = require("../db");

// create a todo for the user
exports.createTodo = async(req, res) => {
    try{
        const {content} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todos (user_id, content) VALUES($1, $2) RETURNING *", 
            [req.user.id, content]
        );

        res.json(newTodo.rows[0]);
    }catch (err) {
        console.error (err.message);
    }
};

// get all todos for the specified user
exports.getAllTodos = async(req, res) => {
    try{
        const user = await pool.query(
            "SELECT user_name, todo_id, content FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1",
            [req.user.id]
        );
        
        res.json(user.rows);
    }catch (err) {
        console.error (err.message);
    }
};

// get a specific todo
exports.getTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query(
            "SELECT * FROM todos WHERE todo_id = $1 AND user_id = $2",
            [id, req.user.id]
        );
        if (todo.rows.length === 0){
            res.json("This todo does not belong to you.");
        }
        res.json(todo.rows[0]);
    } catch (err) {
        console.error (err.message);
    }
};

// update a todo
exports.updateTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;
        const updateTodo = await pool.query(
            "UPDATE todos SET content = $1 WHERE todo_id = $2 AND user_id = $3",
            [content, id, req.user.id]
        );
        if (updateTodo.rows.length === 0){
            res.json("This todo does not belong to you.");
        }
        res.json("updated... ");
    } catch (err) {
        console.error (err.message);
    }
};

// delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2",
            [id, req.user.id]
        );
        if (deleteTodo.rows.length === 0){
            res.json("This todo does not belong to you.");
        }else{
            res.json("deleted... ");
        }
    } catch (err) {
        console.error (err.message);
    }
};