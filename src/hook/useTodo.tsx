import { useEffect, useState } from "react";
import useTodoStore from "./useTodoStore";

export const useTodo = (initialTodos: eachTodo[]) => {
  const [isLoading, setIsLoading] = useState(true);

  const todos = useTodoStore((state) => state.todos);
  const add = useTodoStore((state) => state.add);

  useEffect(() => {
    add(initialTodos);

    setIsLoading(false);
  }, [add, initialTodos]);

  return {
    todos,
    add,
    isLoading,
  };
};
