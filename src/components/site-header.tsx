import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search } from "lucide-react"
import { FaBell } from 'react-icons/fa'
import MaleAvatar from "../assets/default-male-avatar.png"
import { IconCaretDownFilled } from "@tabler/icons-react"
import { useEffect, useState } from "react"

interface SiteHeaderProps {
  heading?: string,
  user?: any,
}


export function SiteHeader({heading, user}: SiteHeaderProps) {
  const [userDetails, setUserDetails] = useState(user);

  useEffect(() => {
    setUserDetails(user);

    console.log('User details updated:', user);
  }, [user]);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 py-6 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="font-semibold text-2xl">{ heading }</h1>
        <div className="ml-auto flex items-center gap-8">
          <Search size={20} className="hidden text-[var(--text-2)] md:block"/>
          <FaBell size={20} className="hidden text-[var(--text-2)] md:block"/>
          <div className="flex items-center gap-2 p-1.5 text-sm font-medium bg-accent rounded-full">
            <img src={MaleAvatar} alt="profile pics" className="rounded-full"/>
            <span className="hidden mr-4 md:block">{userDetails?.name}</span>
            <IconCaretDownFilled size={16} className="hidden mr-2 md:block"/>
          </div>
        </div>
      </div>
    </header>
  )
}
