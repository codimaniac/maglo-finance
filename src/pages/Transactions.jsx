import { useDatabaseStore } from "@/store/useDatabaseStore";
import Layout from "@/components/custom/Layout";
import { TransactionDataTable } from "@/components/transaction-data-table";

export default function Transactions() {
  const payments = useDatabaseStore((state) => state.payments);

  return (
    <Layout heading="Transactions">
      <TransactionDataTable data={payments}/>
    </Layout>
  );
}
