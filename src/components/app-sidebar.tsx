import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar"

import { GrAction } from "react-icons/gr";
import { SiWebmoney } from "react-icons/si";

const items = [
    {
        title: "Monitors",
        url: "/monitors",
        icon: SiWebmoney
    },
    {
        title: "Incidents",
        url: "/incidents",
        icon: GrAction
    },
    
]

export function AppSidebar() {
    return (
        <Sidebar >
            <SidebarHeader className="p-3 justify-between">
                <div className="font-bold">Uptime</div>
                <SidebarTrigger/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}