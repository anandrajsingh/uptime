import { Button } from "@/components/ui/button";

export default function Monitors() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div >
                <div className="font-bold">
                    We create incident everytime your monitor fails
                </div>
                <Button className="font-bold">
                    Report new incident
                </Button>
            </div>
        </div>
    )
}