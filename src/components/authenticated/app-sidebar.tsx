"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { GrAction } from "react-icons/gr";
import { SiWebmoney } from "react-icons/si";
import { GoGraph } from "react-icons/go";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

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
    {
        title: "Analytics",
        url: "/analytics",
        icon: GoGraph,
    }
]

export function AppSidebar() {
    const pathname = usePathname()
    return (
        <Sidebar >
            <SidebarHeader className="p-4 justify-center border-b">
                <div className="font-extrabold tracking-wide text-xl">🟢 Uptime</div>
            </SidebarHeader>

            <SidebarContent className="pt-6">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-3">
                            {items.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <div
                                                className={clsx(
                                                    "flex items-center w-full gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                                    {
                                                      "bg-inherit text-white": isActive,
                                                      "text-gray-700 hover:bg-gray-100": !isActive,
                                                    }
                                                  )}
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    <span className="text-xl font-sans">{item.title}</span>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                )
                            }
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t text-sm text-gray-400 text-center">
                <p>© 2025 Uptime</p>
            </SidebarFooter>
        </Sidebar>
    )
}