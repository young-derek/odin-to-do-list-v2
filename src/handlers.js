import dom from './dom.js';
import tasks from './tasks.js';
import projects from './projects.js';

const handlers = (() => {
    const modal = document.querySelector('#modal');
    const modalHeader = document.querySelector('#modal-header-title');
    const modalTitleDiv = document.querySelector('#modal-title-div');
    const modalButtons = document.querySelector('#modal-buttons');

    // ADD PROJECT BUTTON EVENT LISTENER
    const addProjectButton = document.querySelector('#add-project-button');
    addProjectButton.addEventListener('click', () => {
        displayProjectModal();
    });
})();

export default handlers;
