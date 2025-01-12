"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardWrapper } from "./card-wrapper"
import { z } from "zod"
import { SignupSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { FormAlert } from "../form-alert"
import { useState, useTransition } from "react"
import { signup } from "@/actions/signup"

export const SignupForm = () => {

    const [isPending, startTransition] = useTransition()
    const [alert, setAlert] = useState("")
    const [alertType, setAlertType] = useState("")

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof SignupSchema>) => {
        startTransition(() => {
            signup(values)
            .then((data) => {
                if(data.success){
                    setAlert(data.success)
                    setAlertType("success")
                }
                if(data.error){
                    setAlert(data.error)
                    setAlertType("error")
                }
            })
        })
    }

    return (
        <div>
            <CardWrapper headerLabel={"Create account"} backButtonLabel={"Already have an account"} backButtonHref={"/login"} showSocial>
                <Form {...form} >
                    <form action="" className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField control={form.control} name="name"
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} placeholder="John Doe" type="name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                            />
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
                        <FormAlert alert={alert} alertType={alertType}/>
                        <FormAlert alert="" alertType="error"/>
                        <Button type="submit" disabled={isPending} className="w-full">
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}