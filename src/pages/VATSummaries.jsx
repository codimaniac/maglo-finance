import { DataTable } from "@/components/data-table";
import { useDatabaseStore } from "@/store/useDatabaseStore";
import Layout from "@/components/custom/Layout";

export default function VATSummaries() {
  const invoices = useDatabaseStore((state) => state.invoices);

  return (
    <Layout heading="VAT Summaries">
      <DataTable invoiceData={invoices} />
    </Layout>
  );
}
