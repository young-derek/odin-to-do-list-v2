const projects = (() => {
    // PROJECT FACTORY FUNCTION
    const Project = (title) => {
        return {
            title,
            tasks: [],
        };
    };
})();

export default projects;
