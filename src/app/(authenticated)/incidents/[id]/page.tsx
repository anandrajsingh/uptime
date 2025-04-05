import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { differenceInHours, formatDistanceToNow } from "date-fns";
import { getIncident } from "./actions";
import { CopyCodeBlock } from "./CopyCodeBlock";

type Params = Promise<{ id: string }>
type Monitor = {
    id: string;
    createdAt: Date;
    url: string;
    paused: boolean;
    userId: string;
  };
  
  type Incident = {
    id: string;
    createdAt: Date;
    acknowledged: boolean;
    monitorId: string;
    monitor: Monitor;
  };
  
  type IncidentResponse = Incident | { error: string };

export default async function Incident(props: { params: Params }) {

    const params = await props.params;
    const incidentId = params.id

    const incident: IncidentResponse = await getIncident(incidentId)
    if ('error' in incident) {
        console.error("Error:", incident.error);
        return
    }

    const code = `curl -L --connect-timeout 10 --max-time 15 \
  -H 'User-Agent: Uptime By Anand Bot Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' \
  '${incident.monitor.url}'`

    const formatUrl = (url?: string): string => {
        if (!url) return '';
        return url.replace(/^(https?:\/\/)/, '');
    };

    const getRelativeTime = (dateString: Date) => {
        const date = new Date(dateString)
        const hoursAgo = differenceInHours(new Date(), date)

        return hoursAgo < 24 ? `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago` : formatDistanceToNow(date, { addSuffix: true })
    }

    return (
        <div className="h-screen w-full py-20 flex justify-center">
            <div className="w-7/12 flex flex-col gap-6">
                <div className="flex justify-between">
                    <span className="text-4xl font-bold">{formatUrl(incident.monitor.url)}</span>
                    <Button size="sm" className={`font-bold ${incident.acknowledged ? "bg-slate-400 cursor-not-allowed" : ""}`}>{incident.acknowledged ? "Acknowledged" : "Acknowledge"}</Button>
                </div>
                <div className="flex w-full gap-4">
                    <div className="flex flex-col gap-2 bg-gray-800 border-slate-700 border p-6 rounded-lg w-full">
                        <div className="text-sm text-slate-400">Started At</div>
                        <span className="text-2xl">{getRelativeTime(incident.createdAt)}</span>
                    </div>
                    <div className="flex flex-col gap-2 bg-gray-800 p-6 border-slate-700 border rounded-lg w-full">
                        <div className="text-sm text-slate-400">Checked URL</div>
                        <span className="border border-slate-500 py-1 px-2 bg-slate-900 rounded-sm">{incident.monitor.url}</span>
                    </div>
                </div>
                <div className="flex flex-col w-full bg-gray-900 border border-slate-700 rounded-lg">
                    <div className="py-2 px-4">Replay</div>
                    <Separator />
                    <div className="bg-[#1e1e2f] text-white p-4 rounded-xl shadow-md relative">
                        <CopyCodeBlock code={code}/>
                    </div>
                </div>
            </div>
        </div>
    )

}