import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "../app/dashboard/data.json";
import { useEffect } from "react";
import { account, checkSession } from "@/lib/appwrite";

/** @type {import('react').CSSProperties} */
const style = {
  display: "flex",
  gap: 16,
};

export default function Transactions() {
  useEffect(() => {
    checkSession().then((user) => console.log(user.email))
  }, []);

  return (
    <SidebarProvider style={style}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader heading="Transactions"/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 pb-4 md:gap-6 md:pb-6">
              {/* Data Table goes here */}
              <DataTable />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
