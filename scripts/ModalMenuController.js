class ModalMenuController {
    selectors = {
        modalMenu: '[data-js-modal-menu]',
        openModalMenuButton: '[data-js-create-task-button]',
        taskNameInput: '[data-js-modal-menu-input]',
        closeModalMenuButton: '[data-js-modal-menu-close]',
    }
    stateClasses = {
        isActive: 'is-active',
    }

    constructor() {
        this.taskNameInputElement = document.querySelector(this.selectors.taskNameInput)
        this.modalMenuElement = document.querySelector(this.selectors.modalMenu)
        this.openModalMenuButtonElement = document.querySelector(this.selectors.openModalMenuButton)
        this.closeModalMenuButtonElement = this.modalMenuElement.querySelector(this.selectors.closeModalMenuButton)
        this.bindEvents()
    }

    onClickOpen = () => {
        this.modalMenuElement.classList.add(this.stateClasses.isActive)
    }

    onClickClose = (event) => {
        if (this.modalMenuElement.classList.contains(this.stateClasses.isActive)) {
            if (
                event.code === 'Escape' ||
                event.target === this.closeModalMenuButtonElement ||
                event.target === this.modalMenuElement
            ) {
                this.modalMenuElement.classList.remove(this.stateClasses.isActive);
            }
        }
    }

    bindEvents() {
        this.openModalMenuButtonElement.addEventListener('click', this.onClickOpen);
        this.closeModalMenuButtonElement.addEventListener('click', this.onClickClose);
        this.modalMenuElement.addEventListener('click', this.onClickClose);
        window.addEventListener('keydown', this.onClickClose);
    }
}

export default ModalMenuController