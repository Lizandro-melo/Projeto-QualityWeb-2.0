import {stateBarGlobalprops, stateListColaboradorBarGlobal} from "@/lib/globalStates";
import {cn} from "@/lib/utils";

type ContainerSystemProps = {
    children?: React.ReactNode
}

export default function ContainerSystem({children}: ContainerSystemProps) {
    const state = stateListColaboradorBarGlobal<stateBarGlobalprops>((state: any) => state);


    return (
        <div
            onClick={() => state.setBool(false)}
            className={cn("h-full w-[80%] rounded-r-md", !state.stateNavBar && "!w-[87%]")}>
            <div className="flex justify-start w-full p-5 flex-col h-full relative overflow-hidden">
                {children}
            </div>
        </div>

    )
}