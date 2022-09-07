/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ "./src/tasks.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var dom = function () {
  // UPDATE UI
  function updateUi(toDoList, taskDisplayMode, selectedProject) {
    // Update the project list
    updateProjectListDisplay(toDoList, selectedProject); // Update the task list

    createTaskElements(toDoList, taskDisplayMode, selectedProject);
  }

  ; // UPDATE PROJECT LIST DISPLAY

  function updateProjectListDisplay(toDoList, selectedProject) {
    // Variable to track project index
    var projectIndex = 0; // Clear the current UI of projects and tasks

    var projectList = document.querySelector('#project-list');
    projectList.innerHTML = '';
    console.log(selectedProject); // Create projects and tasks in the dom based on the to do list

    toDoList.forEach(function (project) {
      // Create a new project item's elements
      var projectItem = document.createElement('li');
      var projectTitle = document.createElement('p');
      var projectEditButton = document.createElement('button');
      var projectRemoveButton = document.createElement('button');
      projectTitle.textContent = project.title;
      projectEditButton.textContent = 'Edit';
      projectRemoveButton.textContent = 'Remove';
      projectItem.classList.add('project-item', 'not-selected');
      projectTitle.classList.add('project-title');
      projectEditButton.classList.add('project-edit-button');
      projectRemoveButton.classList.add('project-remove-button');

      if (selectedProject === projectIndex) {
        projectItem.classList.add('selected-project');
        projectItem.classList.remove('not-selected');
        console.log('hello');
      }

      console.log(selectedProject);
      projectItem.dataset.projectIndex = projectIndex; // Increment the project index

      projectIndex++; // Append the project to the DOM

      projectItem.append(projectTitle, projectEditButton, projectRemoveButton);
      projectList.append(projectItem);
    });
  }

  ; // UPDATE TASK AND PROJECT INDEXES

  function updateIndexes(toDoList) {
    var projectIndex = 0;
    toDoList.forEach(function (project) {
      var taskIndex = 0;
      project.tasks.forEach(function (task) {
        task.taskIndex = taskIndex;
        task.projectIndex = projectIndex;
        taskIndex++;
      });
      projectIndex++;
    });
  } // CREATE TASK DOM ELEMENTS


  function createTaskElements(toDoList, taskDisplayMode, selectedProject) {
    var taskList = document.querySelector('#task-list'); // Clear current task list

    taskList.innerHTML = ''; // Define task array

    var taskArray = []; // Define variables for today and 7 days from today

    var today = new Date();
    today = new Date("'".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(today.getDate(), "'")).toISOString().slice(0, 10);
    var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek = new Date("'".concat(nextWeek.getFullYear(), "-").concat(nextWeek.getMonth() + 1, "-").concat(nextWeek.getDate(), "'")).toISOString().slice(0, 10); // Update task and project indexes on each task item

    updateIndexes(_projects_js__WEBPACK_IMPORTED_MODULE_1__["default"].toDoList); // Build the task array for the DOM based on display mode

    if (taskDisplayMode === 'today') {
      // Push tasks that are due today to the new array
      _projects_js__WEBPACK_IMPORTED_MODULE_1__["default"].toDoList.forEach(function (project) {
        project.tasks.forEach(function (task) {
          if (task.dueDate === today) {
            taskArray.push(task);
          }
        });
      });
    } else if (taskDisplayMode === 'week') {
      // Push tasks that are due this week to the new array
      _projects_js__WEBPACK_IMPORTED_MODULE_1__["default"].toDoList.forEach(function (project) {
        project.tasks.forEach(function (task) {
          if (task.dueDate >= today && task.dueDate <= nextWeek) {
            taskArray.push(task);
          }
        });
      }); // Push tasks that are in the selected project to the new array
    } else if (taskDisplayMode === 'project') {
      if (_projects_js__WEBPACK_IMPORTED_MODULE_1__["default"].toDoList.length > 0) {
        taskArray = _projects_js__WEBPACK_IMPORTED_MODULE_1__["default"].toDoList[selectedProject].tasks;
      }
    } // If there are any projects in the to do list


    if (toDoList.length > 0) {
      // Create task items in the DOM
      taskArray.forEach(function (task) {
        var taskItem = document.createElement('li');
        var taskCheckbox = document.createElement('input');
        var taskTitle = document.createElement('p');
        var taskDueDate = document.createElement('p');
        var taskDetailsButton = document.createElement('button');
        var taskEditButton = document.createElement('button');
        var taskRemoveButton = document.createElement('button');
        taskItem.classList.add('task-item');
        taskCheckbox.classList.add('task-checkbox');
        taskTitle.classList.add('task-title');
        taskDueDate.classList.add('task-due-date');
        taskDetailsButton.classList.add('task-details-button');
        taskEditButton.classList.add('task-edit-button');
        taskRemoveButton.classList.add('task-remove-button'); // Add class based on priority level

        if (task.priority === 'Low') {
          taskItem.classList.add('low-priority');
        } else if (task.priority === 'Medium') {
          taskItem.classList.add('medium-priority');
        } else if (task.priority === 'High') {
          taskItem.classList.add('high-priority');
        }

        taskTitle.textContent = task.title;
        taskDueDate.textContent = task.dueDate;
        taskDetailsButton.textContent = 'View Details';
        taskEditButton.textContent = 'Edit';
        taskRemoveButton.textContent = 'Remove';
        taskCheckbox.setAttribute('type', 'checkbox');

        if (task.completed === true) {
          taskCheckbox.checked = true;
        } else {
          taskCheckbox.checked = false;
        }

        taskItem.dataset.taskIndex = task.taskIndex;
        taskItem.dataset.projectIndex = task.projectIndex; // Append task to the DOM

        taskItem.append(taskCheckbox, taskTitle, taskDueDate, taskDetailsButton, taskEditButton, taskRemoveButton);
        taskList.append(taskItem);
      });
    }
  } // SHOW ELEMENTS


  function showElements() {
    Array.from(arguments).forEach(function (argument) {
      argument.classList.remove('hide');
    });
  } // HIDE ELEMENTS


  function hideElements() {
    Array.from(arguments).forEach(function (argument) {
      argument.classList.add('hide');
    });
  } // SHOW TASK DETAILS IN TASK EDIT MODAL


  function showEditTaskDetails(toDoList, projectIndex, taskIndex, modalTitleInput, modalTaskDescriptionInput, modalTaskDueDateInput, modalTaskPrioritySelect) {
    modalTitleInput.value = toDoList[projectIndex].tasks[taskIndex].title;
    modalTaskDescriptionInput.value = toDoList[projectIndex].tasks[taskIndex].description;
    modalTaskDueDateInput.value = toDoList[projectIndex].tasks[taskIndex].dueDate;
    modalTaskPrioritySelect.value = toDoList[projectIndex].tasks[taskIndex].priority;
  } // SHOW TASK DETAILS IN TASK VIEW DETAIL MODAL


  function showViewTaskDetails(toDoList, projectIndex, taskIndex, modalViewTaskTitleInfo, modalViewTaskDescriptionInfo, modalViewTaskDueDateInfo, modalViewTaskPriorityInfo) {
    modalViewTaskTitleInfo.textContent = toDoList[projectIndex].tasks[taskIndex].title;
    modalViewTaskDescriptionInfo.textContent = toDoList[projectIndex].tasks[taskIndex].description;
    modalViewTaskDueDateInfo.textContent = toDoList[projectIndex].tasks[taskIndex].dueDate;
    modalViewTaskPriorityInfo.textContent = toDoList[projectIndex].tasks[taskIndex].priority;
  } // SHOW PROJECT DETAILS IN PROJECT EDIT MODAL


  function showEditProjectDetails(toDoList, modalTitleInput, projectIndex) {
    modalTitleInput.value = toDoList[projectIndex].title;
  } // UPDATE WHICH PROJECT HAS SELECTED PROJECT CLASS


  function changeSelectedProjectClass(tasksDueTodayNode, tasksDueThisWeekNode, projectsListContainer, selectedProjectNode) {
    // Create array of nodes to listen to
    var nodeArray = [tasksDueTodayNode, tasksDueThisWeekNode].concat(_toConsumableArray(projectsListContainer.children)); // Remove selected project class from all project section elements

    nodeArray.forEach(function (node) {
      node.classList.remove('selected-project');
      node.classList.add('not-selected');
    });
    selectedProjectNode.classList.remove('not-selected');
    selectedProjectNode.classList.add('selected-project');
  } // Return functions


  return {
    updateUi: updateUi,
    showElements: showElements,
    hideElements: hideElements,
    updateProjectListDisplay: updateProjectListDisplay,
    showEditTaskDetails: showEditTaskDetails,
    showEditProjectDetails: showEditProjectDetails,
    showViewTaskDetails: showViewTaskDetails,
    createTaskElements: createTaskElements,
    updateIndexes: updateIndexes,
    changeSelectedProjectClass: changeSelectedProjectClass
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);

