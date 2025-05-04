import { saveContent } from "./utils/localStorage.js"
import { hideEmptyBackground } from "./utils/utils.js"

class itemState {
    selectors = {
        select: '[data-js-select]',
        ulOfTasks: '[data-js-ul-list]',
        emptyBackground: '[data-js-empty]',
        taskItem: '[data-js-task-item]',
        checkbox: '[data-js-task-checkbox]',
    }
    stateClasses = {
        complete: 'complete',
        hidden: 'hidden',
    }

    constructor() {
        this.selectElement = document.querySelector(this.selectors.select)
        this.tasksListElement = document.querySelector(this.selectors.ulOfTasks)
        this.emptyBackgroundElement = document.querySelector(this.selectors.emptyBackground)
        this.bindEvents()

        if (!this.selectElement || !this.tasksListElement || !this.emptyBackgroundElement) {
            console.error('Required elements not found. Check your selectors.');
            return;
        }
    }

    selectValue = () => {
        const hidden = this.stateClasses.hidden

        const taskItems = this.tasksListElement.querySelectorAll(this.selectors.taskItem)
        const selectData = this.selectElement.value

        taskItems.forEach((taskItem) => {

            const checkbox = taskItem.querySelector(this.selectors.checkbox)
            const isChecked = checkbox.checked

            if (selectData === 'Complete' && !isChecked) {
                taskItem.classList.add(hidden)
            } else if (selectData === 'Incomplete' && isChecked) {
                taskItem.classList.add(hidden)
            } else {
                taskItem.classList.remove(hidden)
            }
        })
    }

    checkboxState = (event) => {
        const checkbox = event.target.closest(this.selectors.checkbox)

        if (checkbox) {
            const taskItemElement = checkbox.closest(this.selectors.taskItem)
            const title = taskItemElement.querySelector('[data-js-title-of-item]')
            const checkboxData = checkbox.checked
            console.log(checkboxData)

            if (checkboxData) {
                title.classList.add(this.stateClasses.complete)
                checkbox.classList.add(this.stateClasses.complete)
            } else {
                title.classList.remove(this.stateClasses.complete)
                checkbox.classList.remove(this.stateClasses.complete)
            }
            saveContent()
        }
    }

    bindEvents() {
        this.selectElement.addEventListener('change', this.selectValue)
        this.tasksListElement.addEventListener('change', this.checkboxState)
    }
}

export default itemState