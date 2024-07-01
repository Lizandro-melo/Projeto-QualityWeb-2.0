import {NavBar} from "@/components/my/essential/nav-bar";
import {BookLock, UserCog} from "lucide-react";
import {ContainerContext} from "@/components/my/essential/ContainerContext";
import {ContainerMain} from "@/components/my/essential/container-main";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/contexts/AuthContext";
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {ConfigsRolesRoot} from "@/components/my/configs/roles/configsRoles";

export default function Configs() {

    const {acessos, searchParams} = useContext(AuthContext)
    const [page, setPage] = useState<string | null>("home")
    const pathname = usePathname();
    const {replace} = useRouter();


    useEffect(() => {
        setPage(searchParams.get("page"))
    }, [searchParams]);

    const alterPage = (page: string) => {
        const paramsPage = new URLSearchParams(searchParams)
        paramsPage.set('page', page);
        replace(`${pathname}?${paramsPage.toString()}`);
    }

    return (
        <>
            <ContainerMain.Root>
                <NavBar.Root>
                    <NavBar.Section title={"Opcões"} testeRole={true}>
                        <NavBar.Item
                            testeRole={true}
                            action={() => alterPage("perfil")}
                            icon={<UserCog className="w-[20px]"/>}
                            title={"Perfil"}/>
                        <NavBar.Item
                            testeRole={acessos?.rolesTI?.delegado}
                            action={() => alterPage("roles")}
                            icon={<BookLock className="w-[20px]"/>}
                            title={"Permições"}/>
                    </NavBar.Section>
                    <NavBar.ButtonBack/>
                </NavBar.Root>
                <ContainerContext.Root>
                    {page === "roles" && <ConfigsRolesRoot/>}
                </ContainerContext.Root>
            </ContainerMain.Root>
        </>
    )
}
