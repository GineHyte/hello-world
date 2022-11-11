import { useEffect, useRef } from "react";

const TaskFrom = (props) => {
  const color = useRef();

  useEffect(() => {
    color.current.value = "#C8C8C8";
  }, []);

  return (
    <div className='formContainer'>
      <form className="input-container" onSubmit={props.addNewTodo}>
        <div className="input-box">
          <label className="label is-normal is-pulled-left">Task</label>
          <input className="input" type="text" id="name" placeholder="type your task here" onChange={props.handleChange} required />
        </div>
        <div className="input-box">
          <label className="label is-normal is-pulled-left">Task descrition</label>
          <input className="input" type="text" id="description" placeholder="type the descrition of task here" onChange={props.handleChange} required />
        </div>
        <div className="input-box">
          <label className="label is-normal is-pulled-left">Image</label>
          <input className="input" type="text" id="image" placeholder="paste the url of image here" onChange={props.handleChange} required />
        </div>
        <div className="input-box">
          <label className="label is-normal is-pulled-left">Color</label>
          <input className="input" type="color" id="color" ref={color} onChange={props.handleChange} required />
        </div>
        <button className="button is-success" type="submit">add</button>
        <button className="button is-danger is-pulled-right" onClick={(e) => props.deleteElementModal(e, '-1', "queryAll")}>delete list</button>
      </form>
    </div>
  );
};

export default TaskFrom;