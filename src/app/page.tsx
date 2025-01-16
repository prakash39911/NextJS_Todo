import Heading from "@/components/Heading";
import InputField from "@/components/InputField";
import TodoList from "@/components/TodoList";
import { getAllTodo } from "./action/todoAction";

export default async function Home() {
  const todos = await getAllTodo();

  return (
    <div className="flex flex-col bg-gray-800 min-h-screen w-full items-center">
      <div className="h-[12vh] mt-3">
        <Heading />
      </div>
      <div className="h-[12vh] mt-6">
        <InputField />
      </div>
      <div className="h-[65vh] rounded-lg p-3 bg-gray-900 w-[60vw] shadow-blue-800 shadow-lg overflow-auto">
        <TodoList initialTodos={todos} />
      </div>
    </div>
  );
}
