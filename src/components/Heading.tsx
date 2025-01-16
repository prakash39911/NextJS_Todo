import React from "react";
import { RiTodoLine } from "react-icons/ri";

export default function Heading() {
  return (
    <>
      <div className="flex flex-row justify-center gap-3 items-center">
        <div>
          <RiTodoLine size={50} color="gray" />
        </div>
        <div className="text-7xl font-sans font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Todo App
        </div>
      </div>
    </>
  );
}
