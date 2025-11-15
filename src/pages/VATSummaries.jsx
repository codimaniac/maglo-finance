import { useDatabaseStore } from "@/store/useDatabaseStore";
import Layout from "@/components/custom/Layout";
import { VATSummaryDataTable } from "@/components/vat-summary-data-table";

export default function VATSummaries() {
  const invoices = useDatabaseStore((state) => state.invoices);
  const monthlyvatsummary = useDatabaseStore((state) => state.monthlyvatsummary);

  return (
    <Layout heading="VAT Summaries">
      <VATSummaryDataTable data={monthlyvatsummary} />
    </Layout>
  );
}
