'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function signup(){
    const router = useRouter()

    const handleHomeButton = () => {
        router.push("/")
    }

    const handleLoginButton = () => {
        router.push("/login")
    }
    return (
        <div>
            <Button onClick={handleHomeButton}>Home</Button>
            <Button onClick={handleLoginButton}>Login</Button>
        </div>
    )
}