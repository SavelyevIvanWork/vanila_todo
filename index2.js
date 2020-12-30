class TodoModel {
    constructor() {
        this._items = [];
        this.loadToLocalStorage();
    }

    getItems() {
        return this._items;
    }

    addItem(obj) {
        this._items.push(obj);
        this.saveToLocalStorage();
    }

    loadToLocalStorage() {
        if (localStorage['todo']) {
            this._items = JSON.parse(localStorage.getItem('todo'));
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('todo', this.getJSON());
    }

    getJSON() {
        return JSON.stringify([...this._items]);
    }

    deleteItem(index) {
        this._items.delete(String(index));
        this.saveToLocalStorage();
    }
}

class TodoView {
    createTodo (newTodo) {
        const taskListTemplate = document.querySelector('#task-list-templeate').content;
        const todoList = taskListTemplate.cloneNode(true);
        const todoListItem = todoList.querySelector('.task-list__item');
        const todoListCheckbox = todoList.querySelector('.task-list__checkbox');
        const todoListWrapper = todoList.querySelector('.task-list__wrapper');
        const todoListText = todoList.querySelector('.task-list__text');

        todoListCheckbox.style.background = newTodo.color
        todoListWrapper.style.background = newTodo.color
        todoListText.textContent = newTodo.value
        
        todoListItem.id = `item_${newTodo.id}`
        if (newTodo.checked) {
          todoListItem.classList.toggle('task-list__item--done')
        }
     
        document.querySelector('.task-list').appendChild(todoList)
    }

}

class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.todoList = document.querySelector('.task-list');
        this.button = document.querySelector('.task__button');
        this.colorPicker = document.querySelector('#colorPicker');
        this.colorPickerItem = document.querySelectorAll('.color-picker__item');
        this.todoInput = document.querySelector('.task__input');

        this.loadTodo();

        this.newTodo = {
            value: this.todoInput.value,
            checked: false,
            id: model.getItems().length + 1,
            color: this.randColor(),
        }
        
        this.todoList.addEventListener('click', this.todoLIstHandler);
        this.button.addEventListener('click', this.buttonClickHandler);
    }

    validation = (value) => {
        var reg = /^\s*$/;
        return reg.test(value) === true
    }

    loadTodo = () => {
        console.log(this.model.getItems())
        this.model.getItems().forEach((item) => {
            this.view.createTodo(item)
        });
    }

    buttonClickHandler = () => {

        
        console.log(this.newTodo)
        
        this.view.createTodo(this.newTodo);
        this.model.addItem(this.newTodo);
        this.model.saveToLocalStorage() 
        this.todoInput.value = "";
    }

    randColor = () => {
        let color = ['blue', '#ffa400', 'green', 'red', '#00d669', '#530cff'];
        let index = Math.floor(Math.random() * color.length);
        return color[index]
      }

    todoLIstHandler = (evt) => {
        const elementId = evt.target.id;
          
        model.getItems().forEach((item, i) => {
              
            if (elementId === `btn_${item.id}`) {
                this.todoList.querySelector(`[id='item_${item.id}']`).classList.add('visually-hidden')
                this.model.getItems().splice(i, 1) 
                this.model.addItem(this.newTodo)
                this.model.saveToLocalStorage()
                
            }
            if (evt.target.closest(`[id='item_${item.id}']`)) {
                item.checked = item.checked
                this.todoList.querySelector(`[id='item_${item.id}']`).classList.toggle('task-list__item--done')
                this.model.addItem(this.newTodo)
                this.model.saveToLocalStorage()
            }
              
        });
    }

}

// function randColor() {
//     let color = ['blue', '#ffa400', 'green', 'red', '#00d669', '#530cff'];
//     let index = Math.floor(Math.random() * color.length);
//     return color[index];
//   }
//   console.log(randColor())

let model = new TodoModel();
let view = new TodoView();
new TodoController(model, view);



// if (localStorage.getItem('todo')) {
//     this.items = JSON.parse(localStorage.getItem('todo'));
  
//     this.items.forEach( function(item, i) {
//       createNewElement(item.value, item.checked, item.id, item.color)
//     });
// }





// const taskList = document.querySelector('.task-list');
// const button = document.querySelector('.task__button');
// const todoInput = document.querySelector('.task__input');
// const todoListTemplate = document.querySelector('#task-list-templeate').content;
// const colorPicker = document.querySelector('#colorPicker');
// const colorPickerItem = document.querySelectorAll('.color-picker__item');


// class Model {
//     constructor(todoList) {
//         this._items = [];
//         this.loadToLocalStorage();
//     }

//     changeChecked(index) {
        
//     }

//     loadToLocalStorage() {
//         window.localStorage['todo'] ? this._items = JSON.parse(window.localStorage['todo']) :  null; 
        
//     }

//     saveToLocalStorage() {
//         window.localStorage.setItem('todo', this.getJSON());
//     }

//     getJSON() {
//         return JSON.stringify([...this._items]);
//     }

//     addTask() {

//     }
//   }

// // class View {
// //     constructor() {
// //         this.todo = [];
// //     }
// // }

// class Controller {

//     createElement()

//     changeElementState(element)

//     deleteElement(element)



// }

