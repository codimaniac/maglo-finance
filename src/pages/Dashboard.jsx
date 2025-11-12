import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import { useEffect } from "react"
import { account } from "@/appwrite/config"

/** @type {import('react').CSSProperties} */
const style = {
  display: 'flex',
  gap: 16,
};

export default function Dashboard() {
  useEffect(() => {
    const remember = localStorage.getItem('rememberMe');
    console.log('Remember me:', remember);
    if (remember == 'false') {
      window.addEventListener('beforeunload', () => {
        account.deleteSession('current');
      });
    }
  }, []);

  return (
    <SidebarProvider
      style={style}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
