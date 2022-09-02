import tasks from './tasks.js';
import projects from './projects.js';

const dom = (() => {
    // UPDATE UI
    const updateUi = (
        toDoList,
        selectedProject,
        clickedToday,
        clickedThisWeek
    ) => {
        // Update the project list
        updateProjectListDisplay(toDoList);

        // Update the task list
        updateTaskListDisplay(
            toDoList,
            selectedProject,
            clickedToday,
            clickedThisWeek
        );
    };

    // UPDATE PROJECT LIST DISPLAY
    const updateProjectListDisplay = (toDoList) => {
        // Variable to track project index
        let projectIndex = 0;

        // Clear the current UI of projects and tasks
        const projectList = document.querySelector('#project-list');
        projectList.innerHTML = '';

        // Create projects and tasks in the dom based on the to do list
        toDoList.forEach((project) => {
            // Create a new project item's elements
            const projectItem = document.createElement('li');
            const projectTitle = document.createElement('p');
            const projectEditButton = document.createElement('button');
            const projectRemoveButton = document.createElement('button');

            projectTitle.textContent = project.title;
            projectEditButton.textContent = 'Edit';
            projectRemoveButton.textContent = 'Remove';

            projectItem.classList.add('project-item');
            projectTitle.classList.add('project-title');
            projectEditButton.classList.add('project-edit-button');
            projectRemoveButton.classList.add('project-remove-button');

            projectItem.dataset.index = projectIndex;

            // Increment the project index
            projectIndex++;

            // Append the project to the DOM
            projectItem.append(
                projectTitle,
                projectEditButton,
                projectRemoveButton
            );
            projectList.append(projectItem);
        });
    };

    // UPDATE TASK LIST DISPLAY
    const updateTaskListDisplay = (
        toDoList,
        selectedProject,
        clickedToday,
        clickedThisWeek
    ) => {
        const taskList = document.querySelector('#task-list');
        taskList.innerHTML = '';

        // Variable to track task index
        let taskIndex = 0;
        let taskArray = [];
        const today = new Date().toISOString().slice(0, 10);
        let nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        nextWeek = nextWeek.toISOString().slice(0, 10);

        // Determine task array to iterate over and append to DOM
        if (clickedToday) {
            toDoList.forEach((project) => {
                taskArray.push(
                    ...project.tasks.filter((task) => task.dueDate === today)
                );
            });
        } else if (clickedThisWeek) {
            toDoList.forEach((project) => {
                taskArray.push(
                    ...project.tasks.filter(
                        (task) =>
                            task.dueDate >= today && task.dueDate <= nextWeek
                    )
                );
            });
        } else {
            if (toDoList.length > 0) {
                taskArray = toDoList[selectedProject].tasks;
            }
        }

        // If there are any projects in the to do list
        if (toDoList.length > 0) {
            // Create task items in the DOM
            taskArray.forEach((task) => {
                const taskItem = document.createElement('li');
                const taskCheckbox = document.createElement('input');
                const taskTitle = document.createElement('p');
                const taskDueDate = document.createElement('p');
                const taskDetailsButton = document.createElement('button');
                const taskEditButton = document.createElement('button');
                const taskRemoveButton = document.createElement('button');

                taskItem.classList.add('task-item');
                taskCheckbox.classList.add('task-checkbox');
                taskTitle.classList.add('task-title');
                taskDueDate.classList.add('task-due-date');
                taskDetailsButton.classList.add('task-details-button');
                taskEditButton.classList.add('task-edit-button');
                taskRemoveButton.classList.add('task-remove-button');

                taskTitle.textContent = task.title;
                taskDueDate.textContent = task.dueDate;
                taskDetailsButton.textContent = 'View Details';
                taskEditButton.textContent = 'Edit';
                taskRemoveButton.textContent = 'Remove';

                taskCheckbox.setAttribute('type', 'checkbox');

                taskItem.dataset.index = taskIndex;

                // Increment the task index
                taskIndex++;

                // Append task to the DOM
                taskItem.append(
                    taskCheckbox,
                    taskTitle,
                    taskDueDate,
                    taskDetailsButton,
                    taskEditButton,
                    taskRemoveButton
                );
                taskList.append(taskItem);
            });
        }
    };

    // SHOW ELEMENTS
    function showElements() {
        Array.from(arguments).forEach((argument) => {
            argument.classList.remove('hide');
        });
    };

    // HIDE ELEMENTS
    function hideElements() {
        Array.from(arguments).forEach((argument) => {
            argument.classList.add('hide');
        });
    };

    // REMOVE A PROJECT
    const removeProject = (projectIndex) => {};

    // Return functions
    return {
        updateUi,
        showElements,
        hideElements,
        updateTaskListDisplay,
        updateProjectListDisplay,
    };
})();

export default dom;
