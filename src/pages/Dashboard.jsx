import { DataTable } from "@/components/data-table";
import { useDatabaseStore } from "@/store/useDatabaseStore";
import Layout from "@/components/custom/Layout";
import { SectionCards } from "@/components/section-cards";
import { ChartPieLegend } from "@/components/chart-pie-legend";
import { ChartBarMultiple } from "@/components/chart-bar-multiple";

export default function Dashboard() {
  const invoices = useDatabaseStore((state) => state.invoices);

  return (
    <Layout heading="Dashboard">
      <SectionCards />
      <div className="flex flex-col gap-8 px-4 lg:px-6">
        <ChartPieLegend />
        {/* <ChartBarMultiple /> */}
      </div>
      <DataTable invoiceData={invoices}/>
    </Layout>
  );
}
