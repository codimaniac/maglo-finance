import { create } from "zustand";
import { databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";

export const useDatabaseStore = create((set, get) => ({
  users: [],
  invoices: [],
  paymensts: [],
  vatsummary: [],
  loading: false,
  error: null,

  fetchInvoices: async () => {
    set({ loading: true, error: null });
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_INVOICES_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
      set({ invoices: res.documents, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createInvoice: async (invoiceData) => {
    try {
      const newInvoice = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_INVOICES_COLLECTION_ID,
        ID.unique(),
        invoiceData
      );
      set({ invoices: [newInvoice, ...get().invoices] });
    } catch (err) {
      set({ error: err.message });
    }
  },

  updateInvoice: async (id, updates) => {
    try {
      const updated = await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_INVOICES_COLLECTION_ID,
        id,
        updates
      );
      set({
        invoices: get().invoices.map((inv) =>
          inv.$id === id ? updated : inv
        ),
      });
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteInvoice: async (id) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_INVOICES_COLLECTION_ID,
        id
      );
      set({
        invoices: get().invoices.filter((inv) => inv.$id !== id),
      });
    } catch (err) {
      set({ error: err.message });
    }
  },

  getTotals: () => {
    const invoices = get().invoices;
    const paid = invoices.filter((invoice) => invoice.status === "Paid");
    const unpaid = invoices.filter((invoice) => invoice.status === "Unpaid");

    const totalPaid = paid.reduce((sum, invoice) => sum + invoice.total, 0);
    const totalVAT = paid.reduce((sum, invoice) => sum + invoice.vatAmount, 0);

    return {
      totalInvoices: invoices.length,
      totalPaid,
      pendingPayments: unpaid.length,
      totalVAT,
    };
  },
}));
