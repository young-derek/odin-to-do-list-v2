const tasks = (() => {
    // TASK FACTORY FUNCTION
    const Task = (title, description, dueDate, priority) => {
        return {
            title,
            description,
            dueDate,
            priority,
        };
    };
})();

export default tasks;
