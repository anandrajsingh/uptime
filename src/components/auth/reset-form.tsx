"use client"

import { CardWrapper } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormAlert } from "../form-alert"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { ResetSchema } from "@/schemas"
import { reset } from "@/actions/reset"

export const ResetForm = () => {

    const [alert, setAlert] = useState("")
    const [alertType, setAlertType] = useState("")

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        
        startTransition(() => {
            reset(values)
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
            <CardWrapper headerLabel={"Forgot Password!"} backButtonLabel={"Back to login"} backButtonHref={"/login"}>
                <Form {...form}>
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
                                                <Input {...field} disabled={isPending} placeholder="johndoe@gmail.com" type="email" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                            />
                        </div>
                        <FormAlert alert={alert} alertType={alertType} />

                        <Button type="submit" disabled={isPending} className="w-full">
                            Send Reset Email
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}