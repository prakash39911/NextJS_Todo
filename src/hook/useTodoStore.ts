import { create } from "zustand";
import { devtools } from "zustand/middleware";

type todoStore = {
  todos: eachTodo[];
  add: (todos: eachTodo[]) => void;
};

const useTodoStore = create<todoStore>()(
  devtools(
    (set) => ({
      todos: [],
      add: (todos) => set(() => ({ todos: todos })),
    }),
    { name: "TodoStoreZustand" }
  )
);

export default useTodoStore;
