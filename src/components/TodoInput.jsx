
import React from 'react'
import { useContext,useState } from 'react';
import { TodoContext } from '../context/TodoContext';

const TodoInput = () => {
    const [text,setText] = useState("");
    const {addTodo,todos} = useContext(TodoContext);
    console.log("printing todos...",todos);
  
    const handleClick = (e) => {
       e.preventDefault();
       addTodo(text);
       setText("");
    }
  
    return (
  
  
      <>
        <div className='flex'>
           <input
           type="text"
           value={text}
           placeholder = "Enter a task"
           className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
           onChange={ (e)=> setText(e.target.value)}
           onKeyDown = {
            (e)=>{
                if(e.key ==='Enter'){
                    handleClick(e);
                }
            }
           }
           />
  
           <button className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
            onClick={handleClick}>Add</button>
        </div>
      </>
    )
}

export default TodoInput;