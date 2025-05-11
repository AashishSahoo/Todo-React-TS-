import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  timeStamp: string;
}

interface FilterState {
  task: string;
  status: string;
}

interface TodoState {
  todos: Todo[];
  filter: FilterState;
}

const initialState: TodoState = {
  todos: [],
  filter: {
    task: "",
    status: "all",
  },
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: new Date().getTime(),
        title: action.payload,
        completed: false,
        timeStamp: new Date().toLocaleString(),
      };
      state.todos.push(newTodo);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; title: string; completed: boolean }>
    ) => {
      const { id, title, completed } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.title = title;
        todo.completed = completed;
        todo.timeStamp = new Date().toLocaleString();
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<FilterState>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, setFilter } = todoSlice.actions;

export const selectFilteredTodos = createSelector(
  [
    (state: RootState) => state.todos.todos,
    (state: RootState) => state.todos.filter,
  ],
  (todos, filter) => {
    const filtered = todos.filter((todo) => {
      const matchesTask = todo.title
        .toLowerCase()
        .includes(filter.task.toLowerCase());
      const matchesStatus =
        filter.status === "all" ||
        (filter.status === "completed" && todo.completed) ||
        (filter.status === "pending" && !todo.completed);
      return matchesTask && matchesStatus;
    });
    return filtered.sort(
      (a, b) =>
        new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
    );
  }
);

export default todoSlice.reducer;
