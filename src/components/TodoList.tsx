"use client";

import React from "react";
import EachTodo from "./EachTodo";
import { useTodo } from "@/hook/useTodo";
import Loading from "@/app/Loading";

export default function TodoList({
  initialTodos,
}: {
  initialTodos: eachTodo[];
}) {
  const { todos, isLoading } = useTodo(initialTodos);

  if (isLoading)
    return (
      <div>
        <Loading size={20} />
      </div>
    );

  return (
    <div>
      {todos.length > 0 ? (
        todos.map((eachtodo: eachTodo) => (
          <div key={eachtodo.id} className="text-white">
            <EachTodo todo={eachtodo} />
          </div>
        ))
      ) : (
        <div className="flex justify-center text-2xl font-semibold text-gray-400">
          Add Todo to Continue
        </div>
      )}
    </div>
  );
}
