import ListSolicitacoes from "@/components/my/system/suporte/list-solicitacoes";
import React, {ChangeEvent, ChangeEventHandler, FormEvent, useCallback, useContext, useEffect, useState} from "react";
import ListColaboradoresAtivos from "@/components/my/essential/ListColaboradoresAtivos";
import {LabelInputPadrao} from "@/components/my/essential/label-input-padrao";
import {Input} from "@/components/ui/input";
import {
    colaboradorSelectGlobal, colaboradorSelectGlobalProps,
    roleColaboradorSelectGlobal,
    roleColaboradorSelectGlobalProps,
    stateLoundingGlobal,
    stateLoundingGlobalProps
} from "@/lib/globalStates";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {AcessoModel, RhAcessoModel, TiAcessoModel} from "@/lib/models";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {AuthContext} from "@/contexts/AuthContext";
import {CircleDotDashed, CircleX} from "lucide-react";
import {cn} from "@/lib/utils";


export function ConfigsRolesRoot() {

    return (
        <>
            <RolesColaboradores/>
            <RolesOptions/>

        </>
    )
}

function RolesColaboradores() {

    return (
        <ListColaboradoresAtivos/>
    )
}

function RolesOptions() {

    const {host, user, acessos} = useContext(AuthContext)
    const roleSelect = roleColaboradorSelectGlobal<roleColaboradorSelectGlobalProps>((state: any) => state)
    const [rolesTI, setRolesTI] = useState<TiAcessoModel | null>()
    const [rolesRH, setRolesRH] = useState<RhAcessoModel | null>()
    const displayLounding = stateLoundingGlobal<stateLoundingGlobalProps>((state: any) => state)
    const colaboradorSelect = colaboradorSelectGlobal<colaboradorSelectGlobalProps>((state: any) => state)

    useEffect(() => {
        setRolesTI(roleSelect.role?.rolesTI)
        setRolesRH(roleSelect.role?.rolesRH)
    }, [roleSelect.role])

    const alterRoleTi = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target

        if (name !== "delegado") {
            if (checked) {
                setRolesTI((prevState: any) => ({...prevState, delegado: true}))
            }
        }
        setRolesTI((prevState: any) => ({...prevState, [name]: checked}))

    }, [rolesTI])

    const alterRoleRh = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target

        if (name !== "delegado") {
            if (checked) {
                setRolesRH((prevState: any) => ({...prevState, delegado: true}))
            }
        }
        setRolesRH((prevState: any) => ({...prevState, [name]: checked}))

    }, [rolesRH])


    const atualizarRoles = async () => {
        displayLounding.setDisplayLounding()
        await new Promise(resolve => setTimeout(resolve, 500))
        const acessos = {
            ...roleSelect.role,
            rolesTI: rolesTI,
            rolesRH: rolesRH
        }
        if (JSON.stringify(acessos) != JSON.stringify(roleSelect.role)) {
            await axios.put(`${host}/sistema/upload/roles`, acessos).then(async (response) => {
                displayLounding.setDisplaySuccess(response.data)
                await new Promise(resolve => setTimeout(resolve, 1500))
                displayLounding.setDisplayReset()
            }).catch(async () => {
                displayLounding.setDisplayFailure("Não foi possivel atualizar as permissões deste usuario no momento!")
                await new Promise(resolve => setTimeout(resolve, 1500))
                displayLounding.setDisplayReset()
            })
            return
        } else {
            displayLounding.setDisplayFailure("Não foi feita nenhuma alteração!")
            await new Promise(resolve => setTimeout(resolve, 1800))
            displayLounding.setDisplayReset()
        }
    }

    const redefinirRoles = async () => {
        await axios.get(`${host}/colaborador/find/roles?id=${roleSelect.role?.referentColaborador}`).then((response) => {
            const role: AcessoModel = response.data
            roleSelect.setSelect(role)
        }).then(async () => {
            displayLounding.setDisplaySuccess("Permissões redefinidas")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
        }).catch(async () => {
            displayLounding.setDisplayFailure("Não conseguimos recuperar as permissões deste usuario no momento!")
            await new Promise(resolve => setTimeout(resolve, 1800))
            displayLounding.setDisplayReset()
        })
    }

    const configurarRoles = async () => {
        displayLounding.setDisplayLounding()
        await new Promise(resolve => setTimeout(resolve, 500))
        await axios.get(`${host}/sistema/upload/create/acesso?id=${colaboradorSelect.colaborador?.fkAuth}`).then(async (response) => {
            displayLounding.setDisplaySuccess(response.data)
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
            await axios.get(`${host}/colaborador/find/roles?id=${colaboradorSelect.colaborador?.fkAuth}`).then((response) => {
                const role: AcessoModel = response.data
                roleSelect.setSelect(role)
            })
        }).catch(async () => {
            displayLounding.setDisplayFailure("Não foi possivel criar os acessos deste colaborador no momento!")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
        })
    }

    return (
        <>
            <div className="h-full w-[80%] rounded-r-md relative overflow-hidden px-10">
                {(!colaboradorSelect.colaborador) && (
                    <div
                        className="w-full bg-white h-full absolute opacity-70 z-[60] -mx-10 flex items-center justify-center">
                        <div className="w-full flex flex-col gap-5 items-center z-20">
                            <CircleX className={cn("w-[80px] h-[80px] stroke-red-700 z-[100]")}/>
                            <span
                                className="text-center font-bold text-stone-800  z-20">Selecione um colaborador</span>
                        </div>
                    </div>
                )}
                {(!roleSelect.role && colaboradorSelect.colaborador) && (
                    <div
                        className="w-full bg-white h-full absolute opacity-70 z-[50] -mx-10 flex items-center justify-center">
                        <div className="w-full flex flex-col gap-5 items-center z-20">
                            <CircleX className={cn("w-[80px] h-[80px] stroke-red-700 z-[100]")}/>
                            <span
                                className="text-center font-bold text-stone-800  z-20">Permissões não configuradas!</span>
                            <Button onClick={() => configurarRoles()} type="button">
                                Configurar
                            </Button>
                        </div>
                    </div>
                )}
                <div className="flex flex-col h-full flex-wrap gap-10 absolute justify-center overflow-auto ">
                    <>
                        <div
                            className="w-[300px] p-8 gap-10 items-center justify-center flex flex-col bg-stone-50 rounded-xl  shadow-lg">
                            <Label className="text-center">TI</Label>
                            <ul className="flex gap-2 flex-col">
                                <li className="flex gap-3">
                                    <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                           onChange={alterRoleTi}
                                           name="delegado"
                                           id="delegadoTi"
                                           checked={rolesTI?.delegado}/>
                                    <Label
                                        htmlFor="delegadoTi"
                                    >
                                        Integrante
                                    </Label>
                                </li>
                                <li className="flex gap-3">
                                    <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                           onChange={alterRoleTi}
                                           name="deletarTicket" id="deletarTicket"
                                           checked={rolesTI?.deletarTicket}/>
                                    <Label
                                        htmlFor="deletarTicket"
                                    >
                                        Deletar ticket
                                    </Label>
                                </li>
                                <li className="flex gap-3">
                                    <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                           onChange={alterRoleTi}
                                           name="reclassificar" id="reclassificar" checked={rolesTI?.reclassificar}/>
                                    <Label
                                        htmlFor="reclassificar"
                                    >
                                        Reclassificar solicitação
                                    </Label>
                                </li>
                                <li className="flex gap-3">
                                    <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                           onChange={alterRoleTi}
                                           name="puxarRelatorio" id="puxarRelatorio" checked={rolesTI?.puxarRelatorio}/>
                                    <Label
                                        htmlFor="puxarRelatorio"
                                    >
                                        Consultar relatório
                                    </Label>
                                </li>
                            </ul>
                        </div>
                    </>
                    <>
                        <div
                            className="w-[300px] p-8 gap-10 items-center justify-center flex flex-col bg-stone-50 rounded-xl  shadow-lg">
                            <Label className="text-center">RH</Label>
                            <ul className="flex gap-2 flex-col">
                                <li className="flex gap-3">
                                    <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                           onChange={alterRoleRh}
                                           name="delegado"
                                           id="delegadoRh"
                                           checked={rolesRH?.delegado}/>
                                    <Label
                                        htmlFor="delegadoRh"
                                    >
                                        Integrante
                                    </Label>
                                </li>
                            </ul>
                        </div>
                    </>
                </div>

                <div className="absolute right-6 bottom-6 flex gap-5">
                    <Button type="button" onClick={() => redefinirRoles()}>
                        Redefinir
                    </Button>
                    <Button onClick={() => atualizarRoles()} type="button">
                        Salvar
                    </Button>
                </div>
            </div>
        </>

    )
}