"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useDatabaseStore } from "../store/useDatabaseStore"
import { toast } from "react-toastify";

// ---------------------
// Validation Schema
// ---------------------

const InvoiceSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.email(),
  amount: z.number().positive(),
  vatPercentage: z.number().min(0).max(100),
  dueDate: z.string(),
  status: z.enum(["Paid", "Unpaid"]),
});

export type InvoiceFormValues = z.infer<typeof InvoiceSchema>;

interface InvoiceFormProps {
  mode: "create" | "edit";
  initialData?: any; // Appwrite document data for editing
  onSuccess?: () => void;
}

// ---------------------
// Component
// ---------------------

export default function InvoiceForm({
  mode,
  initialData,
  onSuccess,
}: InvoiceFormProps) {
  const { user, createInvoice, updateInvoice } = useDatabaseStore();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      amount: 0,
      vatPercentage: 7.5,
      dueDate: "",
      status: "Unpaid",
    },
  });

  // Load initial values when editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.reset({
        clientName: initialData.clientName || "",
        clientEmail: initialData.clientEmail || "",
        amount: initialData.amount || 0,
        vatPercentage: initialData.vat || 0,
        dueDate: initialData.dueDate || "",
        status: initialData.status || "Unpaid",
      });
    }
  }, [initialData, mode, form]);

  async function onSubmit(values: InvoiceFormValues) {
    setLoading(true);

    const vatAmount = values.amount * (values.vatPercentage / 100);
    const totalAmount = values.amount + vatAmount;
    const userId = user?.$id;

    console.log("Submitting invoice with values:", {
        ...values,
        vatAmount,
        totalAmount,
        userId,
      }
    )

    try {
      if (mode === "create") {
        await createInvoice({
          ...values,
          vatAmount,
          totalAmount,
          userId,
        });

        toast.success("Invoice created successfully");
        form.reset();
      } else if (mode === "edit" && initialData?.$id) {
        await updateInvoice(initialData.$id, {
          ...values,
          vatAmount,
          totalAmount,
          userId,
        });

        toast.success("Invoice updated successfully");
      }

      onSuccess?.();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4 border rounded-lg"
      >
        {/* Client Name */}
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Client Email */}
        <FormField
          control={form.control}
          name="clientEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Email</FormLabel>
              <FormControl>
                <Input placeholder="client@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (₦)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VAT */}
        <FormField
          control={form.control}
          name="vatPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>VAT (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Due Date */}
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-full">
          {loading
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
            ? "Create Invoice"
            : "Update Invoice"}
        </Button>
      </form>
    </Form>
  );
}
