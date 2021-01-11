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

    completeTask(index){
        this._items[index].checked = !this._items[index].checked;
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem('todo', this.getJSON());
    }

    getJSON() {
        return JSON.stringify([...this._items]);
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
        
        this.todoList.addEventListener('click', this.todoLIstHandler);
        this.button.addEventListener('click', this.buttonClickHandler);
        this.colorPicker.addEventListener('click', this.colorPickerHandler);
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
        const selectedColor = document.querySelector(".color-picker__item--active");
        const newTodo = {
            value: this.todoInput.value,
            checked: false,
            id: model.getItems().length + 1,
            color: selectedColor ? selectedColor.style.backgroundColor : this.randColor(),
        }
           
        if (this.validation(this.todoInput.value)) {
          alert('Заполните Поле!');
        } else {
            this.view.createTodo(newTodo);
            this.model.addItem(newTodo);
            this.model.saveToLocalStorage(); 
            this.todoInput.value = "";
        }
        
    }

    randColor = () => {
        let color = ['blue', '#ffa400', 'green', 'red', '#00d669', '#530cff'];
        let index = Math.floor(Math.random() * color.length);
        return color[index]
    }

    colorPickerHandler = (evt) => {
        this.colorPickerItem.forEach(item => {
            if (item == evt.target) {
              evt.target.classList.toggle("color-picker__item--active");
            }
            else {
              item.classList.remove("color-picker__item--active");
            }
        })
    }

    todoLIstHandler = (evt) => {
        model.getItems().forEach((item, i) => {
            if (evt.target.closest(`[id='item_${item.id}']`)) {
                item.checked = item.checked
                this.todoList.querySelector(`[id='item_${item.id}']`).classList.toggle('task-list__item--done')
                this.model.completeTask(i)
                this.model.saveToLocalStorage()
            }   
        });
    }

}

let model = new TodoModel();
let view = new TodoView();
new TodoController(model, view);