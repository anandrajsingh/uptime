"use client"

import { CardWrapper } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from "zod"
import { NewPasswordSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState, useTransition } from "react"
import { reset } from "@/actions/reset"
import { useSearchParams } from "next/navigation"
import { newPassword } from "@/actions/new-password"
import { FormAlert } from "../form-alert"

export const NewPasswordForm = () => {

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [alert, setAlert] = useState("");
    const [alertType, setAlertType] = useState("")

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        
        startTransition(() => {
            newPassword(values, token)
            .then((data) => {
                if(data?.success){
                    setAlert(data.success)
                    setAlertType("success")
                }
                if(data?.error){
                    setAlert(data.error)
                    setAlertType("error")
                }
            }).catch(() => {
                setAlert("Something went wrong")
                setAlertType("error")
            })
        })
    }
    return (
        <div>
            <CardWrapper headerLabel={"Enter new password!"} backButtonLabel={"Back to login"} backButtonHref={"/login"}>
                <Form {...form}>
                    <form action="" className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField control={form.control} name="password"
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                New Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} placeholder="******" type="password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                            />
                        </div>
                        <FormAlert alert={alert} alertType={alertType}/>

                        <Button type="submit" disabled={isPending} className="w-full">
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}