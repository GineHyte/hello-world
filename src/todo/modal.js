function Modal(children, title) {
    const closeModal = () =>{
        var modal = document.getElementById("modal");
        modal.className = "modal";
    }

    return (
        <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
            <!-- Content ... -->
            </section>
            <footer class="modal-card-foot">
            <button class="button is-success">Save changes</button>
            <button class="button">Cancel</button>
            </footer>
        </div>
        </div>
    )
}

export default Modal;
