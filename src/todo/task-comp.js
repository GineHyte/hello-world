import openStatus from '../images/open-status.svg';
import inProgressStatus from '../images/in-progress-status.svg';
import completedStatus from '../images/completed-status.svg';


const TodoList_comp = (props) => {
    return(
        <div className="columns">
            <div className="column box has-background-info" id="open">
            <p className="title is-4">Open</p>
            {props.todoList[0].map((task, index) => (
                <li key={index}>
                <div className="box" style={{backgroundColor: task.color}}><span>{index + 1 + " - " + task.task}</span>         
                    <button className="button is-pulled-right is-info" onClick={(e) => props.showDescription(e, index)}>❔</button>
                    <button className="button is-pulled-right is-danger" onClick={(e) => props.deleteElementModal(e, index, "query")}>❌</button>
                    <button className="button is-pulled-right is-link" onClick={(e) => props.editElement(e, index)}>🖊</button>
                    <div className="progress-status is-pulled-right is-info" onClick={() => props.updateData(index, task.status)}>
                        <img src={openStatus}/>
                    </div>
                </div>
                </li>
            ))}
            </div>
            <div className="column box has-background-warning" id="in-progress">
            <p className="title is-4">In progress</p>
            {props.todoList[1].map((task, index) => (
                <li key={index}>
                <div className="box" style={{backgroundColor: task.color}}><span>{index + 1 + " - " + task.task}</span>         
                    <button className="button is-pulled-right is-info" onClick={(e) => props.showDescription(e, index)}>❔</button>
                    <button className="button is-pulled-right is-danger" onClick={(e) => props.deleteElementModal(e, index, "query")}>❌</button>
                    <button className="button is-pulled-right is-link" onClick={(e) => props.editElement(e, index)}>🖊</button>
                    <div className="progress-status is-pulled-right is-info" onClick={() => props.updateData(index, task.status)}>
                        <img src={inProgressStatus}/>
                    </div>
                </div>
                </li>
            ))}
            </div>
            <div className="column  box has-background-success" id="done">
            <p className="title is-4">Done</p>
            {props.todoList[2].map((task, index) => (
                <li key={index}>
                <div className="box" style={{backgroundColor: task.color}}><span>{index + 1 + " - " + task.task}</span>         
                    <button className="button is-pulled-right is-info" onClick={(e) => props.showDescription(e, index)}>❔</button>
                    <button className="button is-pulled-right is-danger" onClick={(e) => props.deleteElementModal(e, index, "query")}>❌</button>
                    <button className="button is-pulled-right is-link" onClick={(e) => props.editElement(e, index)}>🖊</button>
                    <div className="progress-status is-pulled-right is-info" onClick={() => props.updateData(index, task.status)}>
                        <img src={completedStatus}/>
                    </div>
                </div>
                </li>
            ))}
            </div>
        </div>
    )
  }

  export default TodoList_comp;