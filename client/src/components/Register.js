import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

const LOCAL_HOST = "http://localhost:5000"
const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    })

    const {email, password, name} = inputs;

    const onChange = e =>{
        setInputs({...inputs, [e.target.name] : e.target.value })
    };

    const onSubmitForm = async e =>{
        e.preventDefault();
        try {
            const body = {email, password, name}
            const response = await fetch(`${LOCAL_HOST}/auth/register`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const parseRes = await response.json()
            if (parseRes.token){
                localStorage.setItem("token", parseRes.token);
                // set auth to true after submit the form
                setAuth(true);
                toast.success("login successful!",{
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true,
                });
            }else{
                toast.error(parseRes,{
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true,
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    console.log()
    return (
        <>
            <h1
                className="text-center my-5"
            >
                Register
            </h1>
            <form 
                onSubmit = {e=>onSubmitForm(e)}
            >
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email"
                    className="form-control my-3"
                    value={email}
                    onChange = {e=>onChange(e)}
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password"
                    className="form-control my-3"
                    value={password}
                    onChange = {e=>onChange(e)}
                />
                <input 
                    type="text" 
                    name="name" 
                    placeholder="name"
                    className="form-control my-3"
                    value={name}
                    onChange = {e=>onChange(e)}
                />
                <button
                    className="btn btn-success btn-sm btn-block"
                >
                    Submit
                </button>
            </form>
            <Link to="/login">Log In</Link>
        </>
    );
}

export default Register;