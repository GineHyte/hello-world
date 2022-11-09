import { useEffect, useState } from "react";
import Modal from './modal'
import TaskForm from './task-form';
import TodoList_comp from "./task-comp";
import { db } from "../config/firebase";
import { onValue, ref, set, update } from "firebase/database";
import { getDatabase } from "firebase/database";
function Todo() {
  const [id, setId] = useState(-1);
  var [color, setColor] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  var [todoList, setTodoList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  let isQueryDelete = false;
  let isQueryDeleteAll = false;
  let ListToDelete, ElementToDelete, ElementToEdit, ListToEdit;


  useEffect(() => {
    const query = ref(db);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        console.log("get todoList", data[1]);
        setTodoList(data[1]);
        console.log("get employeeList", data[0]);
        setEmployeeList(data[0]);
      }
    });
  }, []);


  try {
    let sortedTodoList = [[], [], []];
    todoList.map(task => {
      sortedTodoList[task.status].push(task);
    });
    todoList = sortedTodoList;
  } catch (e) { }

  // function checkForSameId(todoList) {
  //   let maxId = -1;
  //   todoList.map((taskList) => (taskList.map((task) => (maxId = Math.max(maxId, task.id)))));
  //   let idList = [];
  //   const checkedTodoList = todoList.map((taskList) => {
  //     taskList.map((task) => {
  //       if (idList.includes(task.id)) {
  //         console.log("id already exists", task.id);
  //         task.id = maxId + 1;
  //         console.log("id was changed on maxId + 1 ", task.id);
  //       }
  //       else{
  //         idList.push(task.id);
  //       }
  //     })
  //   });
  //   setTodoList([...checkedTodoList]);
  // }
  async function writeData(color, description, id, image, status, task) {
    let maxId = -1;
    todoList.map((taskList) => (taskList.map((task) => (maxId = Math.max(maxId, task.id)))));
    console.log("maxId", maxId);
    const db = getDatabase();
    await set(ref(db, "1/" + status + "/" + id), {
      employeeId: 0,
      color: color,
      description: description,
      id: maxId + 1,
      image: image,
      status: status,
      task: task,
    });
  }

  async function updateFullList(todoList) {
    console.log("updateFullList", todoList);
    const db = getDatabase();
    for (let i = 0; i < todoList.length; i++) {
      await update(ref(db, "1"), {
        [i]: todoList[i]
      });
    }
  }

  function chooseEmployee(list, employeeId, taskId) {
    console.log("chooseEmployee", employeeId);
    let newTodoList = todoList;
    newTodoList[list][taskId].employeeId = employeeId;
    console.log("newTodoList", newTodoList[list][taskId]);
    setTodoList([...newTodoList]);
    updateFullList(newTodoList);
  }

  function addNewTodo(e) {
    e.preventDefault();
    document.getElementById("color").value = "#C8C8C8";
    if (color == null) { setColor("#C8C8C8"); color = "#C8C8C8"; }
    for (let i = 0; i <= 2; i++) e.target.children[i].children[1].value = "";
    e.target.children[3].children[1].value = "#FFFFFF";
    const newTodo = { id: todoList[0].length + 1, task: name, status: 0, description: description, image: image, color: color };
    setTodoList([[...todoList[0], newTodo], ...todoList.slice(1)]);
    console.log(todoList[0].length);
    writeData(color, description, todoList[0].length, image, 0, name);
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
    try { document.getElementsByClassName("card")[0].style.display = "none"; } catch (e) { }
    setTodoList([[], [], []]);
    updateFullList([[], [], []]);
  }

  const deleteElement = (e, taskId, deleteList) => {
    const todoToDelete = todoList[deleteList];
    setTodoList([...todoList.slice(0, deleteList), todoToDelete.filter((task) => task.id !== taskId), ...todoList.slice(deleteList + 1, todoList.length)]);
    updateFullList([...todoList.slice(0, deleteList), todoToDelete.filter((task) => task.id !== taskId), ...todoList.slice(deleteList + 1, todoList.length)]);
  }

  const deleteElementModal = (e, taskId, reason, list) => {
    switch (reason) {
      case "queryAll":
        if (!isQueryDeleteAll) {
          e.preventDefault();
          var modal = document.getElementById("DeleteModal");
          modal.style.display = "block";
          modal.children[0].children[1].children[0].children[1].children[0].textContent = "do you want to delete all?";
          isQueryDeleteAll = true;
        }
        break;
      case "query":
        if (!isQueryDelete) {
          var modal = document.getElementById("DeleteModal");
          modal.style.display = "block";
          modal.children[0].children[1].children[0].children[1].children[0].textContent = "do you want to delete "
            + String(todoList.map(taskType => (taskType.map(task => (task.id === taskId ? task.task : ""))))).replace(/,/g, "") + "?";
          isQueryDelete = true;
          ListToDelete = list;
          ElementToDelete = taskId;
        }
        break;
      case "Accept":
        if (isQueryDeleteAll) {
          deleteList();
          isQueryDeleteAll = false;
          var modal = document.getElementById("DeleteModal");
          modal.style.display = "none";
          break;
        }
        deleteElement(e, ElementToDelete, ListToDelete);
        var modal = document.getElementById("DeleteModal");
        modal.style.display = "none";
        isQueryDelete = false;
        break;
      case "Cancel":
        var modal = document.getElementById("DeleteModal");
        modal.style.display = "none";
        isQueryDelete = false;
        isQueryDeleteAll = false;
        break;
      default: console.log("Something went wrong"); break;
    }
  }

  const editElement = (e, id, list) => {
    console.log(todoList[list][id]);
    var modal = document.getElementById("EditModal");
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
    setTodoList([...todoList.slice(0, ElementToEdit), todoToEdit.map((task) => task.id === ElementToEdit ? task.task = input.value : task), ...todoList.slice(ElementToEdit + 1, todoList.length)]);
    setTodoList([...todoList]);
    updateFullList(todoList);
    // updateData(todoList[ListToEdit][ElementToEdit-1].color, 
    //           todoList[ListToEdit][ElementToEdit-1].description, 
    //           todoList[ListToEdit][ElementToEdit-1].id, 
    //           todoList[ListToEdit][ElementToEdit-1].image, 
    //           todoList[ListToEdit][ElementToEdit-1].status, 
    //           todoList[ListToEdit][ElementToEdit-1].task);
    closeModal(e, title);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      console.log("destination is null");
      return;
    }
    let sortTodoList = todoList;
    for (let i = 0; i <= 2; i++) if (!sortTodoList[i]) sortTodoList[i] = [];
    let destList = result.destination.droppableId == "open" ? 0 : result.destination.droppableId == "in-progress" ? 1 : 2
    let sourceList = result.source.droppableId == "open" ? 0 : result.source.droppableId == "in-progress" ? 1 : 2

    sortTodoList[destList]?.splice(result.destination.index, 0,
      sortTodoList[sourceList].splice(result.source.index, 1)[0]);
    sortTodoList[destList][result.destination.index].status = destList;

    setTodoList([...sortTodoList]);
    updateFullList(todoList);
  }

  const showDescription = (e, taskId) => {

    var description = document.getElementById("description-" + taskId);

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
      <div className="editModal" id="EditModal"><Modal closeModal={closeModal} title={'EditModal'} content={
        <div>
          <header className="modal-card-head">
            <p className="modal-card-title">Edit</p>
            <button className="delete" onClick={(e) => closeModal(e, 'EditModal')} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <input type="text" className="input" />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={(e) => save(e, 'EditModal')}>Save changes</button>
            <button className="button" onClick={(e) => closeModal(e, 'EditModal')}>Cancel</button>
          </footer>
        </div>
      } /></div>
      <div className="deleteModal" id="DeleteModal"><Modal deleteElementModal={deleteElementModal} closeModal={closeModal} title={'DeleteModal'} content={
        <div>
          <header className="modal-card-head">
            <p className="modal-card-title is-warning">Warning</p>
            <button className="delete" onClick={(e) => deleteElementModal(e, "-1", "Cancel")} aria-label="close"></button>
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
      <div className="nullModal" id="nullModal"><Modal closeModal={closeModal} title={'nullModal'} content={
        <div>
          <header className="modal-card-head">
            <p className="modal-card-title is-warning">Warning</p>
            <button className="delete" onClick={(e) => closeModal(e, 'nullModal')} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <p>please enter a task</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={(e) => closeModal(e, 'nullModal')}>Close</button>
          </footer>
        </div>
      } /></div>
      <TaskForm deleteElementModal={deleteElementModal} handleChange={handleChange} addNewTodo={addNewTodo} />
      <TodoList_comp
        onDragEnd={onDragEnd}
        todoList={todoList} showDescription={showDescription}
        deleteElementModal={deleteElementModal} editElement={editElement}
        employeeList={employeeList} chooseEmployee={chooseEmployee} />
    </div>
  )

}

export default Todo;
