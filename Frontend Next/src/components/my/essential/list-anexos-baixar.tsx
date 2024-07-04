import {FileArchive, FileText, Image, Plus, Sheet} from "lucide-react";
import React, {useContext} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {cn} from "@/lib/utils";
import {AuthContext} from "@/contexts/AuthContext";


type List = {
    list: any[],
    height?: number
}
export default function ListAnexosBaixar({list, height}: List) {

    const {host} = useContext(AuthContext)

    return (
        <div
            className={cn("border h-[80px] w-full rounded-sm border-stone-500 p-2 overflow-x-auto overflow-y-hidden relative", height && `!h-[${height}px]`)}>
            <div className="h-full flex gap-2 absolute">
                {list.map((anexo, i) => {
                    const extencaoFile = anexo.split(".")[anexo.split(".").length - 1].toUpperCase()
                    const fileName = anexo.split("/")[1]
                    return (
                        <a key={i}
                           href={`${host}/suporte/find/download/arquivo?name=${fileName}`}
                           title={fileName}
                           target="_blank"
                           className="border border-stone-500 h-[65px] w-[65px] flex flex-col items-center justify-center flex-none rounded-md cursor-pointer hover:bg-slate-100">
                            {(extencaoFile === "CSV" || extencaoFile === "XLSX") && (
                                <Sheet className="w-4"/>
                            )}
                            {(extencaoFile === "PNG" || extencaoFile === "JPEG" || extencaoFile === "JPG") && (
                                <Image className="w-4"/>
                            )}
                            {(extencaoFile === "TXT" || extencaoFile === "DOCX") && (
                                <FileText className="w-4"/>
                            )}
                            {(extencaoFile === "ZIP" || extencaoFile === "RAR") && (
                                <FileArchive className="w-4"/>
                            )}
                            <span className="text-xs">{extencaoFile}</span>
                        </a>
                    )
                })}

            </div>


        </div>
    )
}