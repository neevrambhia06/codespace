"use server";

import { revalidatePath } from "next/cache";
import { createNoteSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { ActionResponse } from "./types";
import { getCurrentUser } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export async function createNote(payload: unknown): Promise<ActionResponse> {
  const result = createNoteSchema.safeParse(payload);
  
  if (!result.success) {
    return { 
      success: false, 
      error: "Invalid note data provided.",
      fieldErrors: result.error.flatten().fieldErrors
    };
  }

  const { title, snippet } = result.data;
  
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role === 'GUEST') {
      return { success: false, error: "Unauthorized. Guests cannot create notes." };
    }

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const note = await tx.note.create({
        data: {
          title,
          snippet: snippet ?? "",
          date: new Date().toLocaleDateString(), // Or store DateTime format depending on UI need
          userId: user?.id,
        }
      });

      await tx.auditLog.create({
        data: {
          title: "Created Note",
          description: `Note "${title}" was created.`,
          time: new Date().toLocaleTimeString(),
          userId: user?.id,
        }
      });
      
      return note;
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create note:", error);
    return { success: false, error: "Failed to create note." };
  }
}
