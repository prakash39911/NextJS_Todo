"use client";

import { addTodo, getAllTodo } from "@/app/action/todoAction";
import { inputSchema, inputSchemaType } from "@/app/lib/schemas/inputSchema";
import Loading from "@/app/Loading";
import useTodoStore from "@/hook/useTodoStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function InputField() {
  const add = useTodoStore((state) => state.add);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isSubmitting },
  } = useForm<inputSchemaType>({
    resolver: zodResolver(inputSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  const onActualSubmit = async (data: inputSchemaType) => {
    try {
      await addTodo(data);
      reset();

      const allTodo = await getAllTodo();
      console.log("fetched data from server getAllTodo", allTodo);

      add(allTodo); // Update the Zustand store
      toast.success("Todo Added Successfully");
    } catch (error) {
      toast.error("Failed to add Todo");
      console.error(error);
    }
  };

  return (
    <>
      <div className="shadow-lg">
        <form
          onSubmit={handleSubmit(onActualSubmit)}
          className="flex flex-row gap-4"
        >
          <input
            {...register("text")}
            className="pr-20 pl-1 p-2 border-2 bg-gray-600 border-gray-400 rounded-md w-[400px]"
            placeholder="Enter todo"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className=" text-gray-300 border border-blue-700 font-semibold rounded-lg px-2 py-1 shadow-md shadow-blue-700 active:scale-95 transition transform w-[100px]"
          >
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 text-transparent bg-clip-text">
              {isSubmitting ? <Loading size={8} /> : "Add Todo"}
            </span>
          </button>
        </form>
      </div>
    </>
  );
}

export default InputField;
