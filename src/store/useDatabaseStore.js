import { create } from "zustand";
import { checkSession, databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { toDatePattern } from "@/lib/format-date";

export const useDatabaseStore = create((set, get) => ({
  user: [],
  invoices: [],
  payments: [],
  monthlyvatsummary: [],
  loading: false,
  error: null,

  fetchInvoices: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_INVOICES_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.equal("userId", userId)]
      );
      set({ invoices: res.documents, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchMonthlyVATSummary: async () => {
    set({ loading: true, error: null });
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VAT_SUMMARIES_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
      set({ monthlyvatsummary: res.documents, loading: false });
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

      console.log("Invoice created successfully:", newInvoice);
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
      console.log("Invoice deleted successfully");
    } catch (err) {
      set({ error: err.message });
    }
  },

  getUserDetails: async () => {
    set({ loading: true, error: null })
    try {
      const res = await checkSession()

      set({ user: res, loading: false })
    } catch (err) {
      set({ loading: false, error: err.message })
    }
  },

  getTotals: () => {
    const invoices = get().invoices;
    const paid = invoices.filter((invoice) => invoice.status === "Paid");
    const unpaid = invoices.filter((invoice) => invoice.status === "Unpaid");

    const totalInvoices = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    const totalPaid = paid.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    const totalVAT = paid.reduce((sum, invoice) => sum + invoice.vatAmount, 0);
    const pendingPayments = unpaid.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

    return {
      totalInvoices,
      noOfInvoices: invoices.length,
      totalPaid,
      noOfPaidInvoices: paid.length,
      noOfUnpaidInvoices: unpaid.length,
      pendingPayments,
      totalVAT,
    };
  },

  fetchVATSummary: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VAT_SUMMARIES_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.equal("userId", userId)]
      );
      set({ monthlyvatsummary: res.documents, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  getSummaryByMonth: async (month, userId) => {
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VAT_SUMMARIES_COLLECTION_ID,
        [Query.equal("month", month), Query.equal("userId", userId)]
      );

      if (res.total === 0) return null;

      return res.documents[0];
    } catch (error) {
      console.error("Error getting summary by month:", error.message);
      return null;
    }
  },

  createSummary: async (month, data) => {
    try {
      const res = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VAT_SUMMARIES_COLLECTION_ID,
        ID.unique(),
        {
          month,
          totalVATCollected: data.totalVATCollected,
          totalRevenue: data.totalRevenue,
          userId: data.userId
        }
      );

      return res;
    } catch (error) {
      console.error("Error creating VAT summary:", error.message);
      return null;
    }
  },

  updateSummary: async (vatSummaryId, data) => {
    try {
      const res = await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VAT_SUMMARIES_COLLECTION_ID,
        vatSummaryId,
        {
          ...(data.totalVATCollected !== undefined && { totalVATCollected: data.totalVATCollected }),
          ...(data.totalRevenue !== undefined && { totalRevenue: data.totalRevenue })
        }
      );

      return res;
    } catch (error) {
      console.error("Error creating VAT summary:", error.message);
      return null;
    }
  },

  upsertMonthlyVATSummary: async (invoice) => {
    const monthKey = toDatePattern(new Date(), "yyyy-MM");

    const existing = await get().getSummaryByMonth(monthKey, invoice.userId);

    console.log("Existing Data: ", existing)
    console.log("Invoice Data ", invoice)

    const data = {
      totalVATCollected: invoice.vatAmount,
      totalRevenue: invoice.totalAmount,
      userId: invoice.userId,
    };

    if (!existing) {
      return get().createSummary(monthKey, data);
    }

    return get().updateSummary(existing.$id, {
      totalVATCollected: existing.totalVATCollected + data.totalVATCollected,
      totalRevenue: existing.totalRevenue + data.totalRevenue,
    });
  },
}));
