import openStatus from '../images/open-status.svg';
import inProgressStatus from '../images/in-progress-status.svg';
import doneStatus from '../images/completed-status.svg';
import DnDComp from './drag-and-drop-comp';
import { DragDropContext } from "react-beautiful-dnd";

const TodoList_comp = (props) => {
    if(props.todoList)if(Object.keys(props.todoList).length === 0) {console.log("no tasks");return <div className="box">No tasks</div>}else{
        let openArray = Object.values(Object.values(props.todoList)[2]);
        let inProgressArray = Object.values(Object.values(props.todoList)[1]);
        let doneArray = Object.values(Object.values(props.todoList)[0]);
        return (
            <DragDropContext onDragEnd={props.onDragEnd}>
                <div className="columns">
                    <div className='column box has-background-warning'>
                        <p className='title is-4'>Open</p>
                        <DnDComp todoList={openArray}
                            showDescription={props.showDescription} deleteElementModal={props.deleteElementModal}
                            editElement={props.editElement} updateData={props.updateData} image={openStatus}
                            droppableId={'open'} list={"open"} employeeList={props.employeeList}
                            chooseEmployee={props.chooseEmployee} saveComment={props.saveComment} />
                    </div>
                    <div className='column box has-background-info'>
                        <p className='title is-4'>In progress</p>
                        <DnDComp todoList={inProgressArray}
                            showDescription={props.showDescription} deleteElementModal={props.deleteElementModal}
                            editElement={props.editElement} updateData={props.updateData} image={inProgressStatus}
                            droppableId={'in-progress'} list={'in-progress'} employeeList={props.employeeList}
                            chooseEmployee={props.chooseEmployee} saveComment={props.saveComment} />
                    </div>
                    <div className='column box has-background-success'>
                        <p className='title is-4'>Success</p>
                        <DnDComp todoList={doneArray}
                            showDescription={props.showDescription} deleteElementModal={props.deleteElementModal}
                            editElement={props.editElement} updateData={props.updateData} image={doneStatus}
                            droppableId={'done'} list={'done'} employeeList={props.employeeList}
                            chooseEmployee={props.chooseEmployee} saveComment={props.saveComment} />
                    </div>
                </div>
            </DragDropContext>
        )
    }
}



export default TodoList_comp;