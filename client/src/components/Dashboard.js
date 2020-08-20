import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';

const LOCAL_HOST = "http://localhost:5000"
const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");
    const getName = async()=> {
        try {
            const response = await fetch(`${LOCAL_HOST}/dashboard`,{
                method: "GET",
                headers:{token: localStorage.getItem("token")} // used for authenticateToken middleware
            });
            const parseRes = await response.json();
            const user_name = parseRes.user_name;
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
        getName();
    },[]); // the array as second argument is the variable that useEffect dependant on to re-run, [] means to run only once
    
    return (
        <>
            <h1>Dashboard {name}</h1>
            <button 
                className = "btn btn-primary btn-sm"
                onClick = {e => logout(e)}
            >
                Log Out
            </button>
        </>
    );
}

export default Dashboard;