import openStatus from '../images/open-status.svg';
import inProgressStatus from '../images/in-progress-status.svg';
import completedStatus from '../images/completed-status.svg';
import DnDComp from './drag-and-drop-comp';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const TodoList_comp = (props) => {

    return(
        <div className="columns">
            <div className="column box has-background-info" id="open">
            <p className="title is-4">Open</p>
                <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={props.getListStyle(snapshot.isDraggingOver)}
                    >
                     
                            <DnDComp todoList={props.todoList} 
                            showDescription={props.showDescription} deleteElementModal={props.deleteElementModal} 
                            editElement={props.editElement} updateData={props.updateData} image={openStatus}/>
                        
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </div>
            {/* <div className="column box has-background-warning" id="in-progress">
            <p className="title is-4">In progress</p>
            {props.todoList[1].map((task, index) => (
                <DnDComp task={task} index={index} 
                showDescription={props.showDescription} deleteElementModal={props.deleteElementModal} 
                editElement={props.editElement} updateData={props.updateData} image={inProgressStatus}/>
            ))}
            </div>
            <div className="column  box has-background-success" id="done">
            <p className="title is-4">Done</p>
            {props.todoList[2].map((task, index) => (
                <DnDComp getItemStyle={props.getItemStyle} task={task} index={index} 
                showDescription={props.showDescription} deleteElementModal={props.deleteElementModal} 
                editElement={props.editElement} image={completedStatus}/>
            ))}
            </div> */}
        </div>
    )
  }

  export default TodoList_comp;