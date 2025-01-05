import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormAlertProps {
    alert?: string,
    alertType: string
}

export const FormAlert = ({
    alert,
    alertType
}: FormAlertProps) => {
    if (!alert) return null;

    return (
        <>
            {alertType === "success" && (
                <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                    <CheckCircledIcon className="h-4 w-4" />
                    <p>{alert}</p>
                </div>
            )}
            {alertType === "error" && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <p>{alert}</p>
                </div>
            )}
        </>
    )
}