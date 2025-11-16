import { useDatabaseStore } from "@/store/useDatabaseStore";
import Layout from "@/components/custom/Layout";
import { TransactionDataTable } from "@/components/transaction-data-table";

export default function Transactions() {
  const invoices = useDatabaseStore((state) => state.invoices);

  return (
    <Layout heading="Transactions">
      <TransactionDataTable />
    </Layout>
  );
}
