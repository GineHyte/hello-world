import { useEffect, useState } from "react";
import Modal from './modal'
import data from './data.json';
import TaskForm from './task-form';
import TodoList_comp from "./task-comp";

function Todo() {
  const [id, setId] = useState(-1);
  const [color, setColor] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  var [todoList, setTodoList] = useState(data);
  var isQueryDelete = false;
  var isQueryDeleteAll = false;
  var deleteIndex = -1;

  useEffect(() => {
  }, []);


  try {
  let sortedTodoList = [[],[],[]];
  todoList.map (task => {
    sortedTodoList[task.status].push(task);
  });
  todoList = sortedTodoList;
  } catch (e) {console.log("try to sort todoList failed")}

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: isDragging ? "lightgreen" : "grey",
  
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  });

  const onClick = (e) => {
    var k = 0;
    e.preventDefault();
    for (let i = 0; i <= 2; i++)e.target[i].value = ""
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].complete) { k++ } else { k-- }
    }
    if (Math.abs(k) === todoList.length || Math.abs(k) === todoList.length) { k = -1 } else { k = 1 }
    if (k > -1 && todoList.length > 0) {
      for (let i = 0; i < todoList.length; i++) {
        if ((todoList[i].complete === true && todoList[i + 1].complete === false) || (todoList[i].complete === false && todoList[i + 1].complete === true)) { var joint = i; break }
      }
      for (let i = 0; i < todoList.length; i++) {
        document.querySelector('ul').children[0].children[0].children[i].children[0].children[4].checked = todoList[i].complete;
      }
      var state = false;
      if (!state) {
        document.querySelector('ul').children[0].children[0].children[joint + 1].children[0].children[4].checked = false
      }
      else { document.querySelector('ul').children[0].children[0].children[joint].children[0].children[4].checked = true }
    }
    const newTodo = { id: todoList.length + 1, task: name, complete: false, description: description, image: image, color: color };
    console.log(newTodo);
    setTodoList([...todoList, newTodo]);
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
    document.getElementById("description-column").style.display = "none";
    setTodoList([])
  }

  const deleteElement = (e, taskId) => {
    var k = 0;

    for (let i = 0; i < todoList.length; i++) todoList[i].id = i + 1
    setTodoList((oldData) => oldData.filter((elem, index) => index !== taskId));
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].complete) { k++ } else { k-- }
    }
    if (Math.abs(k) === todoList.length) { k = -1 } else { k = 1 }
    if (k > -1) {
      for (let i = 0; i < todoList.length; i++) {
        if ((todoList[i].complete === true && todoList[i + 1].complete === false) || (todoList[i].complete === false && todoList[i + 1].complete === true)) { var joint = i; break }
      }
      for (let i = 0; i < todoList.length; i++) {
        document.querySelector('ul').children[0].children[0].children[i].children[0].children[4].checked = todoList[i].complete;
      }
      var state = true;
      if (!state) {
        document.querySelector('ul').children[0].children[0].children[joint + 1].children[0].children[4].checked = false
      }
      else { document.querySelector('ul').children[0].children[0].children[joint].children[0].children[4].checked = true }
    }
  }

  const deleteElementModal = (e, taskId, reason) => {
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
          modal.children[0].children[1].children[0].children[1].children[0].textContent = "do you want to delete " + todoList[taskId].task + "?";
          isQueryDelete = true;
          deleteIndex = taskId;
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
        deleteElement(e, deleteIndex);
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

  const editElement = (e, id) => {
    for (let i = 0; i < todoList.length; i++) {
      todoList[i].id = i + 1;
    }
    setTodoList([...todoList]);
    var modal = document.getElementById("Edit");
    modal.style.display = "block";
    modal.children[0].children[1].children[0].children[1].children[0].value = todoList[id].task;
    var btn = modal.children[0].children[1].children[0].children[2].children[0];
    btn.style.setProperty('--id', id);
  }
  const closeModal = (e, title) => {
    var modal = document.getElementById(title);
    modal.style.display = "none";
  }

  const save = (e, title, id) => {
    id = parseInt(id) + 1;
    if (id <= -1) { console.log("something went wrong"); return }
    var input = e.target.parentElement.parentElement.children[1].children[0];
    for (let c of todoList) { if (c.id === id) { c.task = input.value; } }
    setTodoList([...todoList]);
    closeModal(e, title);
    document.querySelector('ul').children[0].children[0].children[id - 1].children[0].children[1].click();
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
            {/* onClick={(e)=>save(e,'Edit', getComputedStyle(this.target).getPropertyValue('--id'))} */}
            <button className="button is-success" onClick={(e) => save(e, 'Edit', getComputedStyle(e.target).getPropertyValue('--id'))}>Save changes</button>
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
      <TaskForm deleteElementModal={deleteElementModal} handleChange={handleChange} onClick={onClick}/>
          <TodoList_comp 
          onDragEnd={onDragEnd}
          todoList={todoList} showDescription={showDescription} 
          deleteElementModal={deleteElementModal} editElement={editElement} getListStyle={getItemStyle} getItemStyle={getItemStyle}/>
    </div>
  )
}

export default Todo;
