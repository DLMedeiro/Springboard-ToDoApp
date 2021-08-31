// JS Todos Exercise
    // Part 1
        // For this assignment you will be combining your knowledge of DOM access and events to build a todo app!
        // As a user, you should be able to:
            // Add a new todo (by submitting a form)
            // Mark a todo as completed (cross out the text of the todo)
            // Remove a todo
    // Part 2
        // Now that you have a functioning todo app, save your todos in localStorage! Make sure that when the page refreshes, the todos on the page remain there.

// Variables
const userInput = document.querySelector('input[name="toDo"]');
const form = document.querySelector('#inputForm');
const ul = document.querySelector('ul');
// Why can't I use '.classList' within the () for the ul variable?
const li = document.querySelector('li');
const resetApp = document.querySelector('.clearAll');


// Load local storage when document is loaded
    document.addEventListener('DOMContentLoaded', function(e){
        let savedTasks = JSON.parse(localStorage.getItem('savedTasks'));
        if (savedTasks !== null){
            for (let i = 0; i < savedTasks.length; i++){
                newListItem = document.createElement('li');
                console.log(savedTasks[i]);
                newListItem.innerText = savedTasks[i];
                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'Delete Task'
                newListItem.appendChild(deleteBtn);
                ul.appendChild(newListItem);
            }
        }
    });

// Add a new task by submitting a form
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (userInput.value === ''){
            alert('Enter a task');
        } else {
            const newListItem = document.createElement('li');
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete Task'
            newListItem.innerText = userInput.value
            newListItem.appendChild(deleteBtn);
            ul.appendChild(newListItem);
            storeInLocalStorage(userInput.value);
            userInput.value = '';
        }
    })

// Add to local storage
    function storeInLocalStorage(task) {
        let savedTasks;
        if (localStorage.getItem('savedTasks') === null){
            savedTasks = [];
        } else {
            savedTasks = JSON.parse(localStorage.getItem('savedTasks'));
        }
        savedTasks.push(task);
        localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
    }

// Mark a to do as completed (cross out the text of the todo) and remove with button
    ul.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            let deleteText = e.target.parentElement.childNodes[0].nodeValue;
            let deleteItem = e.target.parentElement;
            deleteItem.remove();
            removeFromLocalStorage(deleteText);
        } else if (e.target.tagName = 'LI') {
            e.target.style.color = 'red';
            e.target.style.textDecoration = 'line-through';
        }
    });


// Remove from local storage
function removeFromLocalStorage(task){
    let savedTasks = JSON.parse(localStorage.getItem('savedTasks'));
    for (let i = 0; i < savedTasks.length; i++){
        if (savedTasks[i] == task){
            savedTasks.splice(i,1);
        }
        localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
    }

}

// Clear all tasks
resetApp.addEventListener('click', function(e){
    localStorage.clear();
        location.reload();
})









