import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Monitors() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
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
        </div>
    )
}