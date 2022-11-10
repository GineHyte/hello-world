import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useEffect } from 'react';
import Modal from './modal';

const TaskCard = (props) => {
    let todoList = [];
    let id = props.id;
    let index = props.index;
    let taskStatus, image, color, employee = "";
    let isDropDownMenu = false;

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
        if (e.target.value !== "") { document.getElementById("comment-buttons" + id).style.display = "flex"; }
        else { document.getElementById("comment-buttons" + id).style.display = "none"; }
    }

    const employeeChooserMenu = (id) => {
        let menu = document.getElementById("employeeChooserMenu" + id);
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
            <div className="nullModal" id="nullModal"><Modal closeModal={props.closeModal} title={'nullModal'} content={
                <div>
                <header className="modal-card-head">
                    <p className="modal-card-title">Info</p>
                    <button className="delete" onClick={(e) => props.closeModal(e, 'nullModal')} aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <p>Comment saved!</p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button" onClick={(e) => props.closeModal(e, 'nullModal')}>Close</button>
                </footer>
                </div>
            } /></div>
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={image} alt={`${image} : it is not image `} />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4" style={{color: props.wc_hex_is_light(todoList[index].color)?"#000000":"#FFFFFF"}}>{employee?.name}</p>
                        <p className="subtitle is-6" style={{color: props.wc_hex_is_light(todoList[index].color)?"#000000":"#FFFFFF"}}>{employee?.jobTitle}</p>
                        <p className="subtitle is-6" style={{color: props.wc_hex_is_light(todoList[index].color)?"#000000":"#FFFFFF"}}>{employee?.email}</p>
                        <p className="subtitle is-6" style={{color: props.wc_hex_is_light(todoList[index].color)?"#000000":"#FFFFFF"}}>{employee?.phone}</p>
                    </div>
                    <div>
                        <div className="dropdown is-active">
                            <div className="dropdown-trigger">
                                <div className='drop-down-btn'>
                                    <button className="button has-background-info" onClick={() => employeeChooserMenu(id)}>
                                        <FontAwesomeIcon icon={icon({ name: 'caret-down', style: 'solid' })} />
                                    </button>
                                </div>
                            </div>
                            <div className="dropdown-menu" role="menu" id={'employeeChooserMenu' + id}>
                                {props.employeeList.map((employee) => (
                                    <div key={employee.id} className="dropdown-content">
                                        <a className="dropdown-item" onClick={() => { employeeChooserMenu(id); props.chooseEmployee(props.list, employee.id, index) }}>{employee.name}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div >
                        <a className='dropdown-item' onClick={()=>props.chooseEmployee(props.list, employee.id, id)}>Test</a>
                    </div> */}
                    </div>
                </div>
                <p className="title is-4" style={{color: props.wc_hex_is_light(todoList[index].color)?"#000000":"#FFFFFF"}}>{id > -1 ? todoList[index].task : ""}</p>
                <div className="content" style={{color: props.wc_hex_is_light(todoList[index].color)?"#000000":"#FFFFFF"}}>
                    {index > -1 ? todoList[index].description : ""}
                </div>
                <form onSubmit={(e) => props.saveComment(e, props.list, id, document.getElementById("comment-input" + id).value)}>
                    <div className="control">
                        {todoList[index].comments?.map((comment) => (
                            <input key={"comment" + id + comment.id} value={comment.comment} className="input comments-inputs" type="text" readOnly/>
                        ))}
                        <input className="input" id={"comment-input" + id} type="text" onChange={(e) => commentBtn(e)} placeholder="type your comment" required/>
                    </div>
                    <div className='comment-buttons' id={"comment-buttons" + id}>
                        <button type="submit" className='button is-success'>save</button>
                        <button type="button" className='button is-danger'
                            onClick={() => {
                                document.getElementById("comment-input" + id).value = "";
                                document.getElementById("comment-buttons").style.display = "none";
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