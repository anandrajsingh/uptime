import { formatUrl, getRelativeTime } from "@/lib/format";
import { getProject } from "./action"
import { CopyCodeBlock } from "@/components/authenticated/CopyCodeBlock";
import { Separator } from "@/components/ui/separator";

type Params = Promise<{ id: string }>

export default async function AnalysisDetail(props: { params: Params }) {
    const params = await props.params;
    const projectId = params.id;

    const res = await getProject(projectId)

    const code = `<script
  defer
  data-project-id="${res.project?.id}"
  src="https://uptime.anandrajsingh.xyz/tracker.js"
/>`

    console.log(res)
    return (
        <div className="h-screen w-full flex py-20 justify-center">
            <div className="w-8/12 flex flex-col gap-6">
                <div className="font-bold text-4xl py-3">
                    {formatUrl(res.project?.url)}
                </div>
                <div className="flex w-full gap-4">
                    <div className="flex flex-col gap-2 bg-gray-800 border-slate-700 border p-6 rounded-lg w-full">
                        <div className="text-sm text-slate-400">Started At</div>
                        <span className="text-2xl">To do</span>
                    </div>
                    <div className="flex flex-col gap-2 bg-gray-800 p-6 border-slate-700 border rounded-lg w-full">
                        <div className="text-sm text-slate-400">Checked URL</div>
                        <span className="border border-slate-500 py-1 px-2 bg-slate-900 rounded-sm">{res.project?.url}</span>
                    </div>
                </div>
                <div className="flex flex-col w-full bg-gray-900 border border-slate-700 rounded-lg">
                    <div className="py-2 px-4">Replay</div>
                    <Separator />
                    <div className="bg-[#1e1e2f] text-white p-4 rounded-xl shadow-md relative">
                        <CopyCodeBlock code={code} />
                    </div>
                </div>
            </div>
        </div>
    )
}