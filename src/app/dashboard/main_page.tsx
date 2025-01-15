"use client"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

export const MainPageLayout = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {

    const { open , isMobile} = useSidebar()
    return (
        <main className="flex p-2">
            {!open && <SidebarTrigger />}
            {isMobile && <SidebarTrigger />}
            {children}
        </main>
    )
}