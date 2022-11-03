function Modal(props) {
    return (
        <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
        {props.content}
        </div>
        </div>
    )
}

export default Modal;
