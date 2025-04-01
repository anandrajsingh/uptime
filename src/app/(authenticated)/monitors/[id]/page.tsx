// import {PageProps} from "next"
// import { getMonitor } from "./action"
"use client"
type MonitorProps = {
    params: { id: string }
}

export default function Monitor({ params }: MonitorProps) {
    const monitorId = params.id
    console.log(monitorId)
    // const res = await getMonitor(id)
    // const services = res.monitor?.checks
    return (
        <div className="h-screen w-full py-20 flex justify-center">
            <div className="w-8/12">
                {/* <h1 className="text-5xl font-bold py-3">{res.monitor?.url}</h1> */}
                <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Current status by service</h2>

                <div className="flex space-x-1 mt-2">
                {/* {services?.map((service) => (
                    <div key={service.id} className="mb-4">
                                <div  className={`w-4 h-4 rounded ${service.status === "UP" ? "bg-green-500" : "bg-red-500"}`}></div>
                        </div>
                ))} */}
                </div>
            </div>
            </div>
        </div>
    )
}