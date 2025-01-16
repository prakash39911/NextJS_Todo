"use server";

import prisma from "../lib/PrismaClient";
import { inputSchema, inputSchemaType } from "../lib/schemas/inputSchema";

export async function addTodo(data: inputSchemaType) {
  try {
    const validated = inputSchema.safeParse(data);

    if (validated.error) {
      return { isSuccess: "error", error: "input validation failed" };
    }

    const todo = prisma.todo.create({
      data: {
        text: data.text,
        created: new Date(),
      },
    });

    return { isSuccess: "success", data: todo };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTodo() {
  try {
    const todos = await prisma.todo.findMany({
      select: {
        text: true,
        id: true,
      },
    });
    return todos;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteTodo(todoId: number) {
  try {
    return prisma.todo.delete({
      where: { id: todoId },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTodoById(todoId: number) {
  try {
    return prisma.todo.findUnique({
      where: {
        id: todoId,
      },
      select: {
        text: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateTodoById(todoId: number, updatedText: string) {
  try {
    const result = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        text: updatedText,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}
