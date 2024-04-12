import './App.css';
import { useState,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editId, setEditId] = useState(0)
    const inputRef = useRef(null)

    const handleClick = (e) => {
        e.preventDefault()
        
        if(editId){
            const editTodo = todos.find((edit)=> edit.id===editId )
            const updatedTodos = todos.map((t)=>
            
            t.id === editTodo.id  ? (t={id:t.id, todo}):{id:t.id, todo:t.todo}
            )
            setTodos(updatedTodos);
            setEditId(0)
            setTodo('')
            return;
        }

        if(!todo || /^\s*$/.test(todo)){
            return;
        }
        setTodos([{id:`${todo}-${Date.now()}` ,todo},...todos])

        console.log(todos)
        setTodo("")
    }
    
    

    const handleDelete = (id)=>{
        const delTodo = todos.filter((to) => to.id!== id)
        console.log(delTodo)
        setTodos([...delTodo]); 
    }

    const handleEdit = (id)=>{
        const editTodo = todos.find((edit)=>edit.id === id)
        setTodo(editTodo.todo)
        setEditId(id)
        inputRef.current.focus()

    // const handleComplete = (id)=>{

    // }

    }

    return ( 
        <div className = "App" >
            <div className='app-container'>
                <h1>Todo List App</h1>
                <form className='todoForm'>
                    <input type='text' onChange={(e)=>{
                        setTodo(e.target.value)
                    }}
                    value={todo}
                    ref={inputRef}  /> 
                    <button className='add-btn' onClick={handleClick}>{editId ? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faCirclePlus} /> } </button>                    
                </form>
                <ul className='allTodos'>
                    {
                        todos.map((t)=>(
                            <li className='singleTodo' >
                                <span className='todoText' key={t.id}>{t.todo} </span>
                                <button className='edit-btn' onClick={()=>handleEdit(t.id)}><FontAwesomeIcon icon={faPenToSquare} /> </button>
                                <button className='delete-btn' onClick={()=>handleDelete(t.id)}><FontAwesomeIcon icon={faTrash} /></button>

                            </li>
                        ))
                    }

                    
                </ul>
            </div>


           
        </div> 
    );
}

export default App;