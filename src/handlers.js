import dom from './dom.js';
import tasks from './tasks.js';
import projects from './projects.js';

const handlers = (() => {
    const modal = document.querySelector('#modal');
    const modalHeaderTitle = document.querySelector('#modal-header-title');
    const modalTitleDiv = document.querySelector('#modal-title-div');
    const modalButtons = document.querySelector('#modal-buttons');
    const modalSubmitButton = document.querySelector('#modal-submit-button');
    const modalTaskInput = document.querySelector('#modal-task-input');
    const addProjectButton = document.querySelector('#add-project-button');
    const addTaskButton = document.querySelector('#add-task-button');

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
            modalSubmitButton);

        // Change the modal title
        modalHeaderTitle.textContent = 'Add Task';
    });
})();

export default handlers;
