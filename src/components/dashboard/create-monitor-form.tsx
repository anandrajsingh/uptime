"use client"
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Card } from '../ui/card';
import { Select, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { Separator } from '../ui/separator';


export default function CreateMonitorForm() {
    // const [url, setUrl] = useState('');
    // const [email, setEmail] = useState('');
    // const [sms, setSms] = useState(false);
    // const [call, setCall] = useState(false);
    // const [pushNotification, setPushNotification] = useState(false);

    const form = useForm()

    const onSubmit = () => {
        console.log("hello")
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
                                <div className=' p-4'>
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
                                                                <SelectValue placeholder="Url becomes unavailable" />
                                                            </SelectTrigger>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }
                                    />
                                </div>
                                <Separator className='my-2' />
                                <div className=' p-4'>
                                    <FormField control={form.control} name='alert-condition'
                                        render={
                                            ({ field }) => (
                                                <FormItem >
                                                    <FormLabel>
                                                        URL to monitor
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='https://example.com'/>
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <div>
                            <div className='font-bold'>What to monitor</div>
                            <div>Configure the target website you want to monitor.</div>
                        </div>
                        <div>
                            <Card className='shadow-md w-[400px]'>
                                <div className=' p-4'>
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
                                                                <SelectValue placeholder="Url becomes unavailable" />
                                                            </SelectTrigger>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }
                                    />
                                </div>
                                <Separator className='my-2' />
                                <div className=' p-4'>
                                    <FormField control={form.control} name='alert-condition'
                                        render={
                                            ({ field }) => (
                                                <FormItem >
                                                    <FormLabel>
                                                        URL to monitor
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='https://example.com'/>
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

{/* <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="url">URL to monitor</Label>
            <Input id="url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>

          

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="sms" checked={sms} onChange={(e) => setSms(false)} />
              <Label htmlFor="sms">Send SMS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="call" checked={call} onChange={(e) => setCall(false)} />
              <Label htmlFor="call">Call</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pushNotification" checked={pushNotification} onChange={(e) => setPushNotification(false)} />
              <Label htmlFor="pushNotification">Push notification</Label>
            </div>
          </div>

          <Button type="submit">Create Monitor</Button>
        </div>
      </form> */}