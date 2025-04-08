"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createIncident, getMonitors } from "./actions";

interface FormSchema {
    monitorId: string;
}

type Monitor = {
    id: string;
    createdAt: Date;
    url: string;
    paused: boolean;
    userId: string;
};

export default function NewIncident() {
    const router = useRouter();

    const form = useForm<FormSchema>({
        defaultValues: {
            monitorId: "",
        },
    });
    const [monitors, setMonitors] = useState<Monitor[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getMonitors();
            if (!data || 'error' in data) {
                return <div className="text-red-500">Failed to load monitors</div>;
            }
            setMonitors(data.monitorList);
        })();
    }, []);

    const onSubmit = async (data: FormSchema) => {
        const result = await createIncident(data.monitorId);
        if ("error" in result) {
            console.error(result.error);
            return;
        }

        router.push(`/incidents/${result.id}`);
    };

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="w-[500px]">
                <h1 className="text-3xl font-bold mb-4 text-center">Create New Incident</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <Card className="p-6 shadow-md">
                            <FormField
                                control={form.control}
                                name="monitorId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Monitor ID</FormLabel>
                                        <FormControl>
                                            <select
                                                {...field}
                                                className="w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-white"
                                            >
                                                <option value="">-- Choose a Monitor --</option>
                                                {monitors.map((monitor) => (
                                                    <option key={monitor.id} value={monitor.id}>
                                                        {monitor.url}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="mt-4 font-bold">Create Incident</Button>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    );
}
