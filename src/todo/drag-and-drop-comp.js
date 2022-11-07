import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DnDComp = (todoList=[]) => {
console.log(todoList.todoList);
    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
      
        background: isDragging ? "lightgreen" : "grey",
      
        ...draggableStyle
      });
      return (
        todoList.todoList[0].map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                    )}
                >
                    <div className="box" style={{backgroundColor: task.color}}><span>{index + 1 + " - " + task.task}</span>         
                        {/* <button className="button is-pulled-right is-info" onClick={(e) => props.showDescription(e, props.index)}>❔</button>
                        <button className="button is-pulled-right is-danger" onClick={(e) => props.deleteElementModal(e, props.index, "query")}>❌</button>
                        <button className="button is-pulled-right is-link" onClick={(e) => props.editElement(e, props.index)}>🖊</button>
                        <div className="progress-status is-pulled-right is-info" onClick={() => props.updateData(props.index, props.task.status)}>
                            <img src={props.image}/>
                        </div> */}
                    </div>
                </div>
            )}
        </Draggable>
        ))
      )

}

export default DnDComp;