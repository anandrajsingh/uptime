'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Login(){
    const router = useRouter()

    const handleHomeButton = () => {
        router.push("/")
    }

    const handleSignupButton = () => {
        router.push("/signup")
    }
    return (
        <div>
            <Button onClick={handleHomeButton}>Home</Button>
            <Button onClick={handleSignupButton}>Signup</Button>
        </div>
    )
}