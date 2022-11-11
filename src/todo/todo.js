import { useEffect, useState, useRef } from "react";
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
  var [todoList, setTodoList] = useState({});
  const [employeeList, setEmployeeList] = useState({});
  let isQueryDelete = false;
  let isQueryDeleteAll = false;
  let ListToDelete, ElementToDelete, ElementToEdit, ListToEdit;

  const DeleteModal = useRef();
  const nullModal = useRef();
  const EditModal = useRef();


  useEffect(() => {
    const query = ref(db);
    return onValue(query, (snapshot) => {
      let data = snapshot.val();
      if (snapshot.exists()) {
        console.log(data);
        setTodoList(data.todoList);
        console.log(data["todoList"]);
        setEmployeeList(data.employeeList);
      }
    });
  }, []);

  async function updateFullList(todoList) {
    const db = getDatabase();
    await update(ref(db), {
      todoList: todoList
    });
  }

  function chooseEmployee(list, employeeId, taskId) {
    console.log("chooseEmployee", todoList);
    let newTodoList = todoList;
    newTodoList[list][taskId].employeeId = employeeId;
    console.log("newTodoList", newTodoList);
    setTodoList(newTodoList);
    updateFullList(newTodoList);
  }

  function addNewTodo(e) {
    e.preventDefault();
    if (color == null) { setColor("#C8C8C8"); color = "#C8C8C8"; }
    for (let i = 0; i <= 2; i++) e.target.children[i].children[1].value = "";
    e.target.children[3].children[1].value = "#FFFFFF";
    let maxId = -1;
    Object.keys(todoList).forEach((status, indexS) => {
      Object.keys(todoList[status]).forEach((task,indexT) => {
        maxId = Math.max(maxId, task);
      });
    });
    console.log("maxId", maxId);
    const newTodo = { [maxId+1]: { id:maxId+1, task: name, description: description, image: image, color: color, employeeId: " ", comments: [] }};
    setTodoList({ ...todoList, "open" : Object.assign({}, todoList["open"], newTodo) });
    console.log({ ...todoList, "open" : Object.assign({}, todoList["open"], newTodo) });
    updateFullList({ ...todoList, "open" : Object.assign({}, todoList["open"], newTodo) });
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
    setTodoList({});
    updateFullList({todoList: {
      "open": {},
      "in-progress": {},
      "done": {}
    }});
  }

  const deleteElement = (e, taskId, deleteList) => {
    console.log("deleteElement", taskId, deleteList);
    const todoToDelete = todoList[deleteList];
    setTodoList([...todoList.slice(0, deleteList), todoToDelete.filter((task) => task.id !== taskId), ...todoList.slice(deleteList + 1, todoList.length)]);
    updateFullList([...todoList.slice(0, deleteList), todoToDelete.filter((task) => task.id !== taskId), ...todoList.slice(deleteList + 1, todoList.length)]);
  }

  const deleteElementModal = (e, taskId, reason, list) => {
    switch (reason) {
      case "queryAll":
        if (!isQueryDeleteAll) {
          e.preventDefault();
          var modal = DeleteModal.current;
          modal.style.display = "block";
          modal.children[0].children[1].children[0].children[1].children[0].textContent = "do you want to delete all?";
          isQueryDeleteAll = true;
        }
        break;
      case "query":
        if (!isQueryDelete) {
          var modal = DeleteModal.current;
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
          var modal = DeleteModal.current;
          modal.style.display = "none";
          break;
        }
        deleteElement(e, ElementToDelete, ListToDelete);
        var modal = DeleteModal.current;
        modal.style.display = "none";
        isQueryDelete = false;
        break;
      case "Cancel":
        var modal = DeleteModal.current;
        modal.style.display = "none";
        isQueryDelete = false;
        isQueryDeleteAll = false;
        break;
      default: console.log("Something went wrong"); break;
    }
  }

  const editElement = (e, id, list) => {
    console.log(todoList[list][id]);
    var modal = EditModal.current;
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
    closeModal(e, title);
  }

  const saveComment = (e, list, id, comment) => {
    e.preventDefault();
    var modal = nullModal.current;
    modal.style.display = "block";
    console.log("id", id, "list ", list, "comment", comment);
    const todoToEdit = todoList[list];
    console.log("todoToEdit", todoToEdit);
    let oldComments = [];
    for (let i = 0; i < todoToEdit.length; i++) if (todoToEdit[i].id === id) oldComments = todoToEdit[i].comments;
    let objComment = { id: oldComments?.length === 0 ? 1 : oldComments[oldComments.length - 1].id + 1, comment: comment };
    console.log("objComment", objComment);
    // setTodoList([...todoList.slice(0, list),
    // todoToEdit.map((task) => {
    //   if (task.id === id) {
    //     if (task.comments !== undefined) { task.comments.push(objComment); console.log(task) }
    //     else { task = Object.assign(task, { "comments": [] }); console.log(task); task.comments.push(objComment) }
    //   }
    //   else { return task }
    // }),
    // ...todoList.slice(list + 1, todoList.length)]);
    // setTodoList({...todoList, [list]: {{Object.fromEntries(Object.entries(obj).filter((k) => k !== id))}, [id]: {comments: [todoToEdit[id].comments?todoToEdit[id].comments:null, objComment]}}});
    let TempObject = Object.assign({...todoToEdit}, {[id]: {comments: [todoToEdit[id].comments?todoToEdit[id].comments:null, objComment]}});
    console.log("TempObject", TempObject);
    // console.log({...todoList, [list]: {Object.assign([id]: {comments: [todoToEdit[id].comments?todoToEdit[id].comments:null, objComment]}}});
    updateFullList(todoList);
  }
  function onDragEnd(result) {
    if (!result.destination) {
      console.log("destination is null");
      return;
    }
    let sortTodoList = todoList;

    for (let i = 0; i <= 2; i++) if (sortTodoList[i==0?"open":i==1?"in-progress":"done"] === undefined) sortTodoList[i] = [];
    let destList = result.destination.droppableId;
    let sourceList = result.source.droppableId;
    console.log("sortTodoList", sortTodoList);
    console.log("destList", sortTodoList[destList], "sourceList", sortTodoList[sourceList]);

    Object.assign({[destList]:sortTodoList[destList]}, { [result.destination.droppableId]: todoList[sourceList][result.source.index] });
    Object.assign({[sourceList]:sortTodoList[sourceList]}, { [result.source.droppableId]: todoList[destList][result.destination.index] });



    // Object.values(sortTodoList)[destList]?.splice(result.destination.index, 0,
    //   Object.values(sortTodoList)[sourceList].splice(result.source.index, 1)[0]);
    //   Object.values(sortTodoList)[destList][result.destination.index].status = destList;
    console.log("sortTodoList", sortTodoList);
    setTodoList({sortTodoList});
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
      <div className="editModal" id="EditModal" ref={EditModal}><Modal closeModal={closeModal} title={'EditModal'} content={
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
      <div className="deleteModal" id="DeleteModal" ref={DeleteModal}><Modal deleteElementModal={deleteElementModal} closeModal={closeModal} title={'DeleteModal'} content={
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
      <div className="nullModal" id="nullModal" ref={nullModal}><Modal closeModal={closeModal} title={'nullModal'} content={
        <div>
          <header className="modal-card-head">
            <p className="modal-card-title">Info</p>
            <button className="delete" onClick={(e) => closeModal(e, 'nullModal')} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <p>Comment saved!</p>
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
        employeeList={employeeList} chooseEmployee={chooseEmployee} saveComment={saveComment} />
    </div>
  )

}

export default Todo;
