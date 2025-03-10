import { useState, useEffect } from 'react'
import { Navbar } from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const saveToLS = (params) => { 
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
     setshowfinished(!showfinished)
    }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
     });
     setTodos(newTodos)
     saveToLS()
  }
  const handleDelete = (e, id) => {
    console.log(`the id is ${id}`)
    let index = todos.findIndex(item=>{
      return item.id === id
     })
     let newTodos = todos.filter(item=>{
      return item.id !== id
     });
     setTodos(newTodos)
     saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, iscCompleted:false}])
    setTodo("")
    saveToLS()
  }
  const handleChange= (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox= (e) => {
   let id = e.target.name;
   let index = todos.findIndex(item=>{
    return item.id === id
   })
   let newTodos = [...todos];
   newTodos[index].iscCompleted = !newTodos[index].iscCompleted;
   setTodos(newTodos)
   saveToLS()
  }

  return (
    <>
    <Navbar/>
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2 ">
      <h1 className='font-bold text-center text-3xl '>iTask - Manage your Todo</h1>
      <div className="addTodo my-5 flex flex-col gap-3">
        <h2 className='text-2xl font-bold '>Add a Todo</h2>
        <div className="flex">
        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
        <button onClick = {handleAdd} disabled={todo.length<3} className='bg-violet-800 hover:bg-violet-900 p-3 mx-2 py-2 text-white font-bold disabled:bg-violet-700 rounded-full'>Add</button>
        </div>
      </div>
      <input className='my-4' onChange={toggleFinished} type="checkbox" id='show' checked={showfinished} /> <label className='mx-2' htmlFor="show">Show Finished</label> 
      <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
        {todos.length===0 && <div>No Todos to Display</div> }
        {todos.map(item=>{
         return (showfinished || !item.iscCompleted) && <div key={item.id} className="todo flex my-3 justify-between ">
         <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscCompleted} />
          <div className={item.iscCompleted?"line-through":""}>{item.todo}</div>
          <div className="buttons flex h-full">
          <button onClick={(e)=>{handleEdit(e, item.id)}}className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-white font-bold rounded-md mx-1 '><FaEdit /></button>
          <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-white font-bold rounded-md mx-1 '><MdDelete /></button>
          </div>
          </div>
          })}
        </div>
      </div>
    
    </>
  )
}

export default App
