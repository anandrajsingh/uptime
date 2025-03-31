// import { useState, useEffect } from "react";

// interface ServiceStatus {
//     name: string;
//     uptime: number;
//     history: boolean[]; 
// }

const services = [
    {
        name: "test",
        uptime: 44,
        history: [true, true, true, true, true, false, true, true, true,true]
    }
]

export default function StatusPage() {
    // const [services, setServices] = useState<ServiceStatus[]>([]);
    // const [lastUpdated, setLastUpdated] = useState("");

    // useEffect(() => {
    //     fetch("/api/status")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setServices(data.services);
    //             setLastUpdated(new Date(data.lastUpdated).toLocaleString());
    //         });
    // }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">✅ All services are online</h1>
                {/* <p className="text-gray-400">Last updated on {lastUpdated}</p> */}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Current status by service</h2>

                {services.map((service) => (
                    <div key={service.name} className="mb-4">
                        <div className="flex justify-between items-center">
                            <span className="font-bold">{service.name}</span>
                            <span className="text-green-400">{service.uptime.toFixed(3)}% uptime</span>
                        </div>

                        <div className="flex space-x-1 mt-2">
                            {service.history.map((up, idx) => (
                                <div key={idx} className={`w-4 h-4 rounded ${up ? "bg-green-500" : "bg-red-500"}`}></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
