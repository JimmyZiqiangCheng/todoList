import React, {useState} from 'react';

const LOCAL_HOST = "http://localhost:5000/todos/"
const EditTodo = ({todo}) => {
    const [content, setContent] = useState(todo.content);

    const handleSetContent = event => {
        setContent(event.target.value);
    }

    const editTodo = async (event, id) => {
        event.preventDefault();
        try {
            const body = {content};
            const editTodo = await fetch(`${LOCAL_HOST}${id}`, {
                headers: { "Content-Type": "application/json" },
                method: "put",
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return( 
        <>
            <button 
                type="button" 
                className="btn btn-primary btn-sm" 
                data-toggle="modal" 
                data-target={`#${todo.todo_id}`}
            >
                Edit 
            </button>
            <div 
                className="modal" 
                id={todo.todo_id}
                onClick = {()=>setContent(todo.content)} 
            >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Please Enter Text</h4>
                    <button 
                        type="button" 
                        className="close" 
                        data-dismiss="modal"
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <input 
                        type = "text" 
                        className = "form-control"
                        value = {content}
                        onChange = {handleSetContent}
                    />
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-sm" 
                        data-dismiss="modal"
                        onClick = {event => editTodo(event, todo.todo_id)}
                    >
                        Confirm
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger btn-sm" 
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                </div>

                </div>
            </div>
            </div>
        </>
    );
}

export default EditTodo;