/***/ }),

/***/ "./src/handlers.js":
/*!*************************!*\
  !*** ./src/handlers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks.js */ "./src/tasks.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");




var handlers = function () {
  // Define DOM variables
  var modal = document.querySelector('#modal');
  var modalHeaderTitle = document.querySelector('#modal-header-title');
  var modalCloseButton = document.querySelector('#modal-close-button');
  var modalTitleDiv = document.querySelector('#modal-title-div');
  var modalButtons = document.querySelector('#modal-buttons');
  var modalSubmitButton = document.querySelector('#modal-submit-button');
  var modalCancelButton = document.querySelector('#modal-cancel-button');
  var modalTaskInput = document.querySelector('#modal-task-input');
  var modalTitleInput = document.querySelector('#modal-title-input');
  var modalTitleError = document.querySelector('#modal-title-error');
  var modalTaskDescriptionInput = document.querySelector('#modal-task-description-input');
  var modalTaskDueDateInput = document.querySelector('#modal-task-due-date-input');
  var modalTaskPrioritySelect = document.querySelector('#modal-task-priority-select');
  var modalViewInfo = document.querySelector('#modal-view-info');
  var modalViewTaskTitleInfo = document.querySelector('#modal-view-task-title-info');
  var modalViewTaskDescriptionInfo = document.querySelector('#modal-view-task-description-info');
  var modalViewTaskDueDateInfo = document.querySelector('#modal-view-task-due-date-info');
  var modalViewTaskPriorityInfo = document.querySelector('#modal-view-task-priority-info');
  var addProjectButton = document.querySelector('#add-project-button');
  var addTaskButton = document.querySelector('#add-task-button');
  var projectsSectionContainer = document.querySelector('#projects-section-container');
  var projectList = document.querySelector('#project-list');
  var tasksDueToday = document.querySelector('#tasks-due-today');
  var tasksDueThisWeek = document.querySelector('#tasks-due-this-week');
  var taskList = document.querySelector('#task-list');
  var selectedProject = 0;
  var taskIndex = 0;
  var projectIndex = 0;
  var taskDisplayMode = 'project';
  var addOrEditMode = 'add project'; // DISPLAY NEW PROJECT MODAL

  addProjectButton.addEventListener('click', function () {
    // Update add or edit mode
    addOrEditMode = 'add project'; // Reset the modal form

    modal.reset(); // Show add new project DOM elements

    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].showElements(modal, modalTitleDiv, modalButtons, modalSubmitButton); // Change the modal title

    modalHeaderTitle.textContent = 'Add Project';
  }); // DISPLAY NEW TASK MODAL

  addTaskButton.addEventListener('click', function () {
    // Update add or edit mode
    addOrEditMode = 'add task'; // Reset the modal form

    modal.reset(); // Show add new task DOM elements

    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].showElements(modal, modalTitleDiv, modalTaskInput, modalButtons, modalSubmitButton); // Change the modal title

    modalHeaderTitle.textContent = 'Add Task';
  }); // DISPLAY TASKS DUE TODAY

  tasksDueToday.addEventListener('click', function (event) {
    // Update task display mode
    taskDisplayMode = 'today'; // Hide the add task button

    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].hideElements(addTaskButton); // Update the task display

    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].createTaskElements(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList, taskDisplayMode, selectedProject); // Apply the selected project class to the chosen project, remove from others

    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].changeSelectedProjectClass(tasksDueToday, tasksDueThisWeek, projectList, event.target);
  }); // DISPLAY TASKS DUE THIS WEEK

  tasksDueThisWeek.addEventListener('click', function (event) {
    // Update task display mode
    taskDisplayMode = 'week'; // Hide the add task button

    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].hideElements(addTaskButton); // Update the task display

    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].createTaskElements(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList, taskDisplayMode, selectedProject); // Apply the selected project class to the chosen project, remove from others

    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].changeSelectedProjectClass(tasksDueToday, tasksDueThisWeek, projectList, event.target);
  }); // MODAL SUBMIT BUTTON

  modalSubmitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Validate title has been entered

    if (modalTitleInput.value !== '') {
      if (addOrEditMode === 'add project') {
        // Push new project to the to do list array
        _projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList.push(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].Project(modalTitleInput.value));
      } else if (addOrEditMode === 'edit project') {
        // Replace selected project's title with new value
        _projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList[projectIndex].title = modalTitleInput.value;
      } else if (addOrEditMode === 'add task') {
        // Push new task to the selected project's tasks array
        _tasks_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTask(modalTitleInput.value, modalTaskDescriptionInput.value, modalTaskDueDateInput.value, modalTaskPrioritySelect.value, selectedProject, taskIndex);
      } else if (addOrEditMode === 'edit task') {
        // Replace selected task with new values
        _tasks_js__WEBPACK_IMPORTED_MODULE_1__["default"].editTask(modalTitleInput.value, modalTaskDescriptionInput.value, modalTaskDueDateInput.value, modalTaskPrioritySelect.value, projectIndex, taskIndex);
      } // Hide modal elements


      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].hideElements(modal, modalTitleDiv, modalSubmitButton, modalTitleError, modalTaskInput); // Update UI

      console.log(selectedProject);
      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].updateUi(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList, taskDisplayMode, selectedProject);
    } else {
      modalTitleError.classList.remove('hide');
    }
  }); // CLICK OFF MODAL TO CLOSE MODAL

  modal.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target === e.currentTarget) {
      // Hide modal elements
      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].hideElements(modal, modalTitleDiv, modalTitleError, modalViewInfo, modalSubmitButton, modalTaskInput);
    }
  }); // MODAL CLOSE BUTTON

  modalCloseButton.addEventListener('click', function (e) {
    e.preventDefault(); // Hide modal elements

    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].hideElements(modal, modalTitleDiv, modalTitleError, modalViewInfo, modalSubmitButton, modalTaskInput);
  }); // MODAL CANCEL BUTTON

  modalCancelButton.addEventListener('click', function (e) {
    e.preventDefault(); // Hide modal elements

    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].hideElements(modal, modalTitleDiv, modalTitleError, modalViewInfo, modalSubmitButton, modalTaskInput);
  }); // PROJECT LIST HANDLERS

  projectList.addEventListener('click', function (event) {
    // CHANGE SELECTED PROJECT, SHOW A PROJECT'S TASKS
    if (event.target.classList.contains('project-item')) {
      // Set display mode to project
      taskDisplayMode = 'project'; // Display the add task button

      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].showElements(addTaskButton); // Update selected project

      selectedProject = event.target.dataset.projectIndex; // Update the task display

      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].createTaskElements(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList, taskDisplayMode, selectedProject); // Apply the selected project class to the chosen project, remove from others

      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].changeSelectedProjectClass(tasksDueToday, tasksDueThisWeek, projectList, event.target);
    } // DISPLAY EDIT PROJECT MODAL, UPDATE EDIT INDEX


    if (event.target.classList.contains('project-edit-button')) {
      // Update add or edit mode
      addOrEditMode = 'edit project'; // Update project index

      projectIndex = event.target.parentElement.dataset.projectIndex; // Update task index

      taskIndex = event.target.parentElement.dataset.taskIndex; // Show the edit project modal

      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].showElements(modal, modalTitleDiv, modalButtons, modalSubmitButton); // Pre-fill the project title input with the selected project's title

      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].showEditProjectDetails(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList, modalTitleInput, projectIndex); // Update the modal header title

      modalHeaderTitle.textContent = 'Edit Project';
    } // REMOVE A PROJECT


    if (event.target.classList.contains('project-remove-button')) {
      // Update the project index
      projectIndex = event.target.parentElement.dataset.projectIndex; // Remove the project from the toDoList array

      _projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList.splice(projectIndex, 1); // Update the selected project if necessary

      if (selectedProject > 0 && selectedProject > _projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList.length - 1) {
        selectedProject--;
      } // Hide the add new task button if there are no projects


      if (_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList.length < 1) {
        _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].hideElements(addTaskButton);
      } // Update the UI


      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].updateUi(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList, taskDisplayMode, selectedProject);
    }
  }); // TASK LIST HANDLERS

  taskList.addEventListener('click', function (event) {
    // VIEW TASK DETAILS
    if (event.target.classList.contains('task-details-button')) {
      // Update the task index
      taskIndex = event.target.parentElement.dataset.taskIndex; // Update the project index

      projectIndex = event.target.parentElement.dataset.projectIndex; // Display the task modal

      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].showElements(modal, modalViewInfo); // Populate the task modal with the selected task's data

      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].showViewTaskDetails(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList, projectIndex, taskIndex, modalViewTaskTitleInfo, modalViewTaskDescriptionInfo, modalViewTaskDueDateInfo, modalViewTaskPriorityInfo, modalButtons); // Update the modal title

      modalHeaderTitle.textContent = 'View Task Details';
    } // EDIT TASK


    if (event.target.classList.contains('task-edit-button')) {
      // Update add or edit mode
      addOrEditMode = 'edit task'; // Update the task edit index

      taskIndex = event.target.parentElement.dataset.taskIndex; // Update the project index

      projectIndex = event.target.parentElement.dataset.projectIndex; // Display the edit modal

      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].showElements(modal, modalTitleDiv, modalTaskInput, modalSubmitButton); // Update the edit modal header title

      modalHeaderTitle.textContent = 'Edit Task'; // Pre-fill the modal inputs with the selected task's details

      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].showEditTaskDetails(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList, projectIndex, taskIndex, modalTitleInput, modalTaskDescriptionInput, modalTaskDueDateInput, modalTaskPrioritySelect);
    } // REMOVE TASK


    if (event.target.classList.contains('task-remove-button')) {
      // Update the task index
      taskIndex = event.target.parentElement.dataset.taskIndex; // Update the project index

      projectIndex = event.target.parentElement.dataset.projectIndex; // Remove the task from the selected project

      _projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList[projectIndex].tasks.splice(taskIndex, 1); // Update the task list

      _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].createTaskElements(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList, taskDisplayMode, selectedProject);
    } // MARK TASK AS COMPLETED


    if (event.target.classList.contains('task-checkbox')) {
      // Update the task index
      taskIndex = event.target.parentElement.dataset.taskIndex; // Update the project index

      projectIndex = event.target.parentElement.dataset.projectIndex; // Toggle the completed status and class on the task object

      if (_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList[projectIndex].tasks[taskIndex].completed === false) {
        _projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList[projectIndex].tasks[taskIndex].completed = true;
        event.target.parentElement.classList.add('completed');
      } else {
        _projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList[projectIndex].tasks[taskIndex].completed = false;
        event.target.parentElement.classList.remove('completed');
      }
    }
  }); // UPDATE UI ON PAGE LOAD

  (function () {
    _dom_js__WEBPACK_IMPORTED_MODULE_0__["default"].updateUi(_projects_js__WEBPACK_IMPORTED_MODULE_2__["default"].toDoList, taskDisplayMode, selectedProject);
  })();
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlers);

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var projects = function () {
  // TO DO LIST
  var toDoList = [{
    title: 'Big project',
    tasks: [{
      title: 'Take out the trash',
      description: 'I have to take out the trash on Sunday',
      dueDate: '2022-09-02',
      priority: 'High',
      taskIndex: 0,
      projectIndex: 0,
      completed: false
    }, {
      title: 'Donate clothes',
      description: 'Donate unused clothes to Value Village.',
      dueDate: '2022-09-07',
      priority: 'Low',
      taskIndex: 1,
      projectIndex: 0,
      completed: false
    }]
  }, {
    title: 'Mini project',
    tasks: [{
      title: 'Go for a jog',
      description: 'Jog 4km in 20 minutes.',
      dueDate: '2022-09-15',
      priority: 'Medium',
      taskIndex: 0,
      projectIndex: 1,
      completed: false
    }]
  }];

  function addProject() {}

  function editProject() {}

  function removeProject() {} // PROJECT FACTORY FUNCTION


  var Project = function Project(title) {
    return {
      title: title,
      tasks: []
    };
  };

  return {
    toDoList: toDoList,
    Project: Project
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



var tasks = function () {
  function addTask(title, description, dueDate, priority, projectIndex, taskIndex) {
    var task = Task(title, description, dueDate, priority, projectIndex, taskIndex);
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].toDoList[projectIndex].tasks.push(task);
    console.log(task);
  }

  function editTask(title, description, dueDate, priority, projectIndex, taskIndex) {
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].toDoList[projectIndex].tasks[taskIndex].title = title;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].toDoList[projectIndex].tasks[taskIndex].description = description;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].toDoList[projectIndex].tasks[taskIndex].dueDate = dueDate;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].toDoList[projectIndex].tasks[taskIndex].priority = priority;
  }

  function removeTask(projectIndex, taskIndex) {
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].toDoList[projectIndex].tasks[taskIndex].splice(taskIndex, 1);
  } // TASK FACTORY FUNCTION


  var Task = function Task(title, description, dueDate, priority, taskIndex, projectIndex) {
    return {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      taskIndex: taskIndex,
      projectIndex: projectIndex,
      completed: false
    };
  };

  return {
    Task: Task,
    addTask: addTask,
    editTask: editTask,
    removeTask: removeTask
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tasks);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*----- GLOBALS -----*/\n* {\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    list-style: none;\n    font-family: Arial, Helvetica, sans-serif;\n    border-radius: 5px;\n}\n\n:root {\n    --main-color: lightgreen;\n    --secondary-color: yellow;\n    --third-color: lightcoral;\n    --dark-neutral-color: #222;\n    --medium-neutral-color: #999;\n    --medium-light-neutral-color: #aaa;\n    --light-neutral-color: #ddd;\n}\n\n/*----- MAIN -----*/\n#main-container {\n    display: grid;\n    grid-template-columns: 1fr 2fr;\n    grid-template-rows: 5rem 1fr 3rem;\n    min-height: 100vh;\n}\n\n/*----- HEADER -----*/\nheader {\n    grid-row: 1 / 2;\n    grid-column: 1 / 3;\n    background-color: var(--main-color);\n    display: flex;\n    align-items: center;\n}\n\n/*----- PROJECTS -----*/\n#projects-section-container {\n    grid-row: 2 / 3;\n    grid-column: 1 / 2;\n    background-color: var(--light-neutral-color);\n    min-height: calc(50vh - 4rem);\n}\n\n#projects-section-container * {\n    padding: 5px;\n    margin: 2px;\n}\n\n#tasks-due-today,\n#tasks-due-this-week {\n    margin: 2px 8px;\n}\n\n.project-item,\n.project-title,\n.project-edit-button,\n.project-remove-button,\n#tasks-due-today,\n#tasks-due-this-week {\n    cursor: pointer;\n}\n\n.project-item {\n    display: grid;\n    grid-template-columns: 1fr auto auto;\n}\n\n.project-item:hover,\n#tasks-due-today:hover,\n#tasks-due-this-week:hover {\n    background-color: var(--medium-light-neutral-color);\n}\n\n.project-item .project-title {\n    pointer-events: none;\n}\n\n/*----- TASKS -----*/\n#tasks-section-container {\n    grid-row: 2 / 3;\n    grid-column: 2 / 3;\n    min-height: calc(50vh - 4rem);\n}\n\n#tasks-section-container *:not(.task-item) {\n    padding: 5px;\n    margin: 2px;\n}\n\n.task-item {\n    position: relative;\n    background-color: var(--medium-light-neutral-color);\n    display: grid;\n    grid-template-columns: auto 1fr auto auto auto auto auto;\n    margin: 2px 2px 2px 18px;\n    padding: 5px;\n    box-shadow: -18px 0px 0px red;\n}\n\n.task-item::before {\n    position: absolute;\n    writing-mode: tb-rl;\n    transform: rotate(180deg);\n    left: -18px;\n    bottom: 0;\n    top: 0;\n    width: 18px;\n    text-align: center;\n}\n\n.task-checkbox {\n    transform: scale(1.5);\n}\n\n/*----- FOOTER -----*/\nfooter {\n    grid-row: 3 / 4;\n    grid-column: 1 / 3;\n    background-color: var(--main-color);\n}\n\n/*----- MODAL -----*/\n#modal {\n    /* visibility: hidden; */\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(255, 255, 255, 0.5);\n}\n\n#modal-card {\n    position: relative;\n    width: clamp(35ch, 70%, 50ch);\n    height: 300px;\n    border-radius: 5px;\n    margin: auto;\n    top: 25%;\n    border: 2px solid red;\n    background-color: var(--light-neutral-color);\n}\n\n#modal-header {\n    display: flex;\n    justify-content: space-between;\n}\n\n/*----- DYNAMIC STYLES -----*/\n.hide {\n    display: none;\n}\n\n.selected-project {\n    background-color: yellow;\n}\n\n.not-selected {\n    background-color: white;\n}\n\n.completed {\n    opacity: 0.7;\n}\n\n.completed .task-title {\n    text-decoration: line-through;\n}\n\n.low-priority.task-item::before {\n    content: 'low';\n}\n\n.medium-priority.task-item::before {\n    content: 'mid';\n}\n\n.high-priority.task-item::before {\n    content: 'high';\n}\n\n.low-priority {\n    box-shadow: -18px 0px 0px lightgreen;\n}\n\n.medium-priority {\n    box-shadow: -18px 0px 0px yellow;\n}\n\n.high-priority {\n    box-shadow: -18px 0px 0px lightcoral;\n}\n\n/*----- NARROW WIDTH -----*/\n\n@media only screen and (max-width: 768px) {\n    #main-container {\n        display: grid;\n        grid-template-columns: auto;\n        grid-template-rows: 5rem auto auto 3rem;\n    }\n\n    header,\n    #project-section-container,\n    #tasks-section-container,\n    footer {\n        grid-row: auto;\n        grid-column: auto;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA,sBAAsB;AACtB;IACI,UAAU;IACV,SAAS;IACT,sBAAsB;IACtB,gBAAgB;IAChB,yCAAyC;IACzC,kBAAkB;AACtB;;AAEA;IACI,wBAAwB;IACxB,yBAAyB;IACzB,yBAAyB;IACzB,0BAA0B;IAC1B,4BAA4B;IAC5B,kCAAkC;IAClC,2BAA2B;AAC/B;;AAEA,mBAAmB;AACnB;IACI,aAAa;IACb,8BAA8B;IAC9B,iCAAiC;IACjC,iBAAiB;AACrB;;AAEA,qBAAqB;AACrB;IACI,eAAe;IACf,kBAAkB;IAClB,mCAAmC;IACnC,aAAa;IACb,mBAAmB;AACvB;;AAEA,uBAAuB;AACvB;IACI,eAAe;IACf,kBAAkB;IAClB,4CAA4C;IAC5C,6BAA6B;AACjC;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;;IAEI,eAAe;AACnB;;AAEA;;;;;;IAMI,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,oCAAoC;AACxC;;AAEA;;;IAGI,mDAAmD;AACvD;;AAEA;IACI,oBAAoB;AACxB;;AAEA,oBAAoB;AACpB;IACI,eAAe;IACf,kBAAkB;IAClB,6BAA6B;AACjC;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,kBAAkB;IAClB,mDAAmD;IACnD,aAAa;IACb,wDAAwD;IACxD,wBAAwB;IACxB,YAAY;IACZ,6BAA6B;AACjC;;AAEA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,yBAAyB;IACzB,WAAW;IACX,SAAS;IACT,MAAM;IACN,WAAW;IACX,kBAAkB;AACtB;;AAEA;IACI,qBAAqB;AACzB;;AAEA,qBAAqB;AACrB;IACI,eAAe;IACf,kBAAkB;IAClB,mCAAmC;AACvC;;AAEA,oBAAoB;AACpB;IACI,wBAAwB;IACxB,eAAe;IACf,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,0CAA0C;AAC9C;;AAEA;IACI,kBAAkB;IAClB,6BAA6B;IAC7B,aAAa;IACb,kBAAkB;IAClB,YAAY;IACZ,QAAQ;IACR,qBAAqB;IACrB,4CAA4C;AAChD;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;;AAEA,6BAA6B;AAC7B;IACI,aAAa;AACjB;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,6BAA6B;AACjC;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,oCAAoC;AACxC;;AAEA,2BAA2B;;AAE3B;IACI;QACI,aAAa;QACb,2BAA2B;QAC3B,uCAAuC;IAC3C;;IAEA;;;;QAII,cAAc;QACd,iBAAiB;IACrB;AACJ","sourcesContent":["/*----- GLOBALS -----*/\n* {\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    list-style: none;\n    font-family: Arial, Helvetica, sans-serif;\n    border-radius: 5px;\n}\n\n:root {\n    --main-color: lightgreen;\n    --secondary-color: yellow;\n    --third-color: lightcoral;\n    --dark-neutral-color: #222;\n    --medium-neutral-color: #999;\n    --medium-light-neutral-color: #aaa;\n    --light-neutral-color: #ddd;\n}\n\n/*----- MAIN -----*/\n#main-container {\n    display: grid;\n    grid-template-columns: 1fr 2fr;\n    grid-template-rows: 5rem 1fr 3rem;\n    min-height: 100vh;\n}\n\n/*----- HEADER -----*/\nheader {\n    grid-row: 1 / 2;\n    grid-column: 1 / 3;\n    background-color: var(--main-color);\n    display: flex;\n    align-items: center;\n}\n\n/*----- PROJECTS -----*/\n#projects-section-container {\n    grid-row: 2 / 3;\n    grid-column: 1 / 2;\n    background-color: var(--light-neutral-color);\n    min-height: calc(50vh - 4rem);\n}\n\n#projects-section-container * {\n    padding: 5px;\n    margin: 2px;\n}\n\n#tasks-due-today,\n#tasks-due-this-week {\n    margin: 2px 8px;\n}\n\n.project-item,\n.project-title,\n.project-edit-button,\n.project-remove-button,\n#tasks-due-today,\n#tasks-due-this-week {\n    cursor: pointer;\n}\n\n.project-item {\n    display: grid;\n    grid-template-columns: 1fr auto auto;\n}\n\n.project-item:hover,\n#tasks-due-today:hover,\n#tasks-due-this-week:hover {\n    background-color: var(--medium-light-neutral-color);\n}\n\n.project-item .project-title {\n    pointer-events: none;\n}\n\n/*----- TASKS -----*/\n#tasks-section-container {\n    grid-row: 2 / 3;\n    grid-column: 2 / 3;\n    min-height: calc(50vh - 4rem);\n}\n\n#tasks-section-container *:not(.task-item) {\n    padding: 5px;\n    margin: 2px;\n}\n\n.task-item {\n    position: relative;\n    background-color: var(--medium-light-neutral-color);\n    display: grid;\n    grid-template-columns: auto 1fr auto auto auto auto auto;\n    margin: 2px 2px 2px 18px;\n    padding: 5px;\n    box-shadow: -18px 0px 0px red;\n}\n\n.task-item::before {\n    position: absolute;\n    writing-mode: tb-rl;\n    transform: rotate(180deg);\n    left: -18px;\n    bottom: 0;\n    top: 0;\n    width: 18px;\n    text-align: center;\n}\n\n.task-checkbox {\n    transform: scale(1.5);\n}\n\n/*----- FOOTER -----*/\nfooter {\n    grid-row: 3 / 4;\n    grid-column: 1 / 3;\n    background-color: var(--main-color);\n}\n\n/*----- MODAL -----*/\n#modal {\n    /* visibility: hidden; */\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(255, 255, 255, 0.5);\n}\n\n#modal-card {\n    position: relative;\n    width: clamp(35ch, 70%, 50ch);\n    height: 300px;\n    border-radius: 5px;\n    margin: auto;\n    top: 25%;\n    border: 2px solid red;\n    background-color: var(--light-neutral-color);\n}\n\n#modal-header {\n    display: flex;\n    justify-content: space-between;\n}\n\n/*----- DYNAMIC STYLES -----*/\n.hide {\n    display: none;\n}\n\n.selected-project {\n    background-color: yellow;\n}\n\n.not-selected {\n    background-color: white;\n}\n\n.completed {\n    opacity: 0.7;\n}\n\n.completed .task-title {\n    text-decoration: line-through;\n}\n\n.low-priority.task-item::before {\n    content: 'low';\n}\n\n.medium-priority.task-item::before {\n    content: 'mid';\n}\n\n.high-priority.task-item::before {\n    content: 'high';\n}\n\n.low-priority {\n    box-shadow: -18px 0px 0px lightgreen;\n}\n\n.medium-priority {\n    box-shadow: -18px 0px 0px yellow;\n}\n\n.high-priority {\n    box-shadow: -18px 0px 0px lightcoral;\n}\n\n/*----- NARROW WIDTH -----*/\n\n@media only screen and (max-width: 768px) {\n    #main-container {\n        display: grid;\n        grid-template-columns: auto;\n        grid-template-rows: 5rem auto auto 3rem;\n    }\n\n    header,\n    #project-section-container,\n    #tasks-section-container,\n    footer {\n        grid-row: auto;\n        grid-column: auto;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _handlers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers.js */ "./src/handlers.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");


 // const toDoList = [
//     {
//         title: 'Big project',
//         tasks: [
//             {
//                 title: 'Take out the trash',
//                 description: 'I have to take out the trash on Sunday',
//                 dueDate: '2022-09-04',
//                 priority: 'High',
//             },
//             {
//                 title: 'Donate clothes',
//                 description: 'Donate unused clothes to Value Village.',
//                 dueDate: '2022-09-07',
//                 priority: 'Low',
//             }
//         ],
//     },
//     {
//         title: 'Mini project',
//         tasks: [
//             {
//                 title: 'Go for a jog',
//                 description: 'Jog 4km in 20 minutes.',
//                 dueDate: '2022-09-15',
//                 priority: 'Medium',
//             }
//         ]
//     }
// ];
// Run update UI
// dom.updateUi(toDoList, 0, 0, 0);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map