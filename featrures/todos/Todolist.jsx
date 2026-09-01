import { useGetTodosQuery } from "../api/apiSlice";
import { useState } from "react"

const TodoList = () =>{
    const [newtodos,setNewtodos] = useState('');

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
        isUninitialized
    } = useGetTodosQuery();


    const handleSubmit = (e) =>{
        e.preventDefault();
        setNewtodo('')
    }

    const newItemSection = <form onSubmit={handleSubmit}>
        <label htmlFor='new-todo'>Enter a new todo item</label>
        <div className='new-todo'>
            <input type='text' 
            id='new-todo'
            value={newtodos}
            placeholder='Enter a todo'
            onChange={(e) => {setNewtodos(e.target.value)}}/>
        </div>
        <button className="submit">
           submit
        </button>
    </form>

    let content;
    if (isLoading || isUninitialized){
        content = <p>Loading...</p>
    }
    else if (isSuccess){
        content = JSON.stringify(todos);
    }  
    else if (isError){
        content = <p>{error?.message || error}</p>
    }


    return(
        <>
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
        </>
    )
}
export default TodoList     
