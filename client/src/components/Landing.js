import React from 'react';
import {Link} from 'react-router-dom';
const Landing = () => {
    return (
        <div className = "jumbotron mt-5">
            <h1> Welcome to Jimmy's todo List</h1>
            <p> Sign in and start building your todo list</p>
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            <Link to="/register" className="btn btn-success btn-sm ml-3">Register</Link>
        </div>
    );
}

export default Landing;