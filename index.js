const taskList = document.querySelector('.task-list');
const button = document.querySelector('.task__button');
const taskInput = document.querySelector('.task__input');
const taskListTemplate = document.querySelector('#task-list-templeate').content;

function createNewElement() {
    let taskListElement = taskListTemplate.cloneNode(true);
    taskListElement.querySelector('.task-list__text').textContent = taskInput.value;
    // taskListElement.querySelector('.task-list__button').onclick = taskListElementClickHandler
    return taskListElement
}

function randColor(element) {
    const r = Math.floor(Math.random() * (256));
    const g = Math.floor(Math.random() * (256));
    const b = Math.floor(Math.random() * (256));
    const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    
    element.style.background = color;
}

function buttonClickHandler () {
    taskList.appendChild(createNewElement())
    randColor(taskList.lastElementChild); 
    taskInput.value = "";
}

button.addEventListener('click', buttonClickHandler);


function taskListElemntClickHandler(event) {
    let li = event.target.closest('.task-list__item');
    let button = event.target.tagName === "BUTTON";
    if (button) {
        let close = event.target.parentNode;
        close.remove();
        
    } else if (li) {
        li.classList.toggle('task-list__item--done');
    } 
}

taskList.addEventListener('click', taskListElemntClickHandler);

// function createNewElement() {
//     // 1. Находим шаблон и копируем содержимое в taskList.
//     let taskListTemplate = document.querySelector('#task-list-templeate').content;
//     let taskListElement = taskListTemplate.cloneNode(true);
//     taskListElement.querySelector('.task-list__text').textContent = taskInput.value;
//     taskList.appendChild(taskListElement);
//     taskList.lastElementChild;
//     randColor(taskList.lastElementChild); 

//     const color = ['blue', '#ffa400', 'green', 'red', '#00d669', '#530cff'];
//     return taskListElement
// }