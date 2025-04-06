'use client'

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

export function CopyCodeBlock({ code }: { code: string }) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
  }

  return (
    <div className="bg-[#1e1e2f] text-white p-4 rounded-xl shadow-md relative">

      <pre className="overflow-x-auto whitespace-pre-wrap text-sm bg-transparent px-2 py-1 rounded-md">
        <code>{code}</code>
      </pre>

      <Button
        onClick={handleCopy}
        className="absolute bottom-3 right-3 flex items-center gap-1 bg-inherit text-xs text-gray-400 hover:bg-[#34344b] transition"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )
}
