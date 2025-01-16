"use client";

import React, { useState } from "react";
import { GoStar } from "react-icons/go";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { deleteTodo, getAllTodo } from "@/app/action/todoAction";
import useTodoStore from "@/hook/useTodoStore";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/Loading";

export default function EachTodo({ todo }: { todo: eachTodo }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const add = useTodoStore((state) => state.add);

  const handleDelete = async (todoId: number) => {
    setIsDeleting(true);
    await deleteTodo(todoId);
    setIsDeleting(false);
    const data = await getAllTodo();
    add(data);
    toast.success("Todo Deleted");
  };

  const handleEdit = async (todoId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("todoID", todoId.toString());
    router.push(`${pathname}edit?${params.toString()}`);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between px-30 py-2 bg-gray-700 mb-1 rounded-md p-2">
        <div className="flex flex-row items-center gap-6">
          <div>
            <GoStar />
          </div>
          <div className="font-semibold text-lg text-gray-300">{todo.text}</div>
        </div>
        <div className="flex flex-row items-center gap-6">
          <div className="cursor-pointer" onClick={() => handleEdit(todo.id)}>
            <MdEditSquare color="gray" size={20} />
          </div>
          <div className="cursor-pointer" onClick={() => handleDelete(todo.id)}>
            {isDeleting ? (
              <Loading size={4} />
            ) : (
              <AiFillDelete color="red" size={20} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
