import tasks from './tasks.js';
import projects from './projects.js';

const dom = (() => {
    // UPDATE UI
    const updateUi = (toDoList, taskDisplayMode, selectedProject) => {
        // Update the project list
        updateProjectListDisplay(toDoList);

        // Update the task list
        createTaskElements(toDoList, taskDisplayMode, selectedProject);
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

    // UPDATE TASK AND PROJECT INDEXES
    function updateIndexes(toDoList) {
        let taskIndex = 0;
        let projectIndex = 0;
        toDoList.forEach((project) => {
            project.tasks.forEach((task) => {
                task.taskIndex = taskIndex;
                task.projectIndex = projectIndex;
                taskIndex++;
            });
            projectIndex++;
        });
    }

    // CREATE TASK DOM ELEMENTS
    function createTaskElements(toDoList, taskDisplayMode, selectedProject) {
        const taskList = document.querySelector('#task-list');
        // Clear current task list
        taskList.innerHTML = '';

        // Define task array
        let taskArray = [];

        // Define variables for today and 7 days from today
        let today = new Date();
        today = new Date(
            `'${today.getFullYear()}-${
                today.getMonth() + 1
            }-${today.getDate()}'`
        )
            .toISOString()
            .slice(0, 10);
            
        let nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        nextWeek = new Date(
            `'${nextWeek.getFullYear()}-${
                nextWeek.getMonth() + 1
            }-${nextWeek.getDate()}'`
        )
            .toISOString()
            .slice(0, 10);

        // Update task and project indexes on each task item
        updateIndexes(projects.toDoList);

        // Build the task array for the DOM based on display mode
        if (taskDisplayMode === 'today') {
            // Push tasks that are due today to the new array
            projects.toDoList.forEach((project) => {
                project.tasks.forEach((task) => {
                    if (task.dueDate === today) {
                        taskArray.push(task);
                    }
                });
            });
        } else if (taskDisplayMode === 'week') {
            // Push tasks that are due this week to the new array
            projects.toDoList.forEach((project) => {
                project.tasks.forEach((task) => {
                    if (task.dueDate >= today && task.dueDate <= nextWeek) {
                        taskArray.push(task);
                    }
                });
            });

            // Push tasks that are in the selected project to the new array
        } else if (taskDisplayMode === 'project') {
            if (projects.toDoList.length > 0) {
                taskArray = projects.toDoList[selectedProject].tasks;
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

                taskItem.dataset.taskIndex = task.taskIndex;
                taskItem.dataset.projectIndex = task.projectIndex;

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
    }

    // SHOW ELEMENTS
    function showElements() {
        Array.from(arguments).forEach((argument) => {
            argument.classList.remove('hide');
        });
    }

    // HIDE ELEMENTS
    function hideElements() {
        Array.from(arguments).forEach((argument) => {
            argument.classList.add('hide');
        });
    }

    // SHOW TASK DETAILS IN TASK EDIT MODAL
    function showEditTaskDetails(
        toDoList,
        projectIndex,
        taskIndex,
        modalTitleInput,
        modalTaskDescriptionInput,
        modalTaskDueDateInput,
        modalTaskPrioritySelect
    ) {
        modalTitleInput.value = toDoList[projectIndex].tasks[taskIndex].title;
        modalTaskDescriptionInput.value =
            toDoList[projectIndex].tasks[taskIndex].description;
        modalTaskDueDateInput.value =
            toDoList[projectIndex].tasks[taskIndex].dueDate;
        modalTaskPrioritySelect.value =
            toDoList[projectIndex].tasks[taskIndex].priority;
    }

    // SHOW TASK DETAILS IN TASK VIEW DETAIL MODAL
    function showViewTaskDetails(
        toDoList,
        projectIndex,
        taskIndex,
        modalViewTaskTitleInfo,
        modalViewTaskDescriptionInfo,
        modalViewTaskDueDateInfo,
        modalViewTaskPriorityInfo
    ) {
        modalViewTaskTitleInfo.textContent =
            toDoList[projectIndex].tasks[taskIndex].title;
        modalViewTaskDescriptionInfo.textContent =
            toDoList[projectIndex].tasks[taskIndex].description;
        modalViewTaskDueDateInfo.textContent =
            toDoList[projectIndex].tasks[taskIndex].dueDate;
        modalViewTaskPriorityInfo.textContent =
            toDoList[projectIndex].tasks[taskIndex].priority;
    }

    // SHOW PROJECT DETAILS IN PROJECT EDIT MODAL
    function showEditProjectDetails(toDoList, modalTitleInput, projectIndex) {
        modalTitleInput.value = toDoList[projectIndex].title;
    }

    // Return functions
    return {
        updateUi,
        showElements,
        hideElements,
        updateProjectListDisplay,
        showEditTaskDetails,
        showEditProjectDetails,
        showViewTaskDetails,
        createTaskElements,
        updateIndexes,
    };
})();

export default dom;
