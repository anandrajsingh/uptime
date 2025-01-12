"use client"

import { useSearchParams } from "next/navigation"
import { FormAlert } from "../form-alert"
import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"

export const NewVerificationForm =() => {

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [alert, setAlert ] = useState("")
    const [alertType, setAlertType] = useState("")

    const onSubmit = useCallback(() => {
        if(!token){
            setAlert("Missing Token")
            setAlertType("error")
            return;
        }
        newVerification(token)
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
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <div className="flex items-center w-full justify-center">
                { !alert && !alertType && (
                    <BeatLoader color="white"/>
                 )} 
            </div>
            <FormAlert alert={alert} alertType={alertType}/>
        </CardWrapper>
    )
}