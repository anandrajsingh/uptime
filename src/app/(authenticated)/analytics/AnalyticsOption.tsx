"use client"
import { useClickOutside } from "@/hooks/use-click-outside";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { deleteProject } from "./action";

interface AnalyticsOptionProps{
    projectId : string
}

export function AnalyticsOption({projectId}: AnalyticsOptionProps){
    const [optionOpen, setOptionOpen] = useState(false)

    const handleDelete = () => {
        deleteProject(projectId)
        setOptionOpen(false);
    };

    return (
        <div className="relative">
            <AnalyticsOptionModal open={optionOpen} onClose={() => {setOptionOpen(false)}} onDelete={handleDelete}/>
            <MoreVertical onClick={() => {setOptionOpen(true)}} className="text-gray-400 cursor-pointer hover:text-white transition" />
        </div>
    )
}


interface AnalyticsOptionModalType {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

function AnalyticsOptionModal({open, onClose, onDelete}: AnalyticsOptionModalType){
    const ref = useClickOutside(onClose)
    if (!open) return null;
    return (
        <div ref={ref} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
            <ul className="py-2 text-sm text-gray-700">
                <li
                    onClick={onDelete}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                    Delete Project
                </li>
            </ul>
        </div>
    )
}