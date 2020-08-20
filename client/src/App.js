import React, {useState, useEffect}from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodo";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashbaord from "./components/Dashboard";

const LOCAL_HOST = "http://localhost:5000"

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }

  const isStillAuthenticated = async () =>{
    try {
      const response = await fetch(`${LOCAL_HOST}/auth/verify`,{
        method: "POST",
        headers: {token: localStorage.getItem("token")}
      });
      const parseRes = await response.json();
      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(()=>{
    isStillAuthenticated();
  },[])

  return( 
    <> 
      <Router>
        <div className="container">
          <Switch>
            <Route 
              exact path = "/login" 
              render={props => 
                !isAuthenticated ? (
                  <Login {...props} setAuth = {setAuth}/>) : (
                  <Redirect to="/dashboard"/ >
                )
              }
            />
            <Route exact path = "/register" 
              render={props => 
                !isAuthenticated ? (
                  <Register {...props} setAuth = {setAuth}/>):(
                  <Redirect to="/login"/>
                )
              }
            />
            <Route exact path = "/dashboard" 
              render={props => isAuthenticated ? (
                  <Dashbaord {...props} setAuth = {setAuth}/>) : (
                  <Redirect to="login"/>
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
