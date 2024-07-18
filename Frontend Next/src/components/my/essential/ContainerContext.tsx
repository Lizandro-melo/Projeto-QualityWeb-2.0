import {cn} from "@/lib/utils";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/contexts/AuthContext";
import {Bolt, DoorOpen} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    stateAlertDialogGlobal,
    stateAlertDialogGlobalProps,
    stateModalHistoricoTicketGlobal,
    stateNavBarGlobal
} from "@/lib/globalStates";

export const ContainerContext = {
    Root: ContainerContextRoot
}


type ContainerContextRootProps = {
    children?: React.ReactNode,
    column?: boolean
}

function ContainerContextRoot({children, column}: ContainerContextRootProps) {

    const state = stateNavBarGlobal((state: any) => state);

    return (
        <>
            <div onMouseOver={() => state.setBool(false)}
                 className={cn("flex flex-col h-full w-full", state.stateNavBar && "w-[80%]")}>
                <ContainerContextHeader/>
                <main className="w-full h-full flex items-center justify-center">
                    <div className={cn("w-[95%] h-[95%] bg-stone-100 rounded-md flex", column && "flex-col")}>
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}

type ContainerContextHeaderProps = {}

function ContainerContextHeader() {

    const {user, acessos, disconnect} = useContext(AuthContext)
    const stateAlert = stateAlertDialogGlobal<stateAlertDialogGlobalProps>((state) => state)

    return (
        <>
            <header
                className={cn("w-full bg-slate-100 h-[60px] px-5 gap-4 flex pr-5 justify-between items-center shadow")}>

                <div className="flex items-center gap-4">
                    <img src={user?.dirFoto ? user?.dirFoto : 'https://placehold.co/600?text=Foto'}
                         className="w-[40px] h-[40px] rounded-full" alt="Foto de perfil"/>
                    <ul className="text-stone-500 text-xs">
                        <li>{user?.nomeCompleto}</li>
                    </ul>
                </div>
                <div className="flex items-center bg-blue-950 h-[35px] gap-3 px-2 rounded-xl">
                    <Button onClick={() => location.href = "/configs"} variant="link" title="Configurações"
                            className="active:scale-90 transition-all ">
                        <Bolt className="invert w-[20px] h-[20px]"/>
                    </Button>
                    <Button
                        onClick={() => stateAlert.setAlert("Comfirme", "Você tem certeza que deseja se desconectar?", disconnect)}
                        variant="link" title="Desconectar"
                        className="active:scale-90 transition-all ">
                        <DoorOpen className="invert w-[20px] h-[20px]"/>
                    </Button>
                </div>
            </header>
        </>
    )
}