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

// создание нового элемента
let arr = []
function createNewElement() {
    let taskListElement = taskListTemplate.cloneNode(true);
    let taskListText = taskListElement.querySelector('.task-list__text');
        taskListText.textContent = taskInput.value;
    let taskListItem = taskListElement.querySelector('.task-list__item');

    let selectedColor = document.querySelector(".color-picker__item--active");
    if (selectedColor) {
      taskListItem.style.background = selectedColor.style.backgroundColor;
    }
    else {
      taskListItem.style.background = randColor(taskListItem);
    }
    
    arr.push(taskListItem)
    return taskListElement
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


// Добавляем новый элемент на страницу по клике на "Добавить"
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

  localStorage.setItem('arr', JSON.stringify(arr))
  // console.log(Object.keys(arr))
}


document.addEventListener("DOMContentLoaded", function () {
    let data = JSON.parse(localStorage.getItem('stored'))
    console.log(data)
    // if (data) {
    //   taskList.appendChild(data)
    // }
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
