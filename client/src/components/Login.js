import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

const LOCAL_HOST = "http://localhost:5000"
const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email:"",
        password:""
    })

    const {email, password} = inputs;

    const onChange = e =>{
        setInputs({...inputs, [e.target.name] : e.target.value })
    };

    const onSubmitForm = async e =>{
        e.preventDefault();
        try {
            const body = {email, password};
            const response = await fetch(`${LOCAL_HOST}/auth/login`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            if(parseRes.token){
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("logged in successful!",{
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true,
                });
            }else{
                setAuth(false);
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

    return (
        <>
            <h1
                className="text-center my-5"
            >
                Login
            </h1>
            <form
                onSubmit={e=>onSubmitForm(e)}
            >
                <input 
                    className="form-control my-3"
                    type="email"
                    name="email"
                    onChange={e=>onChange(e)}
                    placeholder="email"
                />
                <input 
                    className="form-control my-3"
                    type="password"
                    name="password"
                    onChange={e=>onChange(e)}
                    placeholder="password"
                />
                <button 
                    className = "btn  btn-success btn-block"
                >
                    Log In
                </button>
            </form>
            <Link to="/register">Register</Link>
        </>
    );
}

export default Login;