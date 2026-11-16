const STORAGE_KEY = "todos";
const FILTER_KEY = "todoFilter";

export const saveTodos = (todos) => {
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

export const saveFilter = (filter) => {
    localStorage.setItem(FILTER_KEY, filter);
};

export const loadFilter = () => {
    const savedFilter = localStorage.getItem(FILTER_KEY);

    if (["all", "active", "completed"].includes(savedFilter)) {
        return savedFilter;
    }

    return "all";
};
