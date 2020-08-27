import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';

//components
import InputTodo from "./todoList/InputTodo"
import ListTodo from "./todoList/ListTodo"

const LOCAL_HOST = "http://localhost:5000"

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

    const getNameAndTodos = async()=> {
        try {
            const response = await fetch(`${LOCAL_HOST}/dashboard`,{
                method: "GET",
                headers:{token: localStorage.getItem("token")} // used for authenticateToken middleware
            });
            const parseRes = await response.json();
            const user_name = parseRes[0].user_name;
            setAllTodos(parseRes);
            setName(user_name);        
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = e =>{
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("logged out successfully!",{
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1000,
            hideProgressBar: true,
        });
    }

    useEffect(()=>{
        getNameAndTodos();
        setTodosChange(false);
    },[todosChange]); // the array as second argument is the variable that useEffect dependant on to re-run, [] means to run only once
    
    return (
        <>
            <InputTodo name={name} setTodosChange={setTodosChange}/>
            <ListTodo allTodos={allTodos} setTodosChange={setTodosChange}/>
            <button 
                className = "btn btn-primary btn-sm mt-5"
                onClick = {e => logout(e)}
            >
                Log Out
            </button>
        </>
    );
}

export default Dashboard;