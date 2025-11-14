import * as React from "react"
import Logo from "../assets/logo.svg"
import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconHome,
  IconInvoice,
  IconLogout,
  IconReport,
  IconSearch,
  IconSettings,
  IconTax,
  IconTransactionDollar,
  IconWallet,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, Navigate, useNavigate } from "react-router"
import { logoutUser } from "@/lib/appwrite"
import { toast } from "react-toastify"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: IconHome,
      },
      {
        title: "Transactions",
        url: "/transactions",
        icon: IconTransactionDollar,
      },
      {
        title: "Invoices",
        url: "/invoices",
        icon: IconInvoice,
      },
      {
        title: "VAT Summaries",
        url: "/vat-summaries",
        icon: IconTax,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: IconSettings,
      },
    ],
    navSecondary: [
      {
        title: "Help",
        url: "#",
        icon: IconHelp,
        handlesignout: null,
      },
      {
        title: "Logout",
        url: null,
        icon: IconLogout,
        handlesignout: () => {
          logoutUser().then(() => {
            console.log("User logged out")
            toast.success("Logged out successfully")

            navigate('/signin' )
          })
          .catch((error) => {
            console.error("Error logging out user:", error)
            toast.error("Error logging out. Please try again.")
          })
        },
      },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/" className="flex items-center gap-2 font-medium">
                <img src={Logo} alt="Logo" className="h-auto w-31" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarFooter>
    </Sidebar>
  )
}
