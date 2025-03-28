import CreateMonitorForm from "@/components/dashboard/create-monitor-form";

export default function CreateMonitor() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="w-[1000px]">
                <CreateMonitorForm/>
            </div>
        </div>
    )
}