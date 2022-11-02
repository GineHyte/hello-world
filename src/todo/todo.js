import { useEffect, useState } from "react";

function Todo() {
  const [name,setName]=useState();
  const [todoList,setTodoList]=useState([]);
  useEffect(() => {
   console.log(todoList)
  },[]);
  const onClick = ()=>{
    if(name==" "){alert("pls enter the task");return}
      setTodoList([...todoList,name ]);
  }
  const preventReload = (e) =>{e.preventDefault(); e.target[0].value = ""}

  const handleChange = (event)=>{
    setName(event.target.value);
  }

  const deleteList = (event)=>{
    setTodoList([])
  }

  const deleteElement = (e)=>{
    var id = e.target.parentElement.parentElement.textContent[0]-1;
    setTodoList((oldData) => oldData.filter((elem, index) => index !== id));
    
  }

  const editElement = (e) =>{
    var id = e.target.parentElement.parentElement.textContent[0]-1;
    console.log(id)
  }

  return ( 
    <div className="container">

        <form className="input-container" onSubmit={preventReload}>
          <label className="field-label is-normal">Create Task</label>
            <input className="input is-8" type="text" id="name" placeholder="type your task" onChange={handleChange} />
            <input  className="button" type="submit" value="add" onClick={onClick} />   
            <button className="button" onClick={deleteList}>delete list</button>
          
        </form>
        <ul>
        {todoList.map((task, i) => (
            <li key={i}>
              
                <div className="box has-background-success "><span>{i+1}</span>{"- "+task}
                <button className="button is-pulled-right is-danger" onClick={deleteElement}>❌</button>
                <button className="button is-pulled-right is-info" onClick={editElement}>🖊</button>
                </div>
                </li>
        ))}
        
        </ul>
    </div>
  )
}

export default Todo;
