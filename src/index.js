import dom from './dom.js';
import handlers from './handlers.js';
import './style.css';

const toDoList = [
    {
        title: 'Big project',
        tasks: [
            {
                title: 'Take out the trash',
                description: 'I have to take out the trash on Sunday',
                dueDate: '2022-09-04',
                priority: 'High',
            },
        ],
    },
];

// SHOW NEW PROJECT MODAL
const displayProjectModal = () => {
    const modal = document.querySelector('#modal');
    const modalHeader = document.querySelector('#modal-header-title');
    const modalTitleDiv = document.querySelector('#modal-title-div');
    const modalButtons = document.querySelector('#modal-buttons');
};

// Run update UI
dom.updateUi(toDoList);
