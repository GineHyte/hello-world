import { useEffect, useState } from "react";
import Modal from './modal'
import data from './data.json';

function Todo() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [todoList, setTodoList] = useState(data);
  var isQueryDelete = false;
  var isQueryDeleteAll = false;
  var deleteIndex = -1;
  var k = 0;
  var joint = -1;
  try{
    if (document.getElementById("description-column").style.display !== "none" || document.getElementById("description-column").style.display !== ""){
  if (Math.abs(k) === todoList.length) { k = -1 } else { k = 1 }
  if (k > -1) {
    for (let i = 0; i < todoList.length; i++) {
      if ((todoList[i].complete === true && todoList[i + 1].complete === false) || (todoList[i].complete === false && todoList[i + 1].complete === true)) { joint=i; break }
    }
    for (let i = 0; i < todoList.length; i++) {
      document.querySelector('ul').children[0].children[0].children[i].children[0].children[4].checked = todoList[i].complete;
    }
  }
  var showedDescription = joint+1;}
} catch (e) {console.log("unable to get joint")}

  useEffect(() => {
  }, []);


  const updateData = (state, taskId) => {
    var k = 0;
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].complete) { k++ } else { k-- }
      todoList[i].id = i + 1;
    }
    if (Math.abs(k) === todoList.length) { k = -1 } else { k = 1 }
    taskId = taskId + 1;
    const todoChecked = todoList.map(obj => {
      if (obj.id === taskId) {
        return { ...obj, complete: state };
      }
      return obj;
    });
    setTodoList(todoChecked);
    if (k > -1) {
      for (let i = 0; i < todoList.length; i++) {
        if ((todoList[i].complete === true && todoList[i + 1].complete === false) || (todoList[i].complete === false && todoList[i + 1].complete === true)) { var joint = i; break }
      }
      for (let i = 0; i < todoList.length; i++) {
        document.querySelector('ul').children[0].children[0].children[i].children[0].children[4].checked = todoList[i].complete;
      }
      if (!state) {
        document.querySelector('ul').children[0].children[0].children[joint + 1].children[0].children[4].checked = false
      }
      else { document.querySelector('ul').children[0].children[0].children[joint].children[0].children[4].checked = true }
    }
    if (showedDescription === "")document.querySelector('ul').children[0].children[0].children[taskId].children[0].children[1].click();
    if (showedDescription === (taskId-1) || showedDescription === (taskId)) {
      var description = document.getElementById('description-column');
      showedDescription = joint+1;
      if (state) {
        description.children[0].children[2].textContent = "Completed";
        description.children[0].children[2].classList.replace("has-text-danger", "has-text-success");
      }
      else {
        description.children[0].children[2].textContent = "Not Completed";
        description.children[0].children[2].classList.replace("has-text-success", "has-text-danger");
      }
    }
  }

  const onClick = (e) => {
    var k = 0;
    for (let i = 0; i <= 2; i++) {
      if (e.target.parentElement.children[i].children[1].value === "" ||
        e.target.parentElement.children[i].children[1].value.trim().length === 0) {
        var modal = document.getElementById("null");
        if (i == 0) { setDescription(""); modal.children[0].children[1].children[0].children[1].children[0].textContent = "please enter the task name" }
        if (i == 1) { setDescription(""); modal.children[0].children[1].children[0].children[1].children[0].textContent = "please enter the task description" }
        if (i == 2) { setImage(""); modal.children[0].children[1].children[0].children[1].children[0].textContent = "please enter url of the task image" }
        modal.style.display = "block";
        return
      }
    }
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
    const newTodo = { id: todoList.length + 1, task: name, complete: false, description: description, image: image };
    console.log(newTodo);
    setTodoList([...todoList, newTodo]);
  }

  const preventReload = (e) => { e.preventDefault(); for (let i = 0; i <= 2; i++)e.target[i].value = "" }

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
    }
  }

  const deleteList = () => {
    document.getElementById("description-column").style.display = "none";
    setTodoList([])
  }

  const deleteElement = (e, taskId) => {
    var k = 0;
    if (taskId === showedDescription) { document.getElementById("description-column").style.display = "none"; console.log("description:" + showedDescription); }
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
    document.querySelector('ul').children[0].children[0].children[id-1].children[0].children[1].click();
  }

  const sort = (e) => {
    todoList.sort((a, b) => (a.complete > b.complete) ? 1 : -1);

  }

  const showDescription = (e, id) => {
    showedDescription = id;

    var description = document.getElementById("description-column");
    description.style.display = "block";

    description.children[0].children[1].children[0].textContent = todoList[id].task;
    description.children[0].children[1].children[1].textContent = todoList[id].description;
    description.children[0].children[0].children[0].children[0].src = todoList[id].image;
    description.children[0].children[0].children[0].children[0].alt = todoList[id].image + " - its not a link ಠ_ಠ";

    if (todoList[id].complete) {
      description.children[0].children[2].textContent = "Completed";
      description.children[0].children[2].classList.replace("has-text-danger", "has-text-success");
    }
    else {
      description.children[0].children[2].textContent = "Not Completed";
      description.children[0].children[2].classList.replace("has-text-success", "has-text-danger");
    }
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
      <form className="input-container" onSubmit={preventReload}>
        <div className="input-box">
          <label className="label is-normal is-pulled-left">Task</label>
          <input className="input" type="text" id="name" placeholder="type your task here" onChange={handleChange} />
        </div>
        <div className="input-box">
          <label className="label is-normal is-pulled-left">Task descrition</label>
          <input className="input" type="text" id="description" placeholder="type the descrition of task here" onChange={handleChange} />
        </div>
        <div className="input-box">
          <label className="label is-normal is-pulled-left">Image</label>
          <input className="input" type="text" id="image" placeholder="paste the url of image here" onChange={handleChange} />
        </div>
        <input className="button is-success" type="submit" value="add" onClick={onClick} />
        <button className="button is-danger" onClick={(e) => deleteElementModal(e, '-1', "queryAll")}>delete list</button>

        {/* Todo: 3 lines inputs then save and close btn   */}
      </form>
      <ul>
        <div className="columns">
          <div className="column">
            {todoList.map((task, index) => (
              <li key={index}>
                <div className={` box ${task.complete ? "has-background-warning is-line-through" : "has-background-success"} `}><span>{index + 1}</span>{"- " + task.task}
                  <button className="button is-pulled-right is-info" onClick={(e) => showDescription(e, index)}>❔</button>
                  <button className="button is-pulled-right is-danger" onClick={(e) => deleteElementModal(e, index, "query")}>❌</button>
                  <button className="button is-pulled-right is-link" onClick={(e) => editElement(e, index)}>🖊</button>
                  <input type="checkbox" className="checkbox is-pulled-right is-info" onClick={(e) => updateData(e.target.checked, index)} defaultChecked={task.complete} required />
                </div>
              </li>
            ))}
          </div>
          <div className="column box has-background-info description-column" id="description-column">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src="https://www.modernbathroom.com/blog/image.axd?picture=/7-5-18.jpg" alt="data" />
                </figure>
              </div>
              <div className="card-content">
                <p className="title is-4">Give dog a bath</p>
                <div className="content">
                  Give dog a bath and brush his teeth
                </div>
              </div>
              <div className="card-footer has-text-weight-bold has-text-success">Complete</div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  )
}

export default Todo;
