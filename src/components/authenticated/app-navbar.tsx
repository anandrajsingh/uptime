"use client"

import { logOut } from "@/actions/logout"
import { Button } from "../ui/button"
import { SidebarTrigger } from "../ui/sidebar"

export function AppNavBar(){
    const onClick =() => {
        logOut()
    }
    return (
        <div>
            <div className="flex w-full justify-between p-2">
                <SidebarTrigger />
                <Button onClick={onClick}>Sign Out</Button>
            </div>
        </div>
    )
}