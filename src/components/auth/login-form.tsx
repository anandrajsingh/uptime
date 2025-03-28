"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardWrapper } from "./card-wrapper"
import { z } from "zod"
import { LoginSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useSearchParams } from "next/navigation"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { FormAlert } from "../form-alert"
import { useState, useTransition } from "react"
import { login } from "@/actions/login"

export const LoginForm = () => {

    const [isPending, startTransition] = useTransition()
    const [alert, setAlert] = useState("")
    const [alertType, setAlertType] = useState("")

    const searchParams = useSearchParams()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ?
    "Email already in use with different provider"
    : "";

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values)
            .then((data) => {
                if(data?.success){
                    setAlert(data.success)
                    setAlertType("success")
                }
                if(data?.error){
                    setAlert(data.error)
                    setAlertType("error")
                }
            })
        })
    }

    return (
        <div>
            <CardWrapper headerLabel={"Welcome Back"} backButtonLabel={"Don't have an account"} backButtonHref={"/signup"} showSocial>
                <Form {...form} >
                    <form action="" className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField control={form.control} name="email"
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} placeholder="user@emample.com" type="email" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                            />
                            <FormField control={form.control} name="password"
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} placeholder="******" type="password" />
                                            </FormControl>
                                            <FormMessage />
                                            <Button size="sm" variant="link" asChild className="px-0 font-normal" >
                                                <Link href="/reset">
                                                    Forgot Password
                                                </Link>
                                            </Button>
                                        </FormItem>
                                    )
                                }
                            />
                        </div>
                        <FormAlert alert={alert || urlError} alertType={alertType || "error"}/>
                        {/* <FormAlert alert={urlError} alertType="error"/> */}
                        <Button type="submit" disabled={isPending} className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}