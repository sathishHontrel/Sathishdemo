import { useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation

 } from "../api/apiSlice";
import { useState } from "react"

const TodoList = () =>{
    const [newtodo,setNewtodo] = useState('');

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error 
    } = useGetTodosQuery();

    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e) =>{
        e.preventDefault();
        addTodo({userId:1, title:newtodo, completed: false})
        setNewtodo('')
    }

    const newItemSection = <form onSubmit={handleSubmit}>
        <label htmlFor='new-todo'>Enter a new todo item</label>
        <div className='new-todo'>
            <input type='text' 
            id='new-todo'
            value={newtodo}
            placeholder='Enter a todo'
            onChange={(e) => {setNewtodo(e.target.value)}}/>
        </div>
        <button className="submit">
           submit
        </button>
    </form>

    let content;
    if (isLoading){
        content = <p>Loading...</p>
    }
    else if (isSuccess){
        content = todos.map(todo =>{
            return (
                <article key={todo.id}>
                    <div className="todo">
                        <input type="checkbox" 
                                checked={todo.completed}
                                id={todo.id}
                                onChange={() => updateTodo({...todo, completed: !todo.completed})}/>
                                <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className="trash" onClick={() => deleteTodo({id: todo.id})}>Delete</button>

                </article>
            )
        })
    }  
    else if (isError){
        content = <p>{error}</p>
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