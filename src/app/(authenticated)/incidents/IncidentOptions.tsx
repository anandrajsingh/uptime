"use client"
import { useClickOutside } from "@/hooks/use-click-outside";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { deleteIncident } from "./actions";

interface IncidentOptionProps{
    incidentId : string
}

export function IncidentOption({incidentId}: IncidentOptionProps){
    const [optionOpen, setOptionOpen] = useState(false)

    const handleDelete = () => {
        deleteIncident(incidentId)
        setOptionOpen(false);
    };

    return (
        <div className="relative">
            <IncidentOptionModal open={optionOpen} onClose={() => {setOptionOpen(false)}} onDelete={handleDelete}/>
            <MoreVertical onClick={() => {setOptionOpen(true)}} className="text-gray-400 cursor-pointer hover:text-white transition" />
        </div>
    )
}


interface IncidentOptionModalType {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

function IncidentOptionModal({open, onClose, onDelete}: IncidentOptionModalType){
    const ref = useClickOutside(onClose)
    if (!open) return null;
    return (
        <div ref={ref} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
            <ul className="py-2 text-sm text-gray-700">
                <li
                    onClick={onDelete}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                    Delete Incident
                </li>
            </ul>
        </div>
    )
}