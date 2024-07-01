import {ContainerMain} from "@/components/my/essential/container-main";
import {NavBar} from "@/components/my/essential/nav-bar";
import {Folders, HomeIcon, MessageCircleQuestion, UserSearch} from "lucide-react";
import {ContainerContext} from "@/components/my/essential/ContainerContext";
import Router from "next/router";
import React, {useContext} from "react";
import {AuthContext} from "@/contexts/AuthContext";
import {pageSelectProps, pageSelectRhGlobal} from "@/lib/globalStates";

export default function Home() {
    const selectPage = pageSelectRhGlobal<pageSelectProps>((state) => state)
    const {acessos} = useContext(AuthContext)
    return (
        <>
            <ContainerMain.Root>
                <NavBar.Root>
                    <NavBar.Section title={"TI"} testeRole={true}>
                        <NavBar.Item action={() => Router.push("/suporte")}
                                     icon={<MessageCircleQuestion className="w-[20px]"/>} title={"Suporte"}
                                     testeRole={true}/>
                    </NavBar.Section>
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
                </NavBar.Root>
                <ContainerContext.Root/>
            </ContainerMain.Root>
        </>
    )
}