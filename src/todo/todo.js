import { useEffect, useState } from "react";
import Modal from './modal'
import data from './data.json';

function Todo() {
  const [name,setName]=useState();
  const [todoList,setTodoList]=useState(data);
  var isQueryDelete=false;
  var isQueryDeleteAll=false;
  var deleteIndex=-1;

  useEffect(() => {
  },[]);


  const updateData = (state,taskId)=>{
    for (let i = 0; i < todoList.length; i++) {
      todoList[i].id = i+1;
    }
    taskId = taskId+1;
    const todoChecked = todoList.map(obj => {
      if (obj.id === taskId) {
        return {...obj, complete: state};
      }
      return obj;
    });
    setTodoList(todoChecked);
    for (let i = 0; i < todoList.length-1; i++) {
      document.querySelector('ul').children[i].children[0].children[3].checked = todoList[i].complete;
      if(todoList[i].complete===true && todoList[i+1].complete===false){var joint = i;} 
      if(todoList[i].complete===false && todoList[i+1].complete===true){var joint = i;}
    }
    if (!state){
        document.querySelector('ul').children[joint+1].children[0].children[3].checked = false}
    else{document.querySelector('ul').children[joint].children[0].children[3].checked = true}
  }

  const onClick = (e)=>{
    if(e.target.parentElement.children[1].value === "" ||
     e.target.parentElement.children[1].value.trim().length === 0){
      setName("");
      var modal = document.getElementById("null");
      modal.style.display = "block";
      return}
      for (let i = 0; i < todoList.length-1; i++) {
        document.querySelector('ul').children[i].children[0].children[3].checked = todoList[i].complete;
        if(todoList[i].complete===true && todoList[i+1].complete===false){var joint = i;} 
        if(todoList[i].complete===false && todoList[i+1].complete===true){var joint = i;}
      }
      var state = false;
      if (!state){
        document.querySelector('ul').children[joint+1].children[0].children[3].checked = false}
      else{document.querySelector('ul').children[joint].children[0].children[3].checked = true}
      const newTodo = {id:todoList.length+1,task:name,complete:false};
      setTodoList([...todoList,newTodo]);
  }
  const preventReload = (e) =>{e.preventDefault(); e.target[0].value = ""}

  const handleChange = (event)=>{
    if(event.target.value === "" || event.target.value.trim().length === 0){setName(""); return}
    setName(event.target.value);
  }

  const deleteList = ()=>{
    setTodoList([])
  }

  const deleteElement = (e,taskId)=>{
    for (let i = 0; i < todoList.length; i++) todoList[i].id = i+1
    setTodoList((oldData) => oldData.filter((elem, index) => index !== taskId));
    for (let i = 0; i < todoList.length-1; i++) {
      document.querySelector('ul').children[i].children[0].children[3].checked = todoList[i].complete;
      if(todoList[i].complete===true && todoList[i+1].complete===false){var joint = i;} 
      if(todoList[i].complete===false && todoList[i+1].complete===true){var joint = i;}
    }
    var state = true;
    if (!state){
      document.querySelector('ul').children[joint+1].children[0].children[3].checked = false}
    else{document.querySelector('ul').children[joint].children[0].children[3].checked = true}
  }

  const deleteElementModal = (e,taskId, reason)=>{
    switch (reason) {
      case "queryAll":
        if(!isQueryDeleteAll){
          var modal = document.getElementById("Delete");
          modal.style.display = "block";
          modal.children[0].children[1].children[0].children[1].children[0].textContent = "do you want to delete all?";
          isQueryDeleteAll = true;
        }
        break;
      case "query":
        if(!isQueryDelete){
          var modal = document.getElementById("Delete");
          modal.style.display = "block";
          modal.children[0].children[1].children[0].children[1].children[0].textContent = "do you want to delete " + todoList[taskId].task + "?";
          isQueryDelete = true;
          deleteIndex = taskId;
        }
        break;
      case "Accept":
        if(isQueryDeleteAll){
          deleteList();
          isQueryDeleteAll = false;
          var modal = document.getElementById("Delete");
          modal.style.display = "none";
          break;
        }
        deleteElement(e,deleteIndex);
        var modal = document.getElementById("Delete");
        modal.style.display = "none";
        isQueryDelete = false;
        break;
      case "Cancel":
        var modal = document.getElementById("Delete");
        modal.style.display = "none";
        isQueryDelete = false;
        isQueryDeleteAll = false;
        break;
      default:console.log("Something went wrong");break;
    }
  }

  const editElement = (e, id) =>{
    for (let i = 0; i < todoList.length; i++) {
      todoList[i].id = i+1;
    }
    setTodoList([...todoList]);
    var modal = document.getElementById("Edit");
    modal.style.display = "block";
    modal.children[0].children[1].children[0].children[1].children[0].value = todoList[id].task;
    var btn = modal.children[0].children[1].children[0].children[2].children[0];
    btn.style.setProperty('--id', id);
  }
  const closeModal = (e, title) =>{
    var modal = document.getElementById(title);
    modal.style.display = "none";
  }

  const save = (e, title, id) =>{
    id = parseInt(id)+1;
    if (id <= -1) {console.log("something went wrong");return}
    var input = e.target.parentElement.parentElement.children[1].children[0];
    for (let c of todoList){ if (c.id === id) {c.task = input.value;}}
    setTodoList([...todoList]);
    closeModal(e, title);
  }

  const sort = (e) =>{
    todoList.sort((a, b) => (a.complete > b.complete) ? 1 : -1); 

  }

  sort();
  return ( 
    <div className="block">
      <div className="edit" id="Edit"><Modal content={
        <div>
          <header className="modal-card-head">
            <p className="modal-card-title">Edit</p>
            <button className="delete" onClick={closeModal} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <input type="text" className="input"/>
          </section>
          <footer className="modal-card-foot">
          {/* onClick={(e)=>save(e,'Edit', getComputedStyle(this.target).getPropertyValue('--id'))} */}
            <button className="button is-success" onClick={(e)=>save(e, 'Edit', getComputedStyle(e.target).getPropertyValue('--id'))}>Save changes</button>
            <button className="button" onClick={(e)=>closeModal(e,'Edit')}>Cancel</button>
          </footer>
        </div>
    }/></div>
      <div className="delete" id="Delete"><Modal content={
        <div>
          <header className="modal-card-head">
            <p className="modal-card-title is-warning">Warning</p>
            <button className="delete" onClick={(e)=>closeModal(e,'Delete')} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
          <p>something went wrong</p>
          </section>
            <footer className="modal-card-foot">
            <button className="button is-success" onClick={(e)=>deleteElementModal(e, "-1", "Accept")}>Accept</button>
            <button className="button" onClick={(e)=>deleteElementModal(e, "-1", "Cancel")}>Cancel</button>
            </footer>
          </div>
      }/></div>
      <div className="null" id="null"><Modal content={
        <div>
          <header className="modal-card-head">
            <p className="modal-card-title is-warning">Warning</p>
            <button className="delete" onClick={(e)=>closeModal(e,'null')} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
          <p>please enter a task</p>
          </section>
            <footer className="modal-card-foot">
            <button className="button" onClick={(e)=>closeModal(e,'null')}>Close</button>
            </footer>
          </div>
      }/></div>
        <form className="input-container" onSubmit={preventReload}>
          <label className="field-label is-normal">Create Task</label>
            <input className="input is-8" type="text" id="name" placeholder="type your task" onChange={handleChange} />
            <input  className="button" type="submit" value="add" onClick={onClick} />   
            <button className="button" onClick={(e)=>deleteElementModal(e, '-1', "queryAll")}>delete list</button>
          
        </form>
        <ul>
        {todoList.map((task, index) => (
            <li key={index}>
                <div className= {`box ${task.complete?"has-background-warning is-line-through":"has-background-success"} `}><span>{index+1}</span>{"- "+task.task}
                <button className="button is-pulled-right is-danger" onClick={(e)=>deleteElementModal(e,index, "query")}>❌</button>
                <button className="button is-pulled-right is-info" onClick={(e)=>editElement(e, index)}>🖊</button>
                <input type="checkbox" className="checkbox is-pulled-right is-info" onClick={(e)=>updateData(e.target.checked,index)} defaultChecked={task.complete}  required/>
                </div>
                </li>
        ))}    
        </ul>
    </div>
  )
}

export default Todo;
