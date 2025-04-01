"use client"
import { Button } from "@/components/ui/button";
import { Circle, MoreVertical} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Monitor = {
    id: string,
    url: string
}

export default function Monitors() {
    const [monitors, setMonitors] = useState<Monitor[]>([])

    useEffect(() => {
        fetch("/api/monitor")
          .then((res) => res.json())
          .then((data) => {
            setMonitors(data);
          });
      }, []);
      
    return (
        <div className="h-screen w-full flex items-center justify-center">
            {monitors.length === 0 ? (
                <div >
                    <div className="font-bold">
                        Create your first monitor
                    </div>

                    <Link href="/monitors/new">
                        <Button size="sm" className="font-bold" >
                            Create Monitor
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="w-full max-w-lg space-y-4">
                    <h2 className="font-bold text-xl">Your monitors</h2>
                    <ul className="space-y-2">
                        {monitors.map((monitor) => (
                            <li key={monitor.id} className="flex justify-between items-center p-4 bg-[#2A2A3A] rounded-lg">
                            
                            <div className="flex items-center gap-3">
                                <Circle className={`h-4 w-4 text-green-400`} />
                                <Link href={`/monitors/${monitor.id}`} className="text-white font-semibold hover:underline">
                                    {monitor.url}
                                </Link>
                                <span className={`text-sm text-green-300`}>
                                    Up
                                </span>
                            </div>

                            
                            <div className="flex items-center gap-4">
                            
                                <span className="text-gray-400 text-sm">10 min ago</span>
                                <MoreVertical className="text-gray-400 cursor-pointer" />
                            </div>
                        </li>
                        ))}
                    </ul>
                    <Link href="/monitors/new">
                        <Button size="sm" className="font-bold my-4">Add More Monitors</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}