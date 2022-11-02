import { useEffect, useState } from "react";

function Modal() {
  const [name,setName]=useState();
  useEffect(() => {
   console.log(todoList)
  },[]);
 

  return (
    <div className="modal-block">
        <div className="modal-content">

        </div>
    </div> 
  )
}

export default Modal;
