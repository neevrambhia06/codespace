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
        <Button size="sm" className="h-8 gap-1.5 bg-[#D5360C] text-white hover:bg-[#B82D09] font-medium">
          <Plus className="h-3.5 w-3.5" />
          <span>New Note</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-[#101010]/15 bg-white text-[#101010] rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-sans font-bold text-lg text-[#101010]">Create Note</DialogTitle>
          <DialogDescription className="text-xs text-[#524D46]">
            Capture an idea, reminder, or meeting takeaway.
          </DialogDescription>
        </DialogHeader>
        <CreateNoteForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
