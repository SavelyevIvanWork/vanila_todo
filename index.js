
const taskList = document.querySelector('.task-list');
const button = document.querySelector('.task__button');
const taskInput = document.querySelector('.task__input');
const taskListTemplate = document.querySelector('#task-list-templeate').content;
const colorPickerItem = document.querySelectorAll('.color-picker__item');

function createNewElement() {
    let taskListElement = taskListTemplate.cloneNode(true);
    let taskListText = taskListElement.querySelector('.task-list__text');
    taskListText.textContent = taskInput.value;
    let taskListItem = taskListElement.querySelector('.task-list__item');

    let selectedColor = document.querySelector(".color-picker__item.active");
    if (selectedColor) {
      taskListItem.style.background = selectedColor.style.backgroundColor;
    }
    else {
      taskListItem.style.background = randColor(taskListItem);
    }
    return taskListElement
}

colorPickerJs.addEventListener("click", function(evt){
  colorPickerItem.forEach(item => {
    if (item == evt.target) {
      evt.target.classList.toggle("active");
    }
    else {
      item.classList.remove("active");
    }
  })
})

function randColor() {
    const r = Math.floor(Math.random() * (256));
    const g = Math.floor(Math.random() * (256));
    const b = Math.floor(Math.random() * (256));
    const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    
    return color;
}

function buttonClickHandler () {
    if (taskInput.value === "") {
      alert('Заполните Поле!');
    } else {
      taskList.appendChild(createNewElement()) 
      taskInput.value = "";
    }
}

button.addEventListener('click', buttonClickHandler);


function taskListElemntClickHandler(evt) {
    let li = evt.target.closest('.task-list__item');
    let button = evt.target.tagName === "BUTTON";
    if (button) {
        let close = evt.target.parentNode;
        close.remove();
        
    } else if (li) {
        li.classList.toggle('task-list__item--done');
    } 
}

taskList.addEventListener('click', taskListElemntClickHandler);
