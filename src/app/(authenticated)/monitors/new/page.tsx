"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { createMonitor } from './action';
import { useRouter } from 'next/navigation';

interface MonitorSchema {
    url: string
}

export default function CreateMonitor() {

    const router = useRouter()

    const form = useForm<MonitorSchema>({
        defaultValues: { url: "https://" }
    })

    const onSubmit = async (data: MonitorSchema) => {
        const monitor = await createMonitor(data);
        if ("error" in monitor) {
            console.error("Error:", monitor.error);
            return;
        }
        router.push(`/monitors/${monitor.id}`)
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 font-sans">
            <div className="w-full max-w-xl space-y-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-100">Create Monitor</h1>
                    <p className="text-gray-400 mt-2">Configure the target website you wnat to monitor</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full'>
                        <Card className='shadow-xl p-6 border border-gray-700'>
                            <FormField control={form.control} name="url"
                                render={
                                    ({ field }) => (
                                        <FormItem >
                                            <FormLabel className='font-medium text-gray-200'>
                                                URL to monitor
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder='https://example.com' />
                                            </FormControl>
                                        </FormItem>
                                    )
                                }
                            />
                            <Button type='submit' size="sm" className='font-bold flex justify-self-center mt-4'>
                                Add Monitor
                            </Button>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    )
}