'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login")
  }

  const handleSignUpClick = () => {
    router.push("/signup")
  }

  return (
    <div className="bg-dark">
      <div>uptime monitoring</div>
      <Button onClick={handleSignUpClick}>Get Started</Button>
      <Button onClick={handleLoginClick}>Login</Button>
    </div>

  );
}
