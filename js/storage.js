const STORAGE_KEY = "todos";

export const saveTodos = (todos) => {
    if (todos === undefined) {
        return;
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.error("Unable to save todos:", error);
    }
};

export const loadTodos = () => {
    try {
        const savedTodos = localStorage.getItem(STORAGE_KEY);

        if (savedTodos === null) {
            return [];
        }

        const parsedTodos = JSON.parse(savedTodos);

        return Array.isArray(parsedTodos) ? parsedTodos : [];
    } catch (error) {
        console.error("Unable to load todos:", error);
        return [];
    }
};
