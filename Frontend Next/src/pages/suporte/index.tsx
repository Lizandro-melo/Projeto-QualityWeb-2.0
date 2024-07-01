import {NavBar} from "@/components/my/essential/nav-bar";
import {BarChartBig, MessageCircleQuestion, MessageSquarePlus, Search} from "lucide-react";
import {ContainerContext} from "@/components/my/essential/ContainerContext";
import {ContainerMain} from "@/components/my/essential/container-main";
import {Tickets} from "@/components/my/system/suporte/tickets";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/contexts/AuthContext";
import DrawerAbrirSolicitacao from "@/components/my/system/suporte/drawer-abrir-solicitacao";
import ModalFindSolicitacao from "@/components/my/system/suporte/modal-find-solicitacao";
import {stateModalHistoricoTicketGlobal, stateModalProps} from "@/lib/globalStates";


export default function Suporte() {

    const {acessos} = useContext(AuthContext)
    const [stateDrawerSolicitar, setStateDrawerSolicitar] = useState<boolean>(false)
    const stateModalHistoricoTicket = stateModalHistoricoTicketGlobal<stateModalProps>((state) => state)

    const alterDrawer = () => {
        setStateDrawerSolicitar(!stateDrawerSolicitar)
    }

    return (
        <>
            <ContainerMain.Root>
                <NavBar.Root>
                    <NavBar.Section title={"Utilitarios"} testeRole={true}>
                        <NavBar.Item action={stateModalHistoricoTicket.alterState} icon={<Search className="w-[20px]"/>}
                                     title={"Historico solicitações"} testeRole={true}/>
                        <NavBar.Item icon={<MessageSquarePlus className="w-[20px]"/>} title={"Abrir solicitação"}
                                     action={alterDrawer} testeRole={true}/>
                        <NavBar.Item icon={<BarChartBig className="w-[20px]"/>} title={"Gerar relatorio"}
                                     testeRole={acessos?.rolesTI?.puxarRelatorio}/>
                    </NavBar.Section>
                    <NavBar.ButtonBack/>
                </NavBar.Root>
                <ModalFindSolicitacao/>
                <DrawerAbrirSolicitacao state={stateDrawerSolicitar} setState={alterDrawer}/>
                <ContainerContext.Root>
                    <Tickets.Root/>
                </ContainerContext.Root>
            </ContainerMain.Root>
        </>
    )
}
