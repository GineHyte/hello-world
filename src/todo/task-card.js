import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useEffect, useRef } from 'react';
import Modal from './modal';

const TaskCard = (props) => {
    let todoList = [];
    let id = props.id;
    let index = props.index;
    let taskStatus, image, color, employee = "";
    let isDropDownMenu = false;

    const commentButtons = useRef();
    const commentInputs = useRef();
    const employeeChooserMenuElement = useRef();

    if (index > -1) {
        todoList = props.todoList;
        image = todoList[index].image;
        color = todoList[index].color;
        taskStatus = todoList[index].status;
        for (let i = 0; i < props.employeeList.length; i++) {
            if (props.employeeList[i].id === todoList[index].employeeId) {
                employee = props.employeeList[i];
            }
        }
    }

    const commentBtn = (e) => {
        if (e.target.value !== "") { commentButtons.current.style.display = "flex"; }
        else { commentButtons.current.style.display = "none"; }
    }

    const employeeChooserMenu = (id) => {
        let menu = employeeChooserMenuElement.current;
        if (!isDropDownMenu) {
            menu.style.display = "block";
            isDropDownMenu = true;
        } else {
            menu.style.display = "none";
            isDropDownMenu = false;
        }
    }

    return (
        <div className="card" id={"description-" + id} style={{ backgroundColor: color }}>
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={image} alt={`${image} : it is not image `} />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4" style={{ color: props.wc_hex_is_light(todoList[index].color) ? "#000000" : "#FFFFFF" }}>{employee?.name}</p>
                        <p className="subtitle is-6" style={{ color: props.wc_hex_is_light(todoList[index].color) ? "#000000" : "#FFFFFF" }}>{employee?.jobTitle}</p>
                        <p className="subtitle is-6" style={{ color: props.wc_hex_is_light(todoList[index].color) ? "#000000" : "#FFFFFF" }}>{employee?.email}</p>
                        <p className="subtitle is-6" style={{ color: props.wc_hex_is_light(todoList[index].color) ? "#000000" : "#FFFFFF" }}>{employee?.phone}</p>
                    </div>
                    <div>
                        <div className="dropdown is-active">
                            <div className="dropdown-trigger">
                                <div className='drop-down-btn'>
                                    <button className="button has-background-info" onClick={employeeChooserMenu}>
                                        <FontAwesomeIcon icon={icon({ name: 'caret-down', style: 'solid' })} />
                                    </button>
                                </div>
                            </div>
                            <div className="dropdown-menu" role="menu" ref={employeeChooserMenuElement}>
                                {Object.values(props.employeeList).map((employee) => (
                                    <div key={employee.id} className="dropdown-content">
                                        <a className="dropdown-item" onClick={() => { employeeChooserMenu(); props.chooseEmployee(props.list, employee.id, index) }}>{employee.name}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <p className="title is-4" style={{ color: props.wc_hex_is_light(todoList[index].color) ? "#000000" : "#FFFFFF" }}>{id > -1 ? todoList[index].task : ""}</p>
                <div className="content" style={{ color: props.wc_hex_is_light(todoList[index].color) ? "#000000" : "#FFFFFF" }}>
                    {index > -1 ? todoList[index].description : ""}
                </div>
                <form onSubmit={(e) => {
                    props.saveComment(e, props.list, id, commentInputs.current.value);
                    commentInputs.current.value = "";
                    commentButtons.current.style.display = "none";
                }}>
                    <div className="control">
                        {todoList[index].comments?.map((comment) => (
                            <input key={"comment" + id + comment.id} value={comment.comment} className="input comments-inputs" type="text" readOnly />
                        ))}
                        <input className="input" ref={commentInputs} type="text" onChange={(e) => commentBtn(e)} placeholder="type your comment" required />
                    </div>
                    <div className='comment-buttons' ref={commentButtons}>
                        <button type="submit" className='button is-success'>save</button>
                        <button type="button" className='button is-danger'
                            onClick={() => {
                                commentInputs.current.value = "";
                                commentButtons.current.style.display = "none";
                            }}>cancel</button>
                    </div>
                </form>
            </div>
            <div className={`card-footer task-status has-text-weight-bold ${taskStatus == 0 ? "has-text-warning" : taskStatus == 1 ? "has-text-info" : "has-text-success"}`}>
                {taskStatus == 0 ? "Open" : taskStatus == 1 ? "In progress" : "Done"}</div>
        </div>
    )
}

export default TaskCard;