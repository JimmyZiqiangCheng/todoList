import React, { useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const LOCAL_HOST = "http://localhost:5000/dashboard"
const ListTodo = ({allTodos, setTodosChange}) => {
    const [todos, setTodos] = useState([]);
    // const getTodos = async () => {
    //     try {
    //         const response = await fetch(`${LOCAL_HOST}`);
    //         const jsonData = await response.json();  
    //         console.log(jsonData);          
    //         setTodos(jsonData)
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    useEffect(() => {
        setTodos(allTodos)
    }, [allTodos]); // [] means only to do it once on mount

    const deleteTodo = async id => {
        try {
            await fetch(`${LOCAL_HOST}/todos/${id}`, {
                method: "DELETE",
                headers: {token: localStorage.getItem("token")}
            });
            setTodosChange(true);
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
                    {todos.length !== 0 && todos[0].todo_id !== null && todos.map(todo => (
                        <tr key = {todo.todo_id}> 
                            <td>{todo.content}</td>
                            <td>
                                <EditTodo todo = {todo} setTodosChange={setTodosChange}/>
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