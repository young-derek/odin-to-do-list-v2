import projects from './projects';
import dom from './dom';

const tasks = (() => {
    function addTask(
        title,
        description,
        dueDate,
        priority,
        projectIndex,
        taskIndex
    ) {
        const task = Task(
            title,
            description,
            dueDate,
            priority,
            projectIndex,
            taskIndex
        );
        projects.toDoList[projectIndex].tasks.push(task);
    }

    function editTask(
        title,
        description,
        dueDate,
        priority,
        projectIndex,
        taskIndex
    ) {
        projects.toDoList[projectIndex].tasks[taskIndex].title = title;
        projects.toDoList[projectIndex].tasks[taskIndex].description =
            description;
        projects.toDoList[projectIndex].tasks[taskIndex].dueDate = dueDate;
        projects.toDoList[projectIndex].tasks[taskIndex].priority = priority;
    }

    function removeTask(projectIndex, taskIndex) {
        projects.toDoList[projectIndex].tasks[taskIndex].splice(taskIndex, 1);
    }

    // TASK FACTORY FUNCTION
    const Task = (
        title,
        description,
        dueDate,
        priority,
        taskIndex,
        projectIndex
    ) => {
        return {
            title,
            description,
            dueDate,
            priority,
            taskIndex,
            projectIndex,
            completed: false,
        };
    };

    return { Task, addTask, editTask, removeTask };
})();

export default tasks;
