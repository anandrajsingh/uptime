"use client"
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Card } from '../ui/card';
// import { Select, SelectTrigger } from '../ui/select';
// import { SelectValue } from '@radix-ui/react-select';
// import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

interface MonitorSchema {
    url : string
}


export default function CreateMonitorForm() {

    const form = useForm<MonitorSchema>({
        defaultValues: {url: ""}
    })

    const onSubmit = (monitor: MonitorSchema) => {
        async function addWebsite() {
            try {
                console.log({test: "first"})
                const res = await fetch("/api/create-monitor", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        url : monitor.url
                    })
                });
                console.log(res)
                if (!res.ok) throw new Error("Failed to add website");
                const data = await res.json();
            } catch (error) {
                console.error(error);
            }
        }
        addWebsite();
    };

    return (
        <div>
            <div className='font-bold text-3xl'>Create monitor</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col md:flex-row'>
                        <div>
                            <div className='font-bold'>What to monitor</div>
                            <div>Configure the target website you want to monitor.</div>
                        </div>
                        <div>
                            <Card className='shadow-md w-[400px]'>
                                {/* <div className=' p-4'>
                                    <FormField control={form.control} name='alert-condition'
                                        render={
                                            ({ field }) => (
                                                <FormItem >
                                                    <FormLabel>
                                                        Alert us when
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select >
                                                            <SelectTrigger >
                                                                <SelectValue {...field} placeholder="Url becomes unavailable" />
                                                            </SelectTrigger>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }
                                    />
                                </div>
                                <Separator className='my-2' /> */}
                                <div className='p-4'>
                                    <FormField control={form.control} name="url"
                                        render={
                                            ({ field }) => (
                                                <FormItem >
                                                    <FormLabel>
                                                        URL to monitor
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder='https://example.com'/>
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }
                                    />
                                </div>

                                <Button type='submit' size="sm" className='font-bold flex justify-self-center mb-2'>
                                    Add 
                                </Button>
                            </Card>
                        </div>
                    </div>
                    
                </form>
            </Form>
        </div>
    );
}
