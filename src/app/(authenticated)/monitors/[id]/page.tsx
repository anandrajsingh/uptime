import { getMonitor } from "./action"

type Params = Promise<{ id: string }>

export default async function Monitor(props: { params: Params }) {
    const params = await props.params;
    const monitorId = params.id;
    const res = await getMonitor(monitorId)
    const services = res.monitor?.checks

    const formatUrl = (url?: string): string => {
        if (!url) return '';
        return url.replace(/^(https?:\/\/)/, '');
    };

    return (
        <div className="h-screen w-full py-20 flex justify-center">
            <div className="w-8/12">
                <span className="text-5xl font-bold py-3">{formatUrl(res.monitor?.url)}</span>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Current status by service</h2>

                    <div className="flex space-x-1 mt-2">
                        {services?.map((service) => (
                            <div key={service.id} className="mb-4">
                                <div className={`w-4 h-4 rounded ${service.status === "UP" ? "bg-green-500" : "bg-red-500"}`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}