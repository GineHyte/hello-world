import { useEffect, useState } from "react";
// import Modal from './todo/modal'
import data from './data.json';

function Todo() {
  const [name,setName]=useState();
  const [todoList,setTodoList]=useState(data);

  useEffect(() => {
  },[]);


  const updateData = (e,taskId)=>{
    taskId = taskId+1;
    const todoChecked = todoList.map(obj => {
      if (obj.id === taskId) {
        return {...obj, complete: e.target.checked};
      }

      return obj;
    });

    setTodoList(todoChecked);
   
      }

  const onClick = ()=>{
    if(name==" " || name == "" || name.search("  ") > -1){alert("pls enter the task");return}
      const newTodo = {id:todoList.length+1,task:name,complete:false};
      setTodoList([...todoList,newTodo]);
  }
  const preventReload = (e) =>{e.preventDefault(); e.target[0].value = ""}

  const handleChange = (event)=>{
    setName(event.target.value);
  }

  const deleteList = (event)=>{
    setTodoList([])
  }

  const deleteElement = (e,taskId)=>{
    setTodoList((oldData) => oldData.filter((elem, index) => index !== taskId));
    
  }

  const editElement = (e) =>{
    var id = e.target.parentElement.parentElement.textContent[0]-1;
  }

  return ( 
    <div className="block">
      {/* <Modal children={<p>123</p>} closeModal={true} title={'123'}/> */}
        <form className="input-container" onSubmit={preventReload}>
          <label className="field-label is-normal">Create Task</label>
            <input className="input is-8" type="text" id="name" placeholder="type your task" onChange={handleChange} />
            <input  className="button" type="submit" value="add" onClick={onClick} />   
            <button className="button" onClick={deleteList}>delete list</button>
          
        </form>
        <ul>
        {todoList.map((task, index) => (
            <li key={index}>
                <div className= {`box ${task.complete?"has-background-warning":"has-background-success"}`}><span>{task.id}</span>{"- "+task.task}
                <button className="button is-pulled-right is-danger" onClick={(e)=>deleteElement(e,index)}>❌</button>
                <button className="button is-pulled-right is-info" onClick={editElement}>🖊</button>
                <input type="checkbox" className="checkbox is-pulled-right is-info" onChange={(e)=>updateData(e,index)} defaultChecked={task.complete}/>
                </div>
                </li>
        ))}    
        </ul>
    </div>
  )
}

export default Todo;
