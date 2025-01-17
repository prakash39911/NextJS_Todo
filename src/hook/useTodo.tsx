import { useEffect, useState } from "react";
import useTodoStore from "./useTodoStore";

export const useTodo = (initialTodos: eachTodo[]) => {
  const [isLoading, setIsLoading] = useState(true);

  const todos = useTodoStore((state) => state.todos);
  const add = useTodoStore((state) => state.add);

  useEffect(() => {
    if (!todos || todos.length === 0) {
      add(initialTodos);
    }
    setIsLoading(false);
  }, [add, initialTodos, todos]);

  return {
    todos,
    add,
    isLoading,
  };
};
