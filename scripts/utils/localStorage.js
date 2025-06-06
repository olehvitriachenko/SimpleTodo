import { hideEmptyBackground } from "./utils.js"

export function saveContent() {

    //Сохраняем ссылку на элементы туду.
    const dynamicItems = document.querySelectorAll('[data-js-task-item]')
    // let dataDynamicItems = JSON.parse(localStorage.getItem('task-value')) || {}
    let dataDynamicItems = {}

    dynamicItems.forEach(item => {
        const title = item.querySelector('[data-js-title-of-item]')
        const checkbox = item.querySelector('[data-js-task-checkbox]')

        if (title && checkbox) {
            const text = title.textContent.trim()
            dataDynamicItems[text] = checkbox.checked
        }
    })

    localStorage.setItem('task-value', JSON.stringify(dataDynamicItems))
    console.log('получено значение: ', dataDynamicItems)
}

export function loadContent() {
    const emptyBackgroundElement = document.querySelector('[data-js-empty]')
    const hiddenClass = 'hidden'

    // Cохраняем ссылку на список
    const ulElement = document.querySelector('[data-js-ul-list]')

    const parseJSONElement = JSON.parse(localStorage.getItem('task-value'))

    if (!parseJSONElement) {
        ulElement.innerHTML = ''

        return
    }

    const entries = Object.entries(parseJSONElement)

    for (const [key, value] of entries) {

        const taskItemElement = document.createElement('li')
        taskItemElement.className = 'todo-task__item task-value'
        taskItemElement.setAttribute('data-js-task-item', '')

        taskItemElement.innerHTML = `
        <form action="" class="task-value__form">
        <input type="checkbox" class="task-value__input checkbox" data-js-task-checkbox>
        <h2 class="task-value__title" data-js-title-of-item>${key}</h2>
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

        const checkbox = taskItemElement.querySelector('[data-js-task-checkbox]')
        const title = taskItemElement.querySelector('[data-js-title-of-item]')
        checkbox.checked = value

        if (value) {
            title.classList.add('complete')
            checkbox.classList.add('complete')
        }

        ulElement.appendChild(taskItemElement)
        hideEmptyBackground(ulElement, emptyBackgroundElement, hiddenClass)
    }
}