import { describe, it, expect } from "vitest";
import {
    addTodo,
    toggleTodo,
    deleteTodo,
    filterTodos,
    countTodos,
} from "../js/todo-logic.js";

const sampleTodos = [
    { id: 1, text: "Study JavaScript", completed: false },
    { id: 2, text: "Complete assignment", completed: true },
];

describe("Todo Logic", () => {
    it("adds a new todo", () => {
        const result = addTodo(sampleTodos, "Read a book");

        expect(result).toHaveLength(3);
        expect(result[2].text).toBe("Read a book");
    });

    it("does not add empty text", () => {
        expect(addTodo(sampleTodos, "   ")).toEqual(sampleTodos);
    });

    it("toggles a todo", () => {
        const result = toggleTodo(sampleTodos, 1);

        expect(result[0].completed).toBe(true);
    });

    it("does not change the original array", () => {
        const original = [...sampleTodos];

        toggleTodo(sampleTodos, 1);

        expect(sampleTodos).toEqual(original);
    });

    it("deletes a todo", () => {
        const result = deleteTodo(sampleTodos, 1);

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(2);
    });

    it("filters active todos", () => {
        expect(filterTodos(sampleTodos, "active")).toHaveLength(1);
    });

    it("filters completed todos", () => {
        expect(filterTodos(sampleTodos, "completed")).toHaveLength(1);
    });

    it("counts todos correctly", () => {
        expect(countTodos(sampleTodos)).toEqual({
            total: 2,
            active: 1,
            completed: 1,
        });
    });

    it("handles an empty list", () => {
        expect(countTodos([])).toEqual({
            total: 0,
            active: 0,
            completed: 0,
        });
    });
});
