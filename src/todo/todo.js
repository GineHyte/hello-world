import { useEffect, useState } from "react";
import Modal from './modal'
import data from './data.json';

function Todo() {
  const [name,setName]=useState();
  const [todoList,setTodoList]=useState(data);

  useEffect(() => {
  },[]);


  const updateData = (e,taskId)=>{
    for (let i = 0; i < todoList.length; i++) {
      todoList[i].id = i+1;
    }
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
    if(name===" " || name === "" || name.search("  ") > -1){alert("pls enter the task");return}
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
    for (let i = 0; i < todoList.length; i++) {
      todoList[i].id = i+1;
    }
    setTodoList((oldData) => oldData.filter((elem, index) => index !== taskId));
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
    for (let c of todoList){ if (c.id == id) {c.task = input.value;}}
    setTodoList([...todoList]);
    closeModal(e, title);
  }


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
          <p>do you want to delete that?</p>
          </section>
            <footer className="modal-card-foot">
            <button className="button is-success" onClick={(e)=>closeModal(e,'Delete')}>Save changes</button>
            <button className="button" onClick={(e)=>closeModal(e,'Delete')}>Cancel</button>
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
            <button className="button is-success" onClick={(e)=>closeModal(e,'null')}>Save changes</button>
            <button className="button" onClick={(e)=>closeModal(e,'null')}>Cancel</button>
            </footer>
          </div>
      }/></div>
        <form className="input-container" onSubmit={preventReload}>
          <label className="field-label is-normal">Create Task</label>
            <input className="input is-8" type="text" id="name" placeholder="type your task" onChange={handleChange} />
            <input  className="button" type="submit" value="add" onClick={onClick} />   
            <button className="button" onClick={deleteList}>delete list</button>
          
        </form>
        <ul>
        {todoList.map((task, index) => (
            <li key={index}>
                <div className= {`box ${task.complete?"has-background-warning":"has-background-success"}`}><span>{index+1}</span>{"- "+task.task}
                <button className="button is-pulled-right is-danger" onClick={(e)=>deleteElement(e,index)}>❌</button>
                <button className="button is-pulled-right is-info" onClick={(e)=>editElement(e, index)}>🖊</button>
                <input type="checkbox" className="checkbox is-pulled-right is-info" onChange={(e)=>updateData(e,index)} defaultChecked={task.complete}/>
                </div>
                </li>
        ))}    
        </ul>
    </div>
  )
}

export default Todo;
