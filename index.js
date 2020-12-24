const taskList = document.querySelector('.task-list');
const button = document.querySelector('.task__button');
const taskInput = document.querySelector('.task__input');
const taskListTemplate = document.querySelector('#task-list-templeate').content;
const colorPicker = document.querySelector('#colorPicker');
const colorPickerItem = document.querySelectorAll('.color-picker__item');

// рандомный цвет нового элемента
function randColor() {
  const r = Math.floor(Math.random() * (256));
  const g = Math.floor(Math.random() * (256));
  const b = Math.floor(Math.random() * (256));
  const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  
  return color;
}

// отслеживаем клик колорпикеру и добавляем рамочки целевому элементу 
colorPicker.addEventListener("click", function(evt) {
  colorPickerItem.forEach(item => {
    if (item == evt.target) {
      evt.target.classList.toggle("color-picker__item--active");
    }
    else {
      item.classList.remove("color-picker__item--active");
    }
  })
})

let newElementArr = []

if (localStorage.getItem('arr')) {
  newElementArr = JSON.parse(localStorage.getItem('arr'));

  newElementArr.forEach( function(item, i) {
    createNewElement(item.todo, i, item.color)
  });
}

// Добавляем новый элемент на страницу по клике на "Добавить"
function buttonClickHandler () {
  const selectedColor = document.querySelector(".color-picker__item--active");
  const newTodo = {
    todo: taskInput.value,
    color: selectedColor ? selectedColor.style.backgroundColor : randColor(),
    checked: false,
  };

    function isValidInput(value) {
      var reg = /^\s*$/;
      return reg.test(value) === true
  }
     
  if (isValidInput(taskInput.value)) {
    alert('Заполните Поле!');
  } else {
    createNewElement(taskInput.value, newElementArr.length, newTodo.color)
    newElementArr.push(newTodo);
    localStorage.setItem('arr', JSON.stringify(newElementArr)) 
    taskInput.value = "";
  } 
 
}

// создание нового элемента
function createNewElement(text, id, color) {
  const taskListElement = taskListTemplate.cloneNode(true);
  const taskListItem = taskListElement.querySelector('.task-list__item');
  const taskListText = taskListElement.querySelector('.task-list__text');
  const taskListBtn = taskListElement.querySelector('.task-list__button');
  taskListText.textContent = text
  taskListBtn.id = `btn_${id}`
  taskListItem.id = `item_${id}`
  taskListItem.style.background = color


  taskList.appendChild(taskListElement)
}

button.addEventListener('click', buttonClickHandler);

// function taskListElemntClickHandler(evt) {
//   let li = evt.target.closest('.task-list__item');
//   let button = evt.target.tagName === "BUTTON";
//   if (button) {
//       let close = evt.target.parentNode;
//       close.remove();
//       localStorage.removeItem('arr');
      
//   } else if (li) {
//       li.classList.toggle('task-list__item--done');
//   } 
// }

// taskList.addEventListener('click', taskListElemntClickHandler);

taskList.addEventListener('click', function(evt) {

    let elementId = evt.target.id;
  
    newElementArr.forEach(function(item, i) {
      if (elementId === `btn_${i}`) {
        item.checked = true
        taskList.querySelector(`[id='item_${i}']`).classList.add('visually-hidden')
        localStorage.setItem('arr', JSON.stringify(newElementArr)) 
       
      }
    });
  });