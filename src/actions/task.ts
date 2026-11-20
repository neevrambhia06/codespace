"use server";

import { revalidatePath } from "next/cache";
import { createTaskSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { ActionResponse } from "./types";
import { getCurrentUser } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export async function createTask(payload: unknown): Promise<ActionResponse> {
  const result = createTaskSchema.safeParse(payload);
  
  if (!result.success) {
    return { 
      success: false, 
      error: "Invalid task data provided.",
      fieldErrors: result.error.flatten().fieldErrors
    };
  }

  const { title, priority } = result.data;

  try {
    const user = await getCurrentUser();
    
    if (!user || user.role === 'GUEST') {
      return { success: false, error: "Unauthorized. Guests cannot create tasks." };
    }

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const task = await tx.task.create({
        data: {
          title,
          priority,
          completed: false,
          userId: user?.id,
        }
      });

      await tx.auditLog.create({
        data: {
          title: "Created Task",
          description: `Task "${title}" was added.`,
          time: new Date().toLocaleTimeString(),
          userId: user?.id,
        }
      });
      
      return task;
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create task:", error);
    return { success: false, error: "Failed to create task." };
  }
}

export async function toggleTaskStatus(taskId: string, completed: boolean): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role === 'GUEST') {
      return { success: false, error: "Unauthorized. Guests cannot modify tasks." };
    }

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const task = await tx.task.update({
        where: { id: taskId },
        data: { completed }
      });
      
      await tx.auditLog.create({
        data: {
          title: completed ? "Completed Task" : "Uncompleted Task",
          description: `Task "${task.title}" was marked as ${completed ? "completed" : "pending"}.`,
          time: new Date().toLocaleTimeString(),
          userId: user?.id,
        }
      });
      
      return task;
    });
    
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update task:", error);
    return { success: false, error: "Task not found or failed to update." };
  }
}
