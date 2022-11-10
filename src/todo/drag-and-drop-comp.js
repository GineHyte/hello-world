import { useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./task-card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

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
                    {props.todoList?.map((task, index) => (
                        <Draggable key={task.task+task.id} draggableId={task.task+task.id} index={index}>
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
                                        <button className="button is-pulled-right is-info" onClick={(e) => props.showDescription(e, task.id)}>
                                            <FontAwesomeIcon icon={icon({name: 'info', style: 'solid'})} /> 
                                        </button>
                                        <button className="button is-pulled-right is-danger" onClick={(e) => props.deleteElementModal(e, task.id, "query", props.list)}>
                                            <FontAwesomeIcon icon={icon({name: 'trash', style: 'solid'})} /> 
                                        </button>
                                        <button className="button is-pulled-right is-link" onClick={(e) => props.editElement(e, index, props.list)}>
                                            <FontAwesomeIcon icon={icon({name: 'pen-to-square', style: 'solid'})} /> 
                                        </button>
                                        <div className="progress-status is-pulled-right is-info">
                                            <img src={props.image} />
                                        </div>
                                    </div>
                                    <TaskCard id={task.id} index={index} todoList={props.todoList} 
                                    chooseEmployee={props.chooseEmployee} employeeList={props.employeeList}
                                    list={props.list}/>
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