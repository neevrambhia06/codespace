"use server";

import { revalidatePath } from "next/cache";
import { createProjectSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { ActionResponse } from "./types";
import { getCurrentUser } from "@/lib/auth";
import { sendProjectCreatedEmail } from "@/lib/email";
import { Prisma } from "@prisma/client";

export async function createProject(payload: unknown): Promise<ActionResponse> {
  const result = createProjectSchema.safeParse(payload);
  
  if (!result.success) {
    return { 
      success: false, 
      error: "Invalid project data provided.",
      fieldErrors: result.error.flatten().fieldErrors
    };
  }

  const { name, description, status } = result.data;
  
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized. Only Admins can manage projects." };
    }

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const project = await tx.project.create({
        data: {
          name,
          description: description ?? "",
          status,
          language: "Unknown",
          userId: user?.id,
        }
      });

      await tx.auditLog.create({
        data: {
          title: "Created Project",
          description: `Project "${name}" was created.`,
          time: new Date().toLocaleTimeString(),
          userId: user?.id,
        }
      });
      return project;
    });

    // Fire & Forget email dispatch (non-blocking)
    if (user.email) {
      sendProjectCreatedEmail(user.email, user.name || "Developer", name).catch(console.error);
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project." };
  }
}
