import React, {useState}from "react";

const LOCAL_HOST = "http://localhost:5000/todos"
const InputTodo = () => {

    const [content, setContent] = useState("")
    const handleSetContent = event => {
        setContent(event.target.value);
    }
    const onSubmitForm = async event => {
        event.preventDefault();
        try {
            const body = {content};
            const response = await fetch(LOCAL_HOST, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h1 className="text-center mt-3">Jimmy's Todo List</h1>
            <form className = "d-flex mt-5" onSubmit = {onSubmitForm}> 
                <input 
                    type="text" 
                    className="form-control mr-1" 
                    value={content} 
                    placeholder={"Please type your input here ... "}
                    onChange = {handleSetContent}    
                />
                <button className="btn btn-dark">Add</button>
            </form>
        </>
    );
};

export default InputTodo;