import { useDatabaseStore } from "@/store/useDatabaseStore";
import DashboardCard from "./custom/Card";

export function SectionCards() {
  const { getTotals } = useDatabaseStore();
  const totals = getTotals();
  const format = (amount: number) => {
    const formatted = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);

    return formatted;
  };

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <DashboardCard
        title="Total Invoice"
        value={totals.noOfInvoices}
        active={true}
      />
      <DashboardCard
        title="Amount Paid"
        value={format(totals.totalPaid)}
        active={false}
      />
      <DashboardCard
        title="Pending Payment"
        value={format(totals.pendingPayments)}
        active={false}
      />
      <DashboardCard
        title="Total VAT"
        value={format(totals.totalVAT)}
        active={false}
      />
    </div>
  );
}
