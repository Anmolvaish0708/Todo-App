import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import { TodoContext } from '../context/TodoContext'

const TodoItem = ({todo}) => {
  const {todos,deleteTodo,toggleCompleted,editTodo} = useContext(TodoContext);
  const [isEditable,setIsEditable] = useState(false);
  const [newText,setNewText] = useState(todo.text);

  return (
    <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
    }`}>
        <input
        type="checkbox"
        checked={todo.completed}
        className="cursor-pointer"
        onChange={() => toggleCompleted(todo.id)}
        />

       <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              readOnly={!isEditable}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isEditable) {
                  editTodo(todo.id, newText);
                  setIsEditable(false);
                }
              }}
          />

       <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isEditable) {
                      editTodo(todo.id,newText);
                      setIsEditable(false);
                  } else setIsEditable(true);
              }}
              disabled={todo.completed}
          >
              {isEditable ? "📁" : "✏️"}
          </button>

     <button  className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
         ❌
      </button>
    </div>
  )
}

export default TodoItem