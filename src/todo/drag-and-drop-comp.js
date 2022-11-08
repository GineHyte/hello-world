import { useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./task-card";

const DnDComp = (props) => {
    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        ...draggableStyle
    });
    return (
        <Droppable droppableId={props.droppableId}>
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {props.todoList.map((task, index) => (
                        <Draggable key={task.task} draggableId={task.task} index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}>
                                    <div className="box" style={{ backgroundColor: task.color }}><span>{index + 1 + " - " + task.task}</span>
                                        <button className="button is-pulled-right is-info" onClick={(e) => props.showDescription(e, task.id)}>❔</button>
                                        <button className="button is-pulled-right is-danger" onClick={(e) => props.deleteElementModal(e, index, "query")}>❌</button>
                                        <button className="button is-pulled-right is-link" onClick={(e) => props.editElement(e, index)}>🖊</button>
                                        <div className="progress-status is-pulled-right is-info">
                                            <img src={props.image} />
                                        </div>
                                    </div>
                                    <TaskCard id={task.id} index={index} todoList={props.todoList} />
                                </div>
                            )}

                        </Draggable>
                    ))
                    }
                    {provided.placeholder}
                </div>
            )}
        </Droppable>

    );
}


export default DnDComp;