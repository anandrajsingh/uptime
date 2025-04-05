"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createProject } from "./action";
import { useRouter } from "next/navigation";

export interface ProjectSchema {
    url: string
}


export default function CreateProject() {

    const router = useRouter();
    const form = useForm<ProjectSchema>({
        defaultValues: { url: "https://" }
    })

    const onSubmit = async (data: ProjectSchema) => {

        const project = await createProject(data);

        if ("error" in project) {
            console.error("Error:", project.error);
            return;
        }
        router.push(`/analytics/${project.id}`)
    }
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
            <div className="font-bold text-3xl">Create Project</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col w-full gap-2'>
                        <div className="flex justify-center">Target website to get analytics.</div>
                        <Card className='shadow-md w-[400px]'>

                            <div className='p-4'>
                                <FormField control={form.control} name="url"
                                    render={
                                        ({ field }) => (
                                            <FormItem >
                                                <FormLabel>
                                                    URL to monitor
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder='https://example.com' />
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }
                                />
                            </div>

                            <Button type='submit' size="sm" className='font-bold flex justify-self-center mb-2'>
                                Create Project
                            </Button>
                        </Card>
                    </div>

                </form>
            </Form>
        </div>
    )
}