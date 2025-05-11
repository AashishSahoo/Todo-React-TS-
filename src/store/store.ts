import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { type Todo } from "./todoSlice";

export interface RootState {
  todos: {
    todos: Todo[];
    filter: {
      task: string;
      status: string;
    };
  };
}

const loadState = (): RootState["todos"] => {
  try {
    const data = localStorage.getItem("todos");
    const parsed = data ? JSON.parse(data) : null;

    if (
      parsed &&
      Array.isArray(parsed.todos) &&
      typeof parsed.filter?.task === "string" &&
      typeof parsed.filter?.status === "string"
    ) {
      return parsed;
    }

    return {
      todos: [],
      filter: {
        task: "",
        status: "all",
      },
    };
  } catch (e) {
    console.error("Error loading state from localStorage", e);
    return {
      todos: [],
      filter: {
        task: "",
        status: "all",
      },
    };
  }
};

const saveState = (state: RootState): void => {
  try {
    const data = JSON.stringify(state.todos);
    localStorage.setItem("todos", data);
  } catch (e) {
    console.error("Error saving state to localStorage", e);
  }
};

const preloadedState = {
  todos: loadState(),
};

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;

export default store;
