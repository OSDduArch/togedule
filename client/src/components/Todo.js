import axios from 'axios';
import React, { useState } from 'react'

const Todo = ( { todo, change, setChange } ) => {
  const [isDone, setIsDone] = useState(todo.isDone);
  
  function deleteTodo() {
    if(window.confirm('삭제하시겠습니까?')){
      axios.delete(`/togedule/todos/delete/${todo._id}`)
      .then(res => {
        if(res.data.ok){
          setChange(!change);
        }
      })
    }
  }

  function setState() {
    const body = {_id: todo._id, isDone: !isDone};
    axios.put('/togedule/todos/done', body)
    .then(res=>{
      if(res.data.ok){
        setChange(!change);
        setIsDone(!isDone);
      }
    })
  }

  return (
    <li className={isDone ? 'done' : ''}>
      <span>{todo.todo}</span>
      <div className="handleTodo">
      <input type="checkbox" onChange={setState} checked={isDone}/>
      <button onClick={deleteTodo}>
        ❌
      </button>
    </div>
    </li>
  )
}

export default Todo
