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

function createNewElement() {
  
    const taskListElement = taskListTemplate.cloneNode(true);
    const taskListText = taskListElement.querySelector('.task-list__text');
          taskListText.textContent = taskInput.value;
    const taskListItem = taskListElement.querySelector('.task-list__item');

    const selectedColor = document.querySelector(".color-picker__item--active");
    if (selectedColor) {
      taskListItem.style.background = selectedColor.style.backgroundColor;
    }
    else {
      taskListItem.style.background = randColor(taskListItem);
    }

    let el = taskListItem.outerHTML
    arr.push(el)
   

    
    return taskListElement
}

// Добавляем новый элемент на страницу по клике на "Добавить"
button.addEventListener('click', buttonClickHandler);
function buttonClickHandler () {

    function isValidInput(value) {
      var reg = /^\s*$/;
      return reg.test(value) === true
    }
     
  if (isValidInput(taskInput.value)) {
    alert('Заполните Поле!');
  } else {
    taskList.appendChild(createNewElement()) 
    taskInput.value = "";
  } 
  
}



//////////////////

const taskList = document.querySelector('.task-list');
const button = document.querySelector('.task__button');
const taskInput = document.querySelector('.task__input');
const taskListTemplate = document.querySelector('#task-list-templeate').content;
const colorPicker = document.querySelector('#colorPicker');
const colorPickerItem = document.querySelectorAll('.color-picker__item');
const selectedColor = document.querySelector(".color-picker__item--active");

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

  newElementArr.forEach(function(item, i) {
    createNewElement(item.todo, i, item.color)
  });
}

// Добавляем новый элемент на страницу по клике на "Добавить"
function buttonClickHandler () {
  const newTodo = {
    todo: taskInput.value,
    // color: randColor()
  };

    function isValidInput(value) {
      var reg = /^\s*$/;
      return reg.test(value) === true
  }
     
  if (isValidInput(taskInput.value)) {
    alert('Заполните Поле!');
  } else {
    createNewElement(taskInput.value, newElementArr.length-1, newTodo.color)
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
  taskListText.textContent = text
  taskListItem.id = `item_${id}`
  taskListItem.style.background = color

  // newElementArr.forEach(function(item, i) {
  //   taskListItem.id = `item_${i}`
  //   taskListText.textContent = item.todo;
  // });
    
  taskList.appendChild(taskListElement)
    
}

document.addEventListener("DOMContentLoaded", function () {
  
  
});

button.addEventListener('click', buttonClickHandler);

function taskListElemntClickHandler(evt) {
  let li = evt.target.closest('.task-list__item');
  let button = evt.target.tagName === "BUTTON";
  if (button) {
      let close = evt.target.parentNode;
      close.remove();
      localStorage.removeItem('arr');
      
  } else if (li) {
      li.classList.toggle('task-list__item--done');
  } 
}

taskList.addEventListener('click', taskListElemntClickHandler);

// clearBtn.addEventListener('click', function(){
//   ul.innerHTML= "";
//   localStorage.removeItem('todoList',ul.innerHTML );
// });

// // Изменяем добавленный элемент
// function taskListElemntClickHandler(evt) {
//     let li = evt.target.closest('.task-list__item');
//     let button = evt.target.tagName === "BUTTON";
//     if (button) {
//         let close = evt.target.parentNode;
//         close.remove();
        
//     } else if (li) {
//         li.classList.toggle('task-list__item--done');
//     } 
// }


// taskList.addEventListener('click', taskListElemntClickHandler);



