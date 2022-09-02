import projects from "./projects";
import dom from './dom';

const tasks = (() => {

    // TASK PROTOTYPE
    const taskActions = {
        addTask(title, description, dueDate, priority, projectIndex, taskIndex) {
            const task = Task(title, description, dueDate, priority, projectIndex, taskIndex)
            projects.toDoList[projectIndex].tasks.push(task);
        },
        editTask(title, description, dueDate, priority, projectIndex, taskIndex) {
            projects.toDoList[projectIndex].tasks[taskIndex].title = title;
            projects.toDoList[projectIndex].tasks[taskIndex].description = description;
            projects.toDoList[projectIndex].tasks[taskIndex].dueDate = dueDate;
            projects.toDoList[projectIndex].tasks[taskIndex].priority = priority;
        },
        removeTask(projectIndex, taskIndex) {
            projects.toDoList[projectIndex].tasks[taskIndex].splice(taskIndex, 1);
        },
    }

    // TASK FACTORY FUNCTION
    const Task = (title, description, dueDate, priority, taskIndex, projectIndex) => {
        let task = Object.create(taskActions);
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.taskIndex = taskIndex;
        task.projectIndex = projectIndex;
        return task;
    };

    return {Task};
})();

export default tasks;
