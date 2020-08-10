import React, { useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const LOCAL_HOST = "http://localhost:5000/todos/"
const ListTodo = () => {

    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch(LOCAL_HOST);
            const jsonData = await response.json();
            
            setTodos(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []); // [] means only to do it once on mount

    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`${LOCAL_HOST}${id}`, {
                method: "DELETE"
            });

            //window.location = "/"
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <table className="table table-striped mt-5">
                <thead>
                <tr>
                    <th>Content</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key = {todo.todo_id}> 
                            <td>{todo.content}</td>
                            <td>
                                <EditTodo todo = {todo}/>
                            </td>
                            <td>
                                <button 
                                    className = "btn btn-warning btn-sm"
                                    onClick = {() => deleteTodo(todo.todo_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ListTodo;