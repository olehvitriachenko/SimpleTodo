import { saveContent } from "./utils/localStorage.js"

class itemState {
    selectors = {
        searchInput: '[data-js-search-input]',
        select: '[data-js-select]',
        ulOfTasks: '[data-js-ul-list]',
        emptyBackground: '[data-js-empty]',
        taskItem: '[data-js-task-item]',
        checkbox: '[data-js-task-checkbox]',
        title: '[data-js-title-of-item]'
    }
    stateClasses = {
        complete: 'complete',
        hidden: 'hidden',
    }

    constructor() {
        this.selectElement = document.querySelector(this.selectors.select)
        this.tasksListElement = document.querySelector(this.selectors.ulOfTasks)
        this.emptyBackgroundElement = document.querySelector(this.selectors.emptyBackground)
        this.searchInputElement = document.querySelector(this.selectors.searchInput)

        this.bindEvents()
    }

    onSearch = () => {
        const taskItems = this.tasksListElement.querySelectorAll(this.selectors.taskItem)

        const searchValue = this.searchInputElement.value.toLowerCase().trim()

        taskItems.forEach((item) => {
            const title = item.querySelector(this.selectors.title)

            if (title) {
                const taskText = title.textContent.toLowerCase()

                if (taskText.includes(searchValue)) {
                    item.style.visibility = 'visible';
                } else {
                    item.style.visibility = 'hidden';
                }
            }
        })


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
        this.searchInputElement.addEventListener('input', this.onSearch)
        this.selectElement.addEventListener('change', this.selectValue)
        this.tasksListElement.addEventListener('change', this.checkboxState)
    }
}

export default itemState