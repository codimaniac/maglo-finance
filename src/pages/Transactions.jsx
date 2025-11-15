import { DataTable } from "@/components/data-table";
import { useDatabaseStore } from "@/store/useDatabaseStore";
import Layout from "@/components/custom/Layout";

export default function Transactions() {
  const invoices = useDatabaseStore((state) => state.invoices);

  return (
    <Layout heading="Transactions">
      <DataTable invoiceData={invoices} />
    </Layout>
  );
}
