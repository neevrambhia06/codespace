"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { CreateNoteForm } from "@/components/forms/CreateNoteForm";

export function CreateNoteButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1.5 bg-[#D5360C] text-[#F4EBDD] hover:bg-[#B82D09]">
          <Plus className="h-3.5 w-3.5" />
          <span>+ New Note</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-[#101010] bg-[#F4EBDD] text-[#101010]">
        <DialogHeader>
          <DialogTitle className="font-display font-bold">Create Note</DialogTitle>
          <DialogDescription className="text-xs text-[#4A443C]">
            Capture an idea, reminder, or meeting takeaway.
          </DialogDescription>
        </DialogHeader>
        <CreateNoteForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
