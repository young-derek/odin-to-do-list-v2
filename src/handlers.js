import dom from './dom.js';
import tasks from './tasks.js';
import projects from './projects.js';

const handlers = (() => {
    const toDoList = [
        {
            title: 'Big project',
            tasks: [
                {
                    title: 'Take out the trash',
                    description: 'I have to take out the trash on Sunday',
                    dueDate: '2022-09-02',
                    priority: 'High',
                },
                {
                    title: 'Donate clothes',
                    description: 'Donate unused clothes to Value Village.',
                    dueDate: '2022-09-07',
                    priority: 'Low',
                },
            ],
        },
        {
            title: 'Mini project',
            tasks: [
                {
                    title: 'Go for a jog',
                    description: 'Jog 4km in 20 minutes.',
                    dueDate: '2022-09-15',
                    priority: 'Medium',
                },
            ],
        },
    ];

    const modal = document.querySelector('#modal');
    const modalHeaderTitle = document.querySelector('#modal-header-title');
    const modalTitleDiv = document.querySelector('#modal-title-div');
    const modalButtons = document.querySelector('#modal-buttons');
    const modalSubmitButton = document.querySelector('#modal-submit-button');
    const modalTaskInput = document.querySelector('#modal-task-input');
    const modalTitleInput = document.querySelector('#modal-title-input');
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

    // DISPLAY NEW PROJECT MODAL
    addProjectButton.addEventListener('click', () => {
        // Reset the modal form
        modal.reset();

        // Show add new project DOM elements
        dom.showElements(modal, modalTitleDiv, modalButtons, modalSubmitButton);

        // Change the modal title
        modalHeaderTitle.textContent = 'Add Project';
    });

    // DISPLAY NEW TASK MODAL
    addTaskButton.addEventListener('click', () => {
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
        dom.updateTaskListDisplay(toDoList, selectedProject, true, false);
    });

    // SHOW TASKS DUE THIS WEEK
    tasksDueThisWeek.addEventListener('click', () => {
        dom.updateTaskListDisplay(toDoList, selectedProject, false, true);
    });

    // REMOVE TASK
    // SUBMIT NEW PROJECT - todo
    // SUBMIT NEW TASK - todo

    // PROJECT LIST HANDLERS
    projectList.addEventListener('click', (event) => {
        // SHOW A PROJECT'S TASKS, UPDATE SELECTED PROJECT
        if (event.target.classList.contains('project-title')) {
            selectedProject = event.target.parentElement.dataset.index;
            dom.updateTaskListDisplay(toDoList, selectedProject, false, false);
        } else if (event.target.classList.contains('project-item')) {
            selectedProject = event.target.dataset.index;
            dom.updateTaskListDisplay(toDoList, selectedProject, false, false);
        }

        // SHOW EDIT PROJECT MODAL, UPDATE EDIT INDEX
        if (event.target.classList.contains('project-edit-button')) {
            // Update project edit index
            projectIndex = event.target.parentElement.dataset.index;

            // Show the edit project modal
            dom.showElements(modal, modalTitleDiv, modalSubmitButton);

            // Pre-fill the project title input with the selected project's title
            dom.showEditProjectDetails(toDoList, modalTitleInput, projectIndex);

            // Update the modal header title
            modalHeaderTitle.textContent = 'Edit Project';
        }

        // REMOVE A PROJECT
        if (event.target.classList.contains('project-remove-button')) {
            // Remove the project from the toDoList array
            toDoList.splice(event.target.parentElement.dataset.index, 1);

            // Update the selected project if necessary
            if (selectedProject > toDoList.length - 1) {
                selectedProject--;
            }

            // Update the UI
            dom.updateUi(toDoList, selectedProject, false, false);
        }
    });

    // TASK LIST HANDLERS
    taskList.addEventListener('click', (event) => {
        // SHOW TASK DETAILS MODAL
        if (event.target.classList.contains('task-details-button')) {
            // Update the task index
            taskIndex = event.target.parentElement.dataset.index;
            // Display the task modal
            dom.showElements(modal, modalViewInfo);
            // Populate the task modal with the selected task's data
            dom.showViewTaskDetails(
                toDoList,
                selectedProject,
                taskIndex,
                modalViewTaskTitleInfo,
                modalViewTaskDescriptionInfo,
                modalViewTaskDueDateInfo,
                modalViewTaskPriorityInfo
            );

            // Update the modal title
            modalHeaderTitle.textContent = 'View Task Details';
        }

        // SHOW TASK EDIT MODAL, UPDATE TASK EDIT INDEX
        if (event.target.classList.contains('task-edit-button')) {
            // Update the task edit index
            taskIndex = event.target.parentElement.dataset.index;

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
                toDoList,
                selectedProject,
                taskIndex,
                modalTitleInput,
                modalTaskDescriptionInput,
                modalTaskDueDateInput,
                modalTaskPrioritySelect
            );
        }
    });
})();

export default handlers;
