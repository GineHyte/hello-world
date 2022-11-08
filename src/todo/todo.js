import { useEffect, useState } from "react";
import Modal from './modal'
import data from './data.json';
import TaskForm from './task-form';
import TodoList_comp from "./task-comp";
import {db}  from "../config/firebase";
import { onValue, ref } from "firebase/database";
function Todo() {
  const [id, setId] = useState(-1);
  const [color, setColor] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  var [todoList, setTodoList] = useState([]);
  let isQueryDelete = false;
  let isQueryDeleteAll = false;
  let ListToDelete, ElementToDelete, ElementToEdit, ListToEdit;


  useEffect(() => {
    const query = ref(db, "1");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        Object.values(data).map((tasks) => {
          setTodoList((todoL) => [...todoL, tasks]);
        });
      }
    });
  }, []);


  try {
  let sortedTodoList = [[],[],[]];
  todoList.map (task => {
    sortedTodoList[task.status].push(task);
  });
  todoList = sortedTodoList;
  } catch (e) {}

  const addNewTodo = (e) => {
    e.preventDefault();
    for (let i=0; i<=3; i++) e.target.children[i].children[1].value = "";
    const newTodo = { id: todoList[0].length + 1, task: name, status: 0, description: description, image: image, color: color };
    setTodoList([[...todoList[0], newTodo], ...todoList.slice(1)]);
  }

  const handleChange = (event) => {
    if (event.target.value === "" || event.target.value.trim().length === 0) { setName(""); setDescription(""); setImage(""); return }
    var inputType = event.target.id;
    switch (inputType) {
      case "name":
        setName(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      case "image":
        setImage(event.target.value);
        break;
      case "color":
        setColor(event.target.value);
        break;
      default: console.log("something went wrong");
    }
  }

  const deleteList = () => {
    setId(-1);
    try {document.getElementsByClassName("card")[0].style.display = "none";}catch(e){}
    setTodoList([])
  }

  const deleteElement = (e, taskId, deleteList) => {
    const todoToDelete = todoList[deleteList];
    setTodoList([...todoList.slice(0, deleteList), todoToDelete.filter((task) => task.id !== taskId), ...todoList.slice(deleteList+1, todoList.length)]);
  }

  const deleteElementModal = (e, taskId, reason, list) => {
    switch (reason) {
      case "queryAll":
        if (!isQueryDeleteAll) {
          e.preventDefault();
          var modal = document.getElementById("Delete");
          modal.style.display = "block";
          modal.children[0].children[1].children[0].children[1].children[0].textContent = "do you want to delete all?";
          isQueryDeleteAll = true;
        }
        break;
      case "query":
        if (!isQueryDelete) {
          var modal = document.getElementById("Delete");
          modal.style.display = "block";
          modal.children[0].children[1].children[0].children[1].children[0].textContent = "do you want to delete " 
          + String(todoList.map(taskType =>(taskType.map(task=>(task.id===taskId?task.task:""))))).replace(/,/g,"") + "?";
          isQueryDelete = true;
          ListToDelete = list;
          ElementToDelete = taskId;
        }
        break;
      case "Accept":
        if (isQueryDeleteAll) {
          deleteList();
          isQueryDeleteAll = false;
          var modal = document.getElementById("Delete");
          modal.style.display = "none";
          break;
        }
        deleteElement(e, ElementToDelete, ListToDelete);
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
      default: console.log("Something went wrong"); break;
    }
  }

  const editElement = (e, id, list) => {
    console.log(todoList[list][id]);
    var modal = document.getElementById("Edit");
    modal.style.display = "block";
    modal.children[0].children[1].children[0].children[1].children[0].value = todoList[list][id].task;
    ElementToEdit = todoList[list][id].id;
    ListToEdit = list;
  }
  const closeModal = (e, title) => {
    var modal = document.getElementById(title);
    modal.style.display = "none";
  }

  const save = (e, title) => {
    if (ElementToEdit <= -1) { console.log("something went wrong"); return }
    var input = e.target.parentElement.parentElement.children[1].children[0];
    const todoToEdit = todoList[ListToEdit];
    setTodoList([...todoList.slice(0, ElementToEdit), todoToEdit.map((task) => task.id === ElementToEdit?task.task = input.value:task), ...todoList.slice(ElementToEdit+1, todoList.length)]);
    setTodoList([...todoList]);
    closeModal(e, title);
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      console.log("destination is null");
      return;
    }
    let sortTodoList = todoList;
    switch (result.destination.droppableId) {
        case "open":
            sortTodoList[0].splice(result.destination.index, 0, 
              sortTodoList[result.source.droppableId == "open"?0:result.source.droppableId == "in-progress"?1:2].splice(result.source.index, 1)[0]);
            break
        case "in-progress":
            sortTodoList[1].splice(result.destination.index, 0, 
              sortTodoList[result.source.droppableId == "open"?0:result.source.droppableId == "in-progress"?1:2].splice(result.source.index, 1)[0]);
            break
        case "completed":
            sortTodoList[2].splice(result.destination.index, 0, 
                sortTodoList[result.source.droppableId == "open"?0:result.source.droppableId == "in-progress"?1:2].splice(result.source.index, 1)[0]);
            break
        default:
            console.log("Something went wrong in onDragEnd");
    }
    setTodoList([...sortTodoList]);
}
  const showDescription = (e, taskId) => {

    var description = document.getElementById("description-"+taskId);

    if (description.style.display === "none") {
      e.target.parentElement.style.marginBottom = "0px";
      description.style.display = "block";
    }
    else {
      e.target.parentElement.style.marginBottom = "10px";
      description.style.display = "none";
    }
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
            <input type="text" className="input" />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={(e) => save(e, 'Edit')}>Save changes</button>
            <button className="button" onClick={(e) => closeModal(e, 'Edit')}>Cancel</button>
          </footer>
        </div>
      } /></div>
      <div className="delete" id="Delete"><Modal content={
        <div>
          <header className="modal-card-head">
            <p className="modal-card-title is-warning">Warning</p>
            <button className="delete" onClick={(e) => closeModal(e, 'Delete')} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <p>something went wrong</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={(e) => deleteElementModal(e, "-1", "Accept")}>Accept</button>
            <button className="button" onClick={(e) => deleteElementModal(e, "-1", "Cancel")}>Cancel</button>
          </footer>
        </div>
      } /></div>
      <div className="null" id="null"><Modal content={
        <div>
          <header className="modal-card-head">
            <p className="modal-card-title is-warning">Warning</p>
            <button className="delete" onClick={(e) => closeModal(e, 'null')} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <p>please enter a task</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={(e) => closeModal(e, 'null')}>Close</button>
          </footer>
        </div>
      } /></div>
      <TaskForm deleteElementModal={deleteElementModal} handleChange={handleChange} addNewTodo={addNewTodo}/>
          <TodoList_comp 
          onDragEnd={onDragEnd}
          todoList={todoList} showDescription={showDescription} 
          deleteElementModal={deleteElementModal} editElement={editElement}/>
    </div>
  )
}

export default Todo;
