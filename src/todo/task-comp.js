import openStatus from '../images/open-status.svg';
import inProgressStatus from '../images/in-progress-status.svg';
import completedStatus from '../images/completed-status.svg';
import DnDComp from './drag-and-drop-comp';
import { DragDropContext} from "react-beautiful-dnd";

const TodoList_comp = (props) => {

    return (
        <DragDropContext onDragEnd={props.onDragEnd}>
            <div className="columns">
                <div className='column box has-background-warning'>
                <DnDComp todoList={props.todoList[0]}
                    showDescription={props.showDescription} deleteElementModal={props.deleteElementModal}
                    editElement={props.editElement} updateData={props.updateData} image={openStatus}
                    droppableId={'open'}/>
                </div>
                <div className='column box has-background-info'>
                <DnDComp todoList={props.todoList[1]}
                    showDescription={props.showDescription} deleteElementModal={props.deleteElementModal}
                    editElement={props.editElement} updateData={props.updateData} image={inProgressStatus}
                    droppableId={'in-progress'}/>
                </div>
                <div className='column box has-background-success'>
                <DnDComp todoList={props.todoList[2]}
                    showDescription={props.showDescription} deleteElementModal={props.deleteElementModal}
                    editElement={props.editElement} updateData={props.updateData} image={completedStatus}
                    droppableId={'completed'}/>
                </div>
            </div>
        </DragDropContext>
    )
}

export default TodoList_comp;