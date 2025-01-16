"use client";

import { updateTodoById } from "@/app/action/todoAction";
import { inputSchema, inputSchemaType } from "@/app/lib/schemas/inputSchema";
import Loading from "@/app/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditInputComponent({
  todoId,
  text,
}: {
  todoId: string;
  text: string;
}) {
  const router = useRouter();
  const stringToNumberTodoId = parseInt(todoId);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting },
  } = useForm<inputSchemaType>({
    resolver: zodResolver(inputSchema),
    mode: "onTouched",
    defaultValues: {
      text,
    },
  });

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  const onActualSubmit = async (data: inputSchemaType) => {
    const result = await updateTodoById(stringToNumberTodoId, data.text);
    if (result) router.push("/");
    toast.success("Todo Updated Successfully");
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
            className="pr-20 pl-1 p-2 border bg-gray-600 border-red-600 rounded-md shadow-sm shadow-red-600 w-[400px]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className=" text-gray-300 border border-red-700 font-semibold rounded-lg px-2 py-1 shadow-md shadow-red-700 active:scale-95 transition transform w-[100px]"
          >
            <span className="bg-gradient-to-r from-red-600 to-pink-600 text-transparent bg-clip-text">
              {isSubmitting ? <Loading size={8} /> : "Update"}
            </span>
          </button>
        </form>
      </div>
    </>
  );
}

export default EditInputComponent;
