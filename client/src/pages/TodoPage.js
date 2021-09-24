import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Todo from '../components/Todo';
import '../style/Todo.css';

const TodoPage = () => {

  const user = useSelector((state) => state.user);
  const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);
  const [day, setDay] = useState(0);
  const [className, addClass] = useState('');
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [change, setChange] = useState(true);
  

  const onChange = (e) => {
    const {target: {value}} = e;
    setTodo(value)
  }
  
  useEffect(()=>{
    const dateInteval = setInterval(()=>{
      const time = new Date();
      setMonth(time.getMonth())
      setDate(time.getDate())
      setDay(time.getDay())
    },500)
    return () => clearInterval(dateInteval)
  }, [])

  useEffect( ()=>{
    if(user.userData && user.userData.isAuth){
      axios.get(`/togedule/todos/read/${user.userData._id}`)
      .then(res => {
        if(res.data.ok) {
          setTodos(res.data.todos)
        }
      })
    }
  }, [user, change])

  const saveTodo = (e) => {
    e.preventDefault();
    
    const body = {
      writer: user.userData._id,
      todo,
    }

    axios.post('/togedule/todos/write', body)
    .then(res => {
      if(res.data.ok){
        setTodo('');
        setChange(!change)
      }
    })
  }

  return (
    <main>
      <section id="todo">
        <h2>
          {month+1 < 10 ? `0${month+1}` : month+1
          }.{date <10 ? `0${date}` : date
          }.{dayList[day]}
        </h2>
        <form onSubmit={saveTodo} action="">
          <input
            spellCheck="false"
            className={className}
            onChange={onChange}
            onFocus={()=>addClass('center')} 
            onBlur={()=>addClass('')}
            placeholder='오늘 할 일이 있나요?'type="text" value={todo} />
        </form>
        <div className="todoList">
          <ul>
            {
              todos.map(todo => {
                // console.log(todo)
                return (
                <Todo 
                  todo={todo}
                  change={change}
                  setChange={setChange}
                  key={todo._id} 
                />)
              })
            }
          </ul>
        </div>
      </section>
    </main>
  )
                
}

export default TodoPage;