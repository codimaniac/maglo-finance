"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import InvoiceForm from "./invoice-form";

interface InvoiceFormModalProps {
  trigger: React.ReactNode;      // Button or icon that opens the modal
  mode: "create" | "edit";
  initialData?: any;             // Appwrite document for edit mode
  onSuccess?: () => void;        // callback when form succeeds
  title?: string;
  description?: string;
}

export default function InvoiceFormModal({
  trigger,
  mode,
  initialData,
  onSuccess,
  title,
  description,
}: InvoiceFormModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {title || (mode === "create" ? "Create New Invoice" : "Edit Invoice")}
          </DialogTitle>
          <DialogDescription>
            {description ||
              (mode === "create"
                ? "Fill in the details below to create a new invoice."
                : "Modify the fields to update this invoice.")}
          </DialogDescription>
        </DialogHeader>

        {/* Reusable invoice form */}
        <InvoiceForm
          mode={mode}
          initialData={initialData}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
