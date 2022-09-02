import dom from './dom.js';
import tasks from './tasks.js';
import projects from './projects.js';

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

const handlers = (() => {
    const modal = document.querySelector('#modal');
    const modalHeaderTitle = document.querySelector('#modal-header-title');
    const modalTitleDiv = document.querySelector('#modal-title-div');
    const modalButtons = document.querySelector('#modal-buttons');
    const modalSubmitButton = document.querySelector('#modal-submit-button');
    const modalTaskInput = document.querySelector('#modal-task-input');
    const addProjectButton = document.querySelector('#add-project-button');
    const addTaskButton = document.querySelector('#add-task-button');
    const projectList = document.querySelector('#project-list');
    const projectsSectionContainer = document.querySelector(
        '#projects-section-container'
    );
    const tasksDueToday = document.querySelector('#tasks-due-today');
    const tasksDueThisWeek = document.querySelector('#tasks-due-this-week');

    let selectedProject = 0;

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

    // DISPLAY PROJECT EDIT MODAL - todo
    // DISPLAY TASK EDIT MODAL - todo
    // DISPLAY TASK DETAILS MODAL - todo
    // SUBMIT NEW PROJECT - todo
    // SUBMIT NEW TASK - todo

    // PROJECT SECTION SELECTION FUNCTIONALITY
    projectsSectionContainer.addEventListener('click', (event) => {
        // If user clicks Today, display today's tasks
        if (event.target === tasksDueToday) {
            dom.updateTaskListDisplay(toDoList, selectedProject, true, false);
        }

        // If user clicks This Week, display this week's tasks
        else if (event.target === tasksDueThisWeek) {
            dom.updateTaskListDisplay(toDoList, selectedProject, false, true);
        }

        // If target is a project, display the project's tasks
        else if (
            event.target.classList.contains('project-title')
        ) {
            selectedProject = event.target.parentElement.dataset.index;
            dom.updateTaskListDisplay(toDoList, selectedProject, false, false);
        }
    });
})();

export default handlers;
