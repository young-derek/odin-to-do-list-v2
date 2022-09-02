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
        displayProjectTasks(
            toDoList,
            selectedProject,
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

    // DISPLAY TODAY'S TASKS
    function displayTodaysTasks(toDoList) {
        let taskArray = [];
        const today = new Date().toISOString().slice(0, 10);

        toDoList.forEach((project) => {
            taskArray.push(
                ...project.tasks.filter((task) => task.dueDate === today)
            );
        });
        createTaskElements(toDoList, taskArray);
    }
    // DISPLAY THIS WEEK'S TASKS
    function displayWeeksTasks(toDoList) {
        let taskArray = [];
        const today = new Date().toISOString().slice(0, 10);
        let nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        nextWeek = nextWeek.toISOString().slice(0, 10);

        toDoList.forEach((project) => {
            taskArray.push(
                ...project.tasks.filter(
                    (task) =>
                        task.dueDate >= today && task.dueDate <= nextWeek
                )
            );
        });

        createTaskElements(toDoList, taskArray);
    }
    // DISPLAY SELECTED PROJECT'S TASKS - todo
    function displayProjectTasks(toDoList, selectedProject) {
        createTaskElements(toDoList, toDoList[selectedProject].tasks);
    }

    // CREATE TASK DOM ELEMENTS
    function createTaskElements(toDoList, taskArray) {
        const taskList = document.querySelector('#task-list');
        taskList.innerHTML = '';
        let taskIndex = 0;

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
        selectedProject,
        taskIndex,
        modalTitleInput,
        modalTaskDescriptionInput,
        modalTaskDueDateInput,
        modalTaskPrioritySelect
    ) {
        modalTitleInput.value =
            toDoList[selectedProject].tasks[taskIndex].title;
        modalTaskDescriptionInput.value =
            toDoList[selectedProject].tasks[taskIndex].description;
        modalTaskDueDateInput.value =
            toDoList[selectedProject].tasks[taskIndex].dueDate;
        modalTaskPrioritySelect.value =
            toDoList[selectedProject].tasks[taskIndex].priority;
    }

    // SHOW TASK DETAILS IN TASK VIEW DETAIL MODAL
    function showViewTaskDetails(
        toDoList,
        selectedProject,
        taskIndex,
        modalViewTaskTitleInfo,
        modalViewTaskDescriptionInfo,
        modalViewTaskDueDateInfo,
        modalViewTaskPriorityInfo
    ) {
        modalViewTaskTitleInfo.textContent =
            toDoList[selectedProject].tasks[taskIndex].title;
        modalViewTaskDescriptionInfo.textContent =
            toDoList[selectedProject].tasks[taskIndex].description;
        modalViewTaskDueDateInfo.textContent =
            toDoList[selectedProject].tasks[taskIndex].dueDate;
        modalViewTaskPriorityInfo.textContent =
            toDoList[selectedProject].tasks[taskIndex].priority;
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
        displayTodaysTasks,
        displayWeeksTasks,
        displayProjectTasks,
    };
})();

export default dom;
