"use strict";

displayAllTasks();

function saveTask() {
    // Get all the inputs
    let nameBox = document.getElementById("nameBox");
    let descriptionBox = document.getElementById("descriptionBox");
    let timeBox = document.getElementById("timeBox");
    let dateBox = document.getElementById("dateBox");

    // Get the input value
    let name = nameBox.value;
    let description = descriptionBox.value;
    let time = timeBox.value;
    let date = dateBox.value;

    //Do validation here.
    if (validation()) {
        // Save it to an object
        let task = { name, description, time, date };

        // Get the array and save the task to it, if no array then create a new one
        let json = localStorage.getItem("tasks");
        let tasks = json ? JSON.parse(json) : [];

        // Push the task into the tasks array
        tasks.push(task);

        // Save all the tasks again.
        json = JSON.stringify(tasks);
        localStorage.setItem("tasks", json);

        // Display the tasks after saving
        addTaskToDisplay();

        // Clean all the inputs
        nameBox.value = "";
        descriptionBox.value = "";
        timeBox.value = "";
        dateBox.value = "";
    }
}

// Function that displays all the tasks we have
function displayAllTasks() {
    // Get the ID of the section we want to put our tasks in
    let taskSection = document.getElementById("taskSection");

    // Get the array of the tasks
    let json = localStorage.getItem("tasks");
    let tasks = json ? JSON.parse(json) : [];

    // Display the tasks in the section
    let html = "";
    for (let i = 0; i < tasks.length; i++) {
        html += addTaskHtml(tasks[i], i, false);
    }
    
    taskSection.innerHTML = html;
}

// Function that adds a task to the display
function addTaskToDisplay() {
    // Get the ID of the section we want to put our tasks in
    let taskSection = document.getElementById("taskSection");

    // Get the array of the tasks
    let json = localStorage.getItem("tasks");
    let tasks = json ? JSON.parse(json) : [];

    // add the task to the section
    taskSection.innerHTML += addTaskHtml(tasks[tasks.length - 1], tasks.length - 1, true);

}

// Function that holds our task html and returns it.
function addTaskHtml(object, index, fade) {
    let html = `
        <div id="taskContainer${index}" class="task ${fade ? 'task-fade-in' : ''}">
        <div class="header-container">
            <h4>${object.name}</h4>
            <button onclick="removeTask(${index})" class="removeBtn"><i class="bi-x-square"></i></button>
        </div>
        <div class="description-container">
            <span>${object.description}</span>
        </div>
        <span>${object.date}</span>
        <span>${object.time}</span>
        </div>
    `;

    // Function that removes the class fade - in after the note has been added
    setTimeout(() => {
        let taskContainer = document.getElementById(`taskContainer${index}`);
        taskContainer.classList.remove('task-fade-in');
    }, 2000);
    return html;
}

// Function that removes a task at the specific index we choose.
function removeTask(index) {
    // Get the array of the tasks
    let json = localStorage.getItem("tasks");
    let tasks = json ? JSON.parse(json) : [];

    // Cut the task from the array
    tasks.splice(index, 1);

    // Save back the array to storage.
    json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);

    displayAllTasks();
}

// Function that validates that everything works as needed.
function validation() {
    // Get all the inputs
    let nameBox = document.getElementById("nameBox");
    let descriptionBox = document.getElementById("descriptionBox");
    let timeBox = document.getElementById("timeBox");
    let dateBox = document.getElementById("dateBox");

    // Get the alertContainer so we can input the alerts inside.
    let alertContainer = document.getElementById("alertContainer");

    // Validate
    if (nameBox.value === "") {
        alertContainer.innerHTML = `<div class="alert alert-info" role="alert"><img class="warningImg" src="assets/images/warning.png"> <span>Nothing inside task name ! please enter a name for the task.</span> </div>`;
        nameBox.focus();
    } else if (nameBox.value.length < 2 || nameBox.value.length > 12) {
        alertContainer.innerHTML = `<div class="alert alert-info" role="alert"><img class="warningImg" src="assets/images/warning.png"> <span>Task name is too long, please enter a valid name.</span> </div>`;
        nameBox.focus();
    } else if (descriptionBox.value === "") {
        alertContainer.innerHTML = `<div class="alert alert-info" role="alert"><img class="warningImg" src="assets/images/warning.png"> <span>Nothing inside the description ! please enter a description.</span></div>`;
        descriptionBox.focus();
    } else if (timeBox.value === "") {
        alertContainer.innerHTML = `<div class="alert alert-info" role="alert"><img class="warningImg" src="assets/images/warning.png"> <span>Nothing inside the time box ! please enter your time.</span></div>`;
        timeBox.focus();
    } else if (dateBox.value === "") {
        alertContainer.innerHTML = `<div class="alert alert-info" role="alert"><img class="warningImg" src="assets/images/warning.png"> <span>Nothing inside the date box ! please enter a date.</span></div>`;
        dateBox.focus();
    } else if (!checkTime()) {
        alertContainer.innerHTML = `<div class="alert alert-info" role="alert"><img class="warningImg" src="assets/images/warning.png"> <span>The time you entered has already passed, please enter future time !</span></div>`;
        timeBox.focus();
    } else {
        alertContainer.innerHTML = "";
        return true;
    }
    return false;
}

// Function to verify the time is correct.
function checkTime() {
    // Get the time input and date input
    let timeBox = document.getElementById("timeBox");
    let dateBox = document.getElementById("dateBox");
    // Create now date and create a date for the time picked by the user
    let now = new Date();
    let dateTimePicked = new Date(dateBox.value + "T" + timeBox.value);

    // Return true if the time + date picked by the user is in the future false if not.
    return dateTimePicked > now;
}

// Function to make sure that the user can't pick past dates.
function setDateMin() {
    // Get the date input.
    let dateBox = document.getElementById("dateBox");

    // Create a now date and turn it to an ISO string
    let now = new Date();
    let currentDate = now.toISOString();

    // Make the minimum date available to the current date.
    currentDate = currentDate.split("T")[0];
    dateBox.min = currentDate;
}


// Function to create the background spans for the animation
function backgroundBalls() {
    // Get the container div
    let backgroundContainer = document.getElementById('backgroundContainer');

    //Create 30 balls with random duration and delay 
    let html = '';
    for (let i = 0; i < 30; i++) {
        let duration = Math.floor(Math.random() * 20 + 10);
        let delay = Math.floor(Math.random() * 7 + 1);
        let purpleOrBlue = Math.random();
        if (purpleOrBlue >= 0.5)
            html += `
                <span class="purpleBall" style="--ad:${duration}s; --del:${delay}s"></span>
            `;
        else
            html += `
                <span class="blueBall" style="--ad:${duration}s; --del:${delay}s"></span>
            `;
    }
    backgroundContainer.innerHTML = html;
}

