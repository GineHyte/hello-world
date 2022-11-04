const TaskCard = (props) => {
    let todoList = [];
    let id = props.id;
    let taskState, image, color = "";

    if (id>-1){
        todoList = props.todoList;
        image = todoList[id].image;
        color = todoList[id].color;
        taskState = todoList[id].complete? "Completed" : "Not Completed";
    }

    return (
        <div className="column box description-column" style={{backgroundColor: color}} id="description-column">
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={image} alt={`${image} : it is not image `}/>
                    </figure>
                </div>
                <div className="card-content">
                    <p className="title is-4">{id>-1?todoList[id].task:""}</p>
                    <div className="content">
                    {id>-1?todoList[id].description:""}
                    </div>
                </div>
                <div className={`card-footer has-text-weight-bold ${taskState?"has-text-success":"has-text-danger"}`}>{taskState}</div>
            </div>
        </div>
    )
}

export default TaskCard;