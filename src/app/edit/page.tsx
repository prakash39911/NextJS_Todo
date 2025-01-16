import EditInputComponent from "@/components/EditInputComponent";
import Heading from "@/components/Heading";
import { getTodoById } from "../action/todoAction";

export default async function EditPage({
  searchParams,
}: {
  searchParams: Promise<{ todoID: string }>;
}) {
  const { todoID } = await searchParams;
  const data = await getTodoById(parseInt(todoID));

  return (
    <div className="flex flex-col bg-gray-800 min-h-screen w-full items-center">
      <div className="h-[12vh] mt-3">
        <Heading />
      </div>
      <div className="h-[12vh] mt-6">
        <EditInputComponent todoId={todoID} text={data?.text as string} />
      </div>
    </div>
  );
}
