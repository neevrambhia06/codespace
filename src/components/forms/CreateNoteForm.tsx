"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { createNote } from "@/actions/note"
import {
  createNoteSchema,
  type CreateNoteValues,
} from "@/lib/validations"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"

interface CreateNoteFormProps {
  onSuccess?: () => void;
}

export function CreateNoteForm({ onSuccess }: CreateNoteFormProps) {
  const form = useForm<CreateNoteValues>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      snippet: "",
    },
  })

  async function onSubmit(data: CreateNoteValues) {
    const response = await createNote(data);
    
    if (response.success) {
      toast.success(`Note "${data.title}" created!`);
      form.reset();
      onSuccess?.();
    } else {
      toast.error(response.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Meeting with Design" {...field} />
              </FormControl>
              <FormDescription>
                A short, descriptive title for your note.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="snippet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Document key decisions, architecture notes, or next steps..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating..." : "Save Note"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
