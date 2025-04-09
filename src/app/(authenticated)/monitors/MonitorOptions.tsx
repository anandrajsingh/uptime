"use client"
import { useClickOutside } from "@/hooks/use-click-outside";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { deleteMonitor, pauseMonitor } from "./action";

interface MonitorOptionType {
    monitorId : string,
    paused: boolean,
}

export function MonitorOption({monitorId, paused}: MonitorOptionType){
    const [optionOpen, setOptionOpen] = useState(false)

    const handlePause = () => {
        pauseMonitor(monitorId)
        setOptionOpen(false);
    };

    const handleDelete = () => {
        deleteMonitor(monitorId)
        setOptionOpen(false);
    };

    return (
        <div className="relative">
            <MonitorOptionModal open={optionOpen} onClose={() => {setOptionOpen(false)}} onPause={handlePause} onDelete={handleDelete} paused={paused}/>
            <MoreVertical onClick={() => {setOptionOpen(true)}} className="text-gray-400 cursor-pointer hover:text-white transition" />
        </div>
    )
}

interface MonitorOptionModalType {
    open: boolean;
    onClose: () => void;
    onPause: () => void;
    onDelete: () => void;
    paused : boolean;
}

function MonitorOptionModal({open, onClose, onPause, onDelete, paused}: MonitorOptionModalType){
    const ref = useClickOutside(onClose)
    if (!open) return null;
    return (
        <div ref={ref} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
            <ul className="py-2 text-sm text-gray-700">
                <li
                    onClick={onPause}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                    {paused ? "Resume Monitor" : "Pause Monitor"}
                </li>
                <li
                    onClick={onDelete}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                    Delete Monitor
                </li>
            </ul>
        </div>
    )
}