const TaskCard = (props) => {
    let todoList = [];
    let id = props.id;
    let index = props.index;
    let taskStatus, image, color = "";  

    if (index>-1){
        todoList = props.todoList;
        image = todoList[index].image;
        color = todoList[index].color;
        taskStatus = todoList[index].status;
    }

    return (
        <div className="card" id={"description-" + id} style={{backgroundColor:color}}>
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={image} alt={`${image} : it is not image `}/>
                </figure>
            </div>
            <div className="card-content">
                <p className="title is-4">{id>-1?todoList[index].task:""}</p>
                <div className="content">
                {index>-1?todoList[index].description:""}
                </div>
            </div>
            <div className={`card-footer task-status has-text-weight-bold ${taskStatus == 0?"has-text-warning":taskStatus==1?"has-text-info":"has-text-success"}`}>
            {taskStatus == 0?"Open":taskStatus==1?"In progress":"Done"}</div>
        </div>
    )
}

export default TaskCard;