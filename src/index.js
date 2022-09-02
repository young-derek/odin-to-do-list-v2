import dom from './dom';
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

// Run update UI
dom.updateUi(toDoList);
