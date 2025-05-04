import { saveContent } from "./utils/localStorage.js"
import { hideEmptyBackground } from "./utils/utils.js"

class ItemController {
    selectors = {
        modalMenu: '[data-js-modal-menu]',
        createTaskButton: '[data-js-modal-menu-apply]',
        taskNameInput: '[data-js-modal-menu-input]',
        ulOfTasks: '[data-js-ul-list]',
        taskItem: '[data-js-task-item]',
        taskTitle: '[data-js-title-of-item]',
        emptyBackground: '[data-js-empty]',
        editButton: '[data-js-edit-task]',
        trashButton: '[data-js-delete-task]',
        checkbox: '[data-js-task-checkbox]',
    }

    stateClasses = {
        isActive: 'is-active',
        hidden: 'hidden',
        removing: 'removing',
    }

    constructor() {
        this.emptyBackgroundElement = document.querySelector(this.selectors.emptyBackground)
        this.ulOfTasksElement = document.querySelector(this.selectors.ulOfTasks)

        this.modalMenuElement = document.querySelector(this.selectors.modalMenu)
        this.taskNameInputElement = this.modalMenuElement.querySelector(this.selectors.taskNameInput)

        // Сохраняем значение редактируемой цели, ставим null по умолчанию
        this.currentEditingTask = null

        this.bindEvents()
    }

    //создаём общую функцию контроллер, для удалени и добавления
    onClickHandler = (event) => {

        // Сохраняем ближайшие кнопки редактирования и удаления
        const targetEdit = event.target.closest(this.selectors.editButton)
        const targetTrash = event.target.closest(this.selectors.trashButton)


        if (targetEdit) {
            const editItemElement = targetEdit.closest(this.selectors.taskItem)
            if (editItemElement) {
                const editTitleElement = editItemElement.querySelector(this.selectors.taskTitle)
                this.modalMenuElement.classList.add(this.stateClasses.isActive)
                this.taskNameInputElement.value = editTitleElement.textContent
                // Заменяем значение редактируемой цели, сохраняем елемент таргета.
                this.currentEditingTask = editItemElement
                saveContent()
            }
        }
        if (targetTrash) {
            const taskItemElement = targetTrash.closest(this.selectors.taskItem)
            if (taskItemElement) {
                taskItemElement.classList.add(this.stateClasses.removing)

                setTimeout(() => {
                    taskItemElement.remove()
                    console.log('Task deleted')
                    saveContent()

                    hideEmptyBackground(this.ulOfTasksElement, this.emptyBackgroundElement, this.stateClasses.hidden)
                }, 200)
            }
        }

    }
    onCheckboxHandler = (event) => {
        const checkbox = event.target.closest(this.selectors.checkbox)
        if (checkbox) {
            saveContent()
        }
    }

    // Создаем геттер и который будет возвращать наше редактируемое значение 
    get currentEditingTaskValue() {
        return this.currentEditingTask;
    }

    bindEvents() {
        this.ulOfTasksElement.addEventListener('click', this.onClickHandler)
        this.ulOfTasksElement.addEventListener('change', this.onCheckboxHandler)
    }
}

export default ItemController