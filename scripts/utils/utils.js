export function hideEmptyBackground(ulOfTasksElement, emptyBackgroundElement, hiddenClass) {
    if (ulOfTasksElement.children.length > 0) {
        emptyBackgroundElement.classList.add(hiddenClass);
    } else {
        emptyBackgroundElement.classList.remove(hiddenClass);
    }
}

