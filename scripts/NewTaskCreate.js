import { hideEmptyBackground } from "./utils/utils.js"
import ItemController from "./ItemController.js"

class NewTaskCreate {
    selectors = {
        emptyBackground: '[data-js-empty]',
        createTaskButton: '[data-js-modal-menu-apply]',
        modalMenu: '[data-js-modal-menu]',
        taskNameInput: '[data-js-modal-menu-input]',
        ulOfTasks: '[data-js-ul-list]',
        taskTitle: '[data-js-title-of-item]',
        trashButton: '[data-js-delete-task]',
    }

    stateClasses = {
        isActive: 'is-active',
        hidden: 'hidden',
    }

    // saveInStorage() {

    // }

    // loadTasksFromStorage() {

    // }

    constructor() {
        // Создаем экземпляр класса ItemController
        this.itemController = new ItemController()

        //Modal Menu & Children
        this.modalMenuElement = document.querySelector(this.selectors.modalMenu)
        this.createTaskButtonElement = this.modalMenuElement.querySelector(this.selectors.createTaskButton)
        this.taskNameInputElement = this.modalMenuElement.querySelector(this.selectors.taskNameInput)

        //List Of Tasks & Children
        this.ulOfTasksElement = document.querySelector(this.selectors.ulOfTasks)
        this.trashButtonElement = this.ulOfTasksElement.querySelector(this.selectors.trashButton)

        //Background field, when list is empty
        this.emptyBackgroundElement = document.querySelector(this.selectors.emptyBackground)

        this.bindEvents()
    }

    onClickAllow = () => {
        const taskName = this.taskNameInputElement.value.trim()

        if (taskName.length === 0) {
            console.log("Task Name cannot be empty")
            return
        }

        const currentEditingTask = this.itemController.currentEditingTaskValue

        if (currentEditingTask) {
            const taskTitleElement = currentEditingTask.querySelector(this.selectors.taskTitle)
            console.log(currentEditingTask)
            taskTitleElement.textContent = taskName

            this.itemController.currentEditingTask = null
            this.taskNameInputElement.value = ''
            this.modalMenuElement.classList.remove(this.stateClasses.isActive)
        }
        else {
            const taskItemElement = document.createElement('li')
            taskItemElement.className = 'todo-task__item task-value'
            taskItemElement.setAttribute('data-js-task-item', '')


            taskItemElement.innerHTML = `
            <form action="" class="task-value__form">
            <input type="checkbox" class="task-value__input checkbox">
            <h2 class="task-value__title" data-js-title-of-item>${taskName}</h2>
            </form>
            <div class="task-value__option">
            <button class="task-value__button option-buttons option-buttons--edit" data-js-edit-task>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
            d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736"
            stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </button>
            <button class="task-value__button option-buttons option-buttons--trash" data-js-delete-task>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
            d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z"
            stroke="#CDCDCD" />
            <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round" />
            <path
            d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z"
            stroke="#CDCDCD" />
            <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" />
            <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" />
            </svg>
            </button>
            </div>
            `

            this.ulOfTasksElement.appendChild(taskItemElement)
            this.taskNameInputElement.value = ''
            this.modalMenuElement.classList.remove(this.stateClasses.isActive);
            hideEmptyBackground(this.ulOfTasksElement, this.emptyBackgroundElement, this.stateClasses.hidden)
        }
    }

    bindEvents() {
        this.createTaskButtonElement.addEventListener('click', this.onClickAllow)
    }
}

export default NewTaskCreate