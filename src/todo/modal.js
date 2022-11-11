function Modal(props) {
    return (
        <div className="modal is-active">
            <div className="modal-background"
                onClick={props.title === "DeleteModal" ? (e) => props.deleteElementModal(e, "-1", "Cancel") : (e) => props.closeModal(e, props.title)}></div>
            <div className="modal-card">
                {props.content}
            </div>
        </div>
    )
}

export default Modal;
