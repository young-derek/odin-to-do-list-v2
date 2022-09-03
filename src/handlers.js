import dom from './dom.js';
import tasks from './tasks.js';
import projects from './projects.js';

const handlers = (() => {
    const modal = document.querySelector('#modal');
    const modalHeaderTitle = document.querySelector('#modal-header-title');
    const modalTitleDiv = document.querySelector('#modal-title-div');
    const modalButtons = document.querySelector('#modal-buttons');
    const modalSubmitButton = document.querySelector('#modal-submit-button');
    const modalCancelButton = document.querySelector('#modal-cancel-button');
    const modalTaskInput = document.querySelector('#modal-task-input');
    const modalTitleInput = document.querySelector('#modal-title-input');
    const modalTitleError = document.querySelector('#modal-title-error');
    const modalTaskDescriptionInput = document.querySelector(
        '#modal-task-description-input'
    );
    const modalTaskDueDateInput = document.querySelector(
        '#modal-task-due-date-input'
    );
    const modalTaskPrioritySelect = document.querySelector(
        '#modal-task-priority-select'
    );
    const modalViewInfo = document.querySelector('#modal-view-info');
    const modalViewTaskTitleInfo = document.querySelector(
        '#modal-view-task-title-info'
    );
    const modalViewTaskDescriptionInfo = document.querySelector(
        '#modal-view-task-description-info'
    );
    const modalViewTaskDueDateInfo = document.querySelector(
        '#modal-view-task-due-date-info'
    );
    const modalViewTaskPriorityInfo = document.querySelector(
        '#modal-view-task-priority-info'
    );
    const addProjectButton = document.querySelector('#add-project-button');
    const addTaskButton = document.querySelector('#add-task-button');
    const projectList = document.querySelector('#project-list');
    const tasksDueToday = document.querySelector('#tasks-due-today');
    const tasksDueThisWeek = document.querySelector('#tasks-due-this-week');
    const taskList = document.querySelector('#task-list');

    let selectedProject = 0;
    let taskIndex = 0;
    let projectIndex = 0;
    let taskDisplayMode = 'project';
    let addOrEditMode = 'add';

    // DISPLAY NEW PROJECT MODAL
    addProjectButton.addEventListener('click', () => {
        // Update add or edit mode
        addOrEditMode = 'add';

        // Update the project index
        projectIndex = projects.toDoList.length;

        // Reset the modal form
        modal.reset();

        // Show add new project DOM elements
        dom.showElements(modal, modalTitleDiv, modalButtons, modalSubmitButton);

        // Change the modal title
        modalHeaderTitle.textContent = 'Add Project';
    });

    // DISPLAY NEW TASK MODAL
    addTaskButton.addEventListener('click', () => {
        // Update add or edit mode
        addOrEditMode = 'add';

        // Reset the modal form
        modal.reset();

        // Show add new task DOM elements
        dom.showElements(
            modal,
            modalTitleDiv,
            modalTaskInput,
            modalButtons,
            modalSubmitButton
        );

        // Change the modal title
        modalHeaderTitle.textContent = 'Add Task';
    });

    // SHOW TASKS DUE TODAY
    tasksDueToday.addEventListener('click', () => {
        // Update task display mode
        taskDisplayMode = 'today';

        // Hide the add task button
        dom.hideElements(addTaskButton);

        // Update the task display
        dom.createTaskElements(
            projects.toDoList,
            taskDisplayMode,
            selectedProject
        );
    });

    // SHOW TASKS DUE THIS WEEK
    tasksDueThisWeek.addEventListener('click', () => {
        // Update task display mode
        taskDisplayMode = 'week';

        // Hide the add task button
        dom.hideElements(addTaskButton);

        // Update the task display
        dom.createTaskElements(
            projects.toDoList,
            taskDisplayMode,
            selectedProject
        );
    });

    // ADD OR EDIT PROJECT
    modalSubmitButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Validate title has been entered
        if (modalTitleInput.value !== '') {
            if (addOrEditMode === 'add') {
                // Push new project to the to do list array
                projects.toDoList.push(projects.Project(modalTitleInput.value));

            } else if (addOrEditMode === 'edit') {
                // Replace selected project's title with new value
                projects.toDoList[projectIndex].title = modalTitleInput.value;
            }
            
            // Hide modal elements
            dom.hideElements(
                modal,
                modalTitleDiv,
                modalButtons,
                modalSubmitButton,
                modalTitleError
            );

            // Update project list
            dom.updateProjectListDisplay(projects.toDoList);

        } else {
            modalTitleError.classList.remove('hide');
        }
    });

    // ADD OR EDIT TASK - todo

    // MODAL CANCEL BUTTON
    modalCancelButton.addEventListener('click', (event) => {});

    // PROJECT LIST HANDLERS
    projectList.addEventListener('click', (event) => {
        // SHOW A PROJECT'S TASKS, UPDATE SELECTED PROJECT
        if (event.target.classList.contains('project-title')) {
            // Set display mode to project
            taskDisplayMode = 'project';

            // Display the add task button
            dom.showElements(addTaskButton);

            // Update selected project
            selectedProject = event.target.parentElement.dataset.index;

            // Update the task display
            dom.createTaskElements(
                projects.toDoList,
                taskDisplayMode,
                selectedProject
            );
        } else if (event.target.classList.contains('project-item')) {
            // Set display mode to project
            taskDisplayMode = 'project';

            // Display the add task button
            dom.showElements(addTaskButton);

            // Update selected project
            selectedProject = event.target.dataset.index;

            // Update the task display
            dom.createTaskElements(
                projects.toDoList,
                taskDisplayMode,
                selectedProject
            );
        }

        // SHOW EDIT PROJECT MODAL, UPDATE EDIT INDEX
        if (event.target.classList.contains('project-edit-button')) {
            // Update add or edit mode
            addOrEditMode = 'edit';

            // Update project edit index
            projectIndex = event.target.parentElement.dataset.index;

            // Show the edit project modal
            dom.showElements(modal, modalTitleDiv, modalButtons, modalSubmitButton);

            // Pre-fill the project title input with the selected project's title
            dom.showEditProjectDetails(
                projects.toDoList,
                modalTitleInput,
                projectIndex
            );

            // Update the modal header title
            modalHeaderTitle.textContent = 'Edit Project';
        }

        // REMOVE A PROJECT
        if (event.target.classList.contains('project-remove-button')) {
            // Update the project index
            projectIndex = event.target.parentElement.dataset.index;

            // Remove the project from the toDoList array
            projects.toDoList.splice(projectIndex, 1);

            // Update the selected project if necessary
            if (
                selectedProject > 0 &&
                selectedProject > projects.toDoList.length - 1
            ) {
                selectedProject--;
            }

            // Update the UI
            dom.updateUi(projects.toDoList, taskDisplayMode, selectedProject);
        }
    });

    // TASK LIST HANDLERS
    taskList.addEventListener('click', (event) => {
        // VIEW TASK DETAILS
        if (event.target.classList.contains('task-details-button')) {
            // Update the task index
            taskIndex = event.target.parentElement.dataset.taskIndex;
            // Update the project index
            projectIndex = event.target.parentElement.dataset.projectIndex;
            // Display the task modal
            dom.showElements(modal, modalViewInfo);
            // Populate the task modal with the selected task's data
            dom.showViewTaskDetails(
                projects.toDoList,
                projectIndex,
                taskIndex,
                modalViewTaskTitleInfo,
                modalViewTaskDescriptionInfo,
                modalViewTaskDueDateInfo,
                modalViewTaskPriorityInfo
            );

            // Update the modal title
            modalHeaderTitle.textContent = 'View Task Details';
        }

        // EDIT TASK
        if (event.target.classList.contains('task-edit-button')) {
            // Update add or edit mode
            addOrEditMode = 'edit';

            // Update the task edit index
            taskIndex = event.target.parentElement.dataset.taskIndex;

            // Update the project index
            projectIndex = event.target.parentElement.dataset.projectIndex;

            // Display the edit modal
            dom.showElements(
                modal,
                modalTitleDiv,
                modalTaskInput,
                modalSubmitButton
            );

            // Update the edit modal header title
            modalHeaderTitle.textContent = 'Edit Task';

            // Pre-fill the modal inputs with the selected task's details
            dom.showEditTaskDetails(
                projects.toDoList,
                projectIndex,
                taskIndex,
                modalTitleInput,
                modalTaskDescriptionInput,
                modalTaskDueDateInput,
                modalTaskPrioritySelect
            );
        }

        // REMOVE TASK
        if (event.target.classList.contains('task-remove-button')) {
            // Update the task index
            taskIndex = event.target.parentElement.dataset.index;

            // Remove the task from the selected project
            projects.toDoList[selectedProject].tasks.splice(taskIndex, 1);

            // Update the task list
            dom.createTaskElements(
                projects.toDoList,
                taskDisplayMode,
                selectedProject
            );
        }
    });

    // UPDATE UI ON PAGE LOAD
    (() => {
        dom.updateUi(projects.toDoList, taskDisplayMode, selectedProject);
    })();
})();

export default handlers;
