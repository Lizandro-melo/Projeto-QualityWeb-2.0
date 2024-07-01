import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {K2D} from "next/dist/compiled/@next/font/dist/google";

export const ContainerMain = {
    Root: ContainerMainRoot
}


type ContainerMainRootProps = {
    children: ReactNode,
    column?: boolean,
    center?: boolean
}

function ContainerMainRoot({children, column, center}: ContainerMainRootProps) {
    return (
        <div className={cn("w-screen h-screen flex", column && "flex-col", center && "justify-center items-center")}>
            {children}
        </div>
    )
}