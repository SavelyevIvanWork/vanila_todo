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

function color() {
  let colorPicker = ['blue', '#ffa400', 'green', 'red', '#00d669', '#530cff'];
  let color = Math.floor(Math.random() * colorPicker.length);
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
    createNewElement(item.todo, i, item.color, item.checked)
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
    createNewElement(taskInput.value, newElementArr.length, newTodo.color, newTodo.checked)
    newElementArr.push(newTodo);
    localStorage.setItem('arr', JSON.stringify(newElementArr)) 
    taskInput.value = "";
  } 
}

// создание нового элемента
function createNewElement(text, id, color, checked) {
  const todoList = taskListTemplate.cloneNode(true);
  const todoListItem = todoList.querySelector('.task-list__item');
  const todoListCheckbox = todoList.querySelector('.task-list__checkbox');
  const todoListWrapper = todoList.querySelector('.task-list__wrapper');
  const todoListText = todoList.querySelector('.task-list__text');
  // const todoListBtn = todoList.querySelector('.task-list__button');
  todoListCheckbox.style.background = color
  todoListWrapper.style.background = color
  todoListText.textContent = text
  // todoListBtn.id = `btn_${id}`
  todoListItem.id = `item_${id}`
  if (checked) {
    todoListItem.classList.toggle('task-list__item--done')
  }
  // taskListItem.onClick = changeStyle(taskListItem,)
  taskList.appendChild(todoList)
}
button.addEventListener('click', buttonClickHandler);


taskList.addEventListener('click', function(evt) {
    const elementId = evt.target.id;
  
    newElementArr.forEach(function(item, i) {
      
      if (elementId === `btn_${i}`) {
        taskList.querySelector(`[id='item_${i}']`).classList.add('visually-hidden')
        newElementArr.splice(i, 1) 
        localStorage.setItem('arr', JSON.stringify(newElementArr))
        
      }
      if (evt.target.closest(`[id='item_${i}']`)) {
        item.checked = !item.checked
        taskList.querySelector(`[id='item_${i}']`).classList.toggle('task-list__item--done')
        localStorage.setItem('arr', JSON.stringify(newElementArr))
      }
      
    });
  });

  