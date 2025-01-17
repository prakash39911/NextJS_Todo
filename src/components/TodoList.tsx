"use client";

import React, { useEffect } from "react";
import EachTodo from "./EachTodo";
import { useTodo } from "@/hook/useTodo";
import Loading from "@/app/Loading";
import { getAllTodo } from "@/app/action/todoAction";
import useTodoStore from "@/hook/useTodoStore";

export default function TodoList({
  initialTodos,
}: {
  initialTodos: eachTodo[];
}) {
  const add = useTodoStore((state) => state.add);

  useEffect(() => {
    const fetchTodos = async () => {
      const updatedTodos = await getAllTodo();
      add(updatedTodos);
    };

    fetchTodos();
  }, [add]);

  const { todos, isLoading } = useTodo(initialTodos);

  if (isLoading)
    return (
      <div>
        <Loading size={20} />
      </div>
    );

  return (
    <div>
      {todos && todos.length > 0 ? (
        todos.map((eachtodo: eachTodo) => (
          <div key={eachtodo.id} className="text-white">
            <EachTodo todo={eachtodo} />
          </div>
        ))
      ) : (
        <div className="flex justify-center text-4xl font-semibold text-gray-700">
          Add Todo to Continue
        </div>
      )}
    </div>
  );
}
