import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import {signIn} from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <div className="w-full flex flex-col gap-y-4 items-center">
                    <h1 className={cn(
                        "text-3xl font-semibold",
                        font.className
                    )}>
                        Auth
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {headerLabel}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter >
                    <div className="w-full flex items-center gap-x-2">
                        <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("google")}>
                            <FcGoogle className="h-5 w-5"/>
                        </Button>
                        <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("github")}>
                            <FaGithub className="h-5 w-5"/>
                        </Button>
                    </div>
                </CardFooter>
            )}
            <CardFooter>
                <Button variant="link" className="font-normal w-full" size="sm" asChild>
                    <Link href={backButtonHref}>
                        {backButtonLabel}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}