function Modal(props) {
    const closeModal = (e) =>{
        var modal = e.target.parentElement.parentElement.parentElement;
        console.log(modal);
        modal.className = "modal";
    }

    const save = (e, title) =>{
        closeModal(e, title);
        console.log("save");
    }

    return (
        <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
            <p className="modal-card-title">{props.title}</p>
            <button className="delete" onClick={closeModal} aria-label="close"></button>
            </header>
            <section className="modal-card-body">
                {props.children}
            </section>
            <footer className="modal-card-foot">
            <button className="button is-success" onClick={(e)=>save(e,props.title)}>Save changes</button>
            <button className="button" onClick={closeModal}>Cancel</button>
            </footer>
        </div>
        </div>
    )
}

export default Modal;
