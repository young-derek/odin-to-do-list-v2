const projects = (() => {
    // TO DO LIST
    const toDoList = [
        {
            title: 'Big project',
            tasks: [
                {
                    title: 'Take out the trash',
                    description: 'I have to take out the trash on Sunday',
                    dueDate: '2022-09-02',
                    priority: 'High',
                    taskIndex: 0,
                    projectIndex: 0,
                },
                {
                    title: 'Donate clothes',
                    description: 'Donate unused clothes to Value Village.',
                    dueDate: '2022-09-07',
                    priority: 'Low',
                    taskIndex: 1,
                    projectIndex: 0,
                },
            ],
        },
        {
            title: 'Mini project',
            tasks: [
                {
                    title: 'Go for a jog',
                    description: 'Jog 4km in 20 minutes.',
                    dueDate: '2022-09-15',
                    priority: 'Medium',
                    taskIndex: 0,
                    projectIndex: 1,
                },
            ],
        },
    ];

    // PROJECT PROTOTYPE
    const projectActions = {
        addProject() {},
        editProject() {},
        removeProject() {},
    };

    // PROJECT FACTORY FUNCTION
    const Project = (title) => {
        let project = Object.create(projectActions);
        project.title = title;
        project.tasks = [];
        return project;
    };
    return {toDoList, Project};
})();

export default projects;
