import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const TaskCard = (props) => {
    let todoList = [];
    let id = props.id;
    let index = props.index;
    let taskStatus, image, color, employee = "";
    let isDropDownMenu = false;

    const employeeChooserMenu = (id) => {
        let menu = document.getElementById("employeeChooserMenu" + id);
        if (!isDropDownMenu) {
            menu.style.display = "block";
            isDropDownMenu = true;
        } else {
            menu.style.display = "none";
             isDropDownMenu = false; }
    }

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
                        <p className="title is-4">{employee.name}</p>
                        <p className="subtitle is-6">{employee.jobTitle}</p>
                        <p className="subtitle is-6">{employee.email}</p>
                        <p className="subtitle is-6">{employee.phone}</p>
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
                                        <a className="dropdown-item" onClick={() => {employeeChooserMenu(id);props.chooseEmployee(props.list, employee.id, index)}}>{employee.name}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    {/* <div >
                        <a className='dropdown-item' onClick={()=>props.chooseEmployee(props.list, employee.id, id)}>Test</a>
                    </div> */}
                    </div>
                </div>
                <p className="title is-4">{id > -1 ? todoList[index].task : ""}</p>
                <div className="content">
                    {index > -1 ? todoList[index].description : ""}
                </div>
            </div>
            <div className={`card-footer task-status has-text-weight-bold ${taskStatus == 0 ? "has-text-warning" : taskStatus == 1 ? "has-text-info" : "has-text-success"}`}>
                {taskStatus == 0 ? "Open" : taskStatus == 1 ? "In progress" : "Done"}</div>
        </div>
    )
}

export default TaskCard;