import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MainPageLayout } from "./main_page";

export default function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <html lang="en">
            <body >
                <div >
                    <SidebarProvider>
                        <AppSidebar />
                        <MainPageLayout>
                            {children}
                        </MainPageLayout>
                    </SidebarProvider>
                </div>
            </body>
        </html>
    )
}