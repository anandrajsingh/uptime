import { formatUrl } from "@/lib/format";
import { getProject } from "./action"
import { CopyCodeBlock } from "@/components/authenticated/CopyCodeBlock";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

type Params = Promise<{ id: string }>

export default async function AnalysisDetail(props: { params: Params }) {
    const params = await props.params;
    const projectId = params.id;

    const res = await getProject(projectId)

    const code = `<script
  defer
  data-project-id="${res.project?.id}"
  src="https://uptime.anandrajsingh.xyz/tracking.js"
/>`

    const pageViews = res.project?.views;
    return (
        <div className="h-screen w-full flex py-20 justify-center">
            <div className="w-8/12 flex flex-col gap-6">
                <div className="font-bold text-4xl py-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    {formatUrl(res.project?.url)}
                </div>
                <div className="flex w-full gap-4">
                    <div className="flex flex-col gap-2 bg-gray-800 border-slate-700 border p-6 rounded-lg w-full">
                        <div className="text-sm text-slate-400">Started At</div>
                        <span className="text-2xl">{res.project?.createdAt ? format(res.project.createdAt, "PPPpp") : ""}</span>
                    </div>
                    <div className="flex flex-col gap-2 bg-gray-800 p-6 border-slate-700 border rounded-lg w-full">
                        <div className="text-sm text-slate-400">Checked URL</div>
                        <span className="border border-slate-500 py-1 px-2 bg-slate-900 rounded-sm">{res.project?.url}</span>
                    </div>
                </div>
                <div className="flex flex-col w-full bg-gray-900 border border-slate-700 rounded-lg">
                    <div className="py-2 px-4">Embed Script</div>
                    <Separator />
                    <div className="bg-[#1e1e2f] text-white p-4 rounded-xl shadow-md relative">
                        <CopyCodeBlock code={code} />
                    </div>
                </div>

                {pageViews && pageViews.length > 0 ? (
                    <div className="flex flex-col bg-zinc-900 border border-slate-700 rounded-2xl shadow-lg overflow-hidden">
                        <div className="px-6 py-4 text-lg font-semibold border-b border-slate-700">Recent Page Views</div>
                        <div className="overflow-auto max-h-[400px]">
                            <table className="min-w-full text-sm text-left text-slate-400">
                                <thead className="bg-zinc-800 text-slate-300 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-4 py-2">Timestamp</th>
                                        <th className="px-4 py-2">URL</th>
                                        <th className="px-4 py-2">Referrer</th>
                                        <th className="px-4 py-2">UA</th>
                                        <th className="px-4 py-2">Lang</th>
                                        <th className="px-4 py-2">Time Zone</th>
                                        <th className="px-4 py-2">Screen</th>
                                        <th className="px-4 py-2">Load Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageViews.map((view) => (
                                        <tr key={view.id} className="border-t border-slate-800 hover:bg-zinc-800/50">
                                            <td className="px-4 py-2">{new Date(view.timeStamp).toLocaleString()}</td>
                                            <td className="px-4 py-2 truncate max-w-[150px]" title={view.url}>{view.url}</td>
                                            <td className="px-4 py-2 truncate max-w-[100px]" title={view.referrer ?? undefined}>{view.referrer ?? "-"}</td>
                                            <td className="px-4 py-2 truncate max-w-[120px]" title={view.userAgent ?? undefined}>{view.userAgent?.slice(0, 20) ?? "-"}</td>
                                            <td className="px-4 py-2">{view.language ?? "-"}</td>
                                            <td className="px-4 py-2">{view.timeZone ?? "-"}</td>
                                            <td className="px-4 py-2">
                                                {view.screenWidth}×{view.screenHeight}
                                            </td>
                                            <td className="px-4 py-2">{view.pageLoadTime ?? "-"} ms</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-slate-400 mt-10">No page views found for this project.</div>
                )}
            </div>
        </div>
    )
}