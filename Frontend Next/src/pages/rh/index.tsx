import {NavBar} from "@/components/my/essential/nav-bar";
import {ContainerMain} from "@/components/my/essential/container-main";
import React, {useContext} from "react";
import {AuthContext} from "@/contexts/AuthContext";
import {Folder, Folders, UserSearch} from "lucide-react";
import Router from "next/router";
import {Tickets} from "@/components/my/system/suporte/tickets";
import {ContainerContext} from "@/components/my/essential/ContainerContext";
import {pageSelectProps, pageSelectRhGlobal} from "@/lib/globalStates";
import ArquivosControleRh from "@/components/my/system/rh/arquivosControleRh";


export default function Rh() {

    const {acessos} = useContext(AuthContext)
    const selectPage = pageSelectRhGlobal<pageSelectProps>((state) => state)

    return (
        <>
            <ContainerMain.Root>
                <NavBar.Root>
                    <NavBar.Section title={"RH"} testeRole={acessos?.rolesRH.delegado}>
                        <NavBar.Item icon={<UserSearch className="w-[20px]"/>} title={"Anotações"}
                                     action={() => Router.push("/rh")}
                                     testeRole={acessos?.rolesRH.delegado}/>
                        <NavBar.Item icon={<Folders className="w-[20px]"/>} title={"Arquivos"}
                                     action={() => {
                                         Router.push("/rh")
                                         selectPage.setPage("Arquivos")
                                     }}
                                     testeRole={acessos?.rolesRH.delegado}/>
                    </NavBar.Section>
                    <NavBar.ButtonBack/>
                </NavBar.Root>
                <ContainerContext.Root>
                    {selectPage.page === "Arquivos" && <ArquivosControleRh/>}
                </ContainerContext.Root>
            </ContainerMain.Root>
        </>
    )
}
