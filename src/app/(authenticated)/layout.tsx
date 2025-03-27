import { AppNavBar } from "@/components/authenticated/app-navbar";
import { AppSidebar } from "@/components/authenticated/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout ({children}: {children: React.ReactNode}){
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <AppNavBar />
                {children}
            </main>
        </SidebarProvider>
    )
}