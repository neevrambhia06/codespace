import * as z from "zod"

// ── Auth Schemas ────────────────────────────────────────────────────────────
// Shared between the client-side React Hook Form resolvers (LoginForm,
// RegisterForm) so the validation rules live in exactly one place.

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
})

export type LoginValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
})

export type RegisterValues = z.infer<typeof registerSchema>

// ── Project Schemas ─────────────────────────────────────────────────────────

export const createProjectSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  status: z.enum(["active", "archived", "completed"]),
})

export type CreateProjectValues = z.infer<typeof createProjectSchema>

// ── Task Schemas ────────────────────────────────────────────────────────────

export const createTaskSchema = z.object({
  title: z.string().min(2, {
    message: "Task title must be at least 2 characters.",
  }),
  priority: z.enum(["low", "medium", "high"]),
})

export type CreateTaskValues = z.infer<typeof createTaskSchema>

// ── Note Schemas ────────────────────────────────────────────────────────────

export const createNoteSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  snippet: z.string().optional(),
})

export type CreateNoteValues = z.infer<typeof createNoteSchema>
