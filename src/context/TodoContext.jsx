import { createContext, useState,useEffect } from "react";


export const TodoContext = createContext();

function TodoProvider ( {children}) {
   const [todos, setTodos] = useState(() => {
      // Load from localStorage on initial render
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    });
   useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    

   const addTodo = (text) => {
      if(text.trim() === "") return;

      const newTodo = {
        id: Date.now(),
        text,
        completed: false

      } ;

      setTodos( (prev) => [...prev,newTodo]);
   }

   const deleteTodo = (id) => {
      setTodos( (prev) => prev.filter( todo => todo.id !== id))
   }

   const toggleCompleted = (id) => {
      setTodos( (prev) => prev.map( todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
   }

   const editTodo = (id,newText) => {
     setTodos( (prev) => prev.map( todo => todo.id === id ? {...todo, text:newText}: todo))
   }

   const value = {
    todos,
    setTodos,
    addTodo,
    deleteTodo,
    toggleCompleted,
    editTodo
   };

   return <TodoContext.Provider value={value}>
      {children}
   </TodoContext.Provider>
}

export default TodoProvider;