import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "../app/dashboard/data.json";
import { useEffect } from "react";
import { account, checkIfDocumentExists, checkSession, databases } from "@/lib/appwrite";
import { useDatabaseStore } from "@/store/useDatabaseStore";
import { toast } from "react-toastify";
import { useStateStore } from "@/store/useStateStore";
import { ChartBarMultiple } from "@/components/chart-bar-multiple";
import { ChartPieLegend } from "@/components/chart-pie-legend";

/** @type {import('react').CSSProperties} */
const style = {
  display: "flex",
  gap: 16,
};

export default function Dashboard() {
  const invoices = useDatabaseStore((state) => state.invoices);
  const user = useDatabaseStore((state) => state.user);
  const fetchInvoices = useDatabaseStore((state) => state.fetchInvoices);
  const getUserDetails = useDatabaseStore((state) => state.getUserDetails);
  const { hasShownWelcome, setHasShownWelcome } = useStateStore()
  
  useEffect(() => {
    checkSession().then(async (user) => {
      const userDocExist = await checkIfDocumentExists(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
          user.$id
      );
      console.log('User document exists:', userDocExist);

      const userDoc = userDocExist ? await databases.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
          user.$id
      ) : {};

      console.log('User document:', userDoc);

      if (userDocExist && !userDoc.$id || !userDoc.firstName || !userDoc.lastName || !userDoc.email) {
          const newUser = await databases.createDocument(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
              user.$id,
              {
                  firstName: user.name?.split(" ")[0] || '',
                  lastName: user.name?.split(" ")[1] || '',
                  email: user.email || ''
              }
          );

          console.log('New user document created:', newUser);
      }

      if (!hasShownWelcome) {
        toast.success(`Welcome back, ${user.name || user.email}!`)
        setHasShownWelcome(true)
      }
      console.log(user)
    });
    fetchInvoices();
  }, []);

  useEffect(() => {
    getUserDetails()
    console.log('User state changed:', user);
  }, [user.$id])

  return (
    <SidebarProvider style={style}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader heading="Dashboard" user={user}/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 pb-4 md:gap-6 md:pb-6">
              <SectionCards />
              <div className="flex flex-col gap-8 px-4 lg:px-6">
                <ChartPieLegend />
                {/* <ChartAreaInteractive /> */}
                <ChartBarMultiple />
              </div>
              {/* Data Table goes here */}
              <DataTable invoiceData={invoices}/>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
