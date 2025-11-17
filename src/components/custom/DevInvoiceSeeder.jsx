"use client";
import { account, databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import { useEffect } from "react";

export default function DevInvoiceSeeder() {
  async function seed() {
    const user = await account.get();
    const userId = user.$id;

    for (let i = 1; i <= 20; i++) {
      const amount = Math.floor(Math.random() * 50000) + 10000;
      const vatPercentage = 7.5;
      const vatAmount = (amount * vatPercentage) / 100;
      const totalAmount = amount + vatAmount;

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_INVOICES_COLLECTION_ID,        
        ID.unique(),
        {
          clientName: `Client ${i}`,
          clientEmail: `client${i}@example.com`,
          amount,
          vatPercentage,
          vatAmount,
          totalAmount,
          dueDate: "2025-12-31",
          status: "Unpaid",
          userId
        }
      );
    }

    alert("Seed complete: 20 invoices created!");
  }

  return (
    <button
      onClick={seed}
      className="fixed z-10 bottom-5 right-30 bg-black text-white p-3 rounded"
    >
      Seed 20 Invoices
    </button>
  );
}
