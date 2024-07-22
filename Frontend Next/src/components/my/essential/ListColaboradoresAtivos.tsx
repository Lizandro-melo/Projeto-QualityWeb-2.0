import {AcessoModel, InfoColaborador, ResponseSocketSolicitacaoTiDTO, SolicitcaoTiDTO} from "@/lib/models";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {alterNomeCompletoParaNomeSobrenome, cn, formatDateTimeUser} from "@/lib/utils";
import React, {ChangeEvent, ChangeEventHandler, useCallback, useContext, useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {AuthContext} from "@/contexts/AuthContext";
import {
    colaboradorSelectGlobal, colaboradorSelectGlobalProps,
    roleColaboradorSelectGlobal,
    roleColaboradorSelectGlobalProps, stateBarGlobalprops, stateListColaboradorBarGlobal, stateNavBarGlobal
} from "@/lib/globalStates";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";

type ListColaboradoresAtivosProps = {
    tipoSelect?: boolean
}

type filtroProps = {
    nome: string
    tipo: string
}

export default function ListColaboradoresAtivos({tipoSelect}: ListColaboradoresAtivosProps) {
    const queryClient = useQueryClient();
    const {host, configToken, searchParams} = useContext(AuthContext)
    const roleSelect = roleColaboradorSelectGlobal<roleColaboradorSelectGlobalProps>((state: any) => state)
    const colaboradorSelect = colaboradorSelectGlobal<colaboradorSelectGlobalProps>((state: any) => state)
    const [filtro, setFiltro] = useState<filtroProps>({
        tipo: "Todos",
        nome: ""
    })

    const fetchColaboradores = async (): Promise<InfoColaborador[]> => {
        try {
            const response = await axios.get(
                `${host}/colaborador/find/colaboradores?nome=${filtro?.nome}&tipo=${filtro?.tipo}`,
                configToken
            );
            return response.data;
        } catch (error) {
            return [];
        }
    };

    const {data: colaboradores, refetch: reFetchColaboradoresAtivos} = useQuery({
        queryKey: ['colaboradoresList', filtro],
        queryFn: fetchColaboradores,
        enabled: !!filtro && !!configToken
    });
    const state = stateListColaboradorBarGlobal<stateBarGlobalprops>((state: any) => state);

    const joinAcesso = async (colaborador: InfoColaborador | null) => {
        colaboradorSelect.setColaborador(colaborador)
        await axios.get(`${host}/colaborador/find/roles?id=${colaborador?.fkAuth}`, configToken).then((response) => {
            const role: AcessoModel = response.data
            roleSelect.setSelect(role)
        })
    }

    const alterFilter = (e: ChangeEvent<any>) => {
        const {name, value} = e.target
        setFiltro((prevState: any) => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        reFetchColaboradoresAtivos()
    }, [filtro, queryClient]);


    return (
        <>
            <div
                onClick={() => {
                    if (!state.stateNavBar) {
                        state.setBool(true)
                    }
                }}
                className={cn("h-full w-[20%] rounded-l-md shadow-lg transition-all", !state.stateNavBar && "!w-[13%]")}>
                <div className="p-5 w-full h-[10%] bg-stone-200 rounded-tl-md shadow-md">
                    <h1 className={cn("text-xs", !state.stateNavBar && "text-center")}>
                        Lista de colaboradores
                    </h1>
                </div>
                <hr/>
                <div className="px-2 py-3 w-full h-[90%] rounded-bl-md">
                    <div className="w-full h-full relative rounded-md overflow-y-scroll scrowInvivel">
                        <div className="absolute  flex flex-col gap-3 w-full">
                            {state.stateNavBar && (
                                <span className="sticky top-0 w-full z-50 h-full flex flex-col gap-2 bg-white py-2">
                                <>
                            <Input onChange={alterFilter} value={filtro?.nome} name="nome"
                                   placeholder="Nome sobrenome"
                                   className="border focus-visible:ring-0   bg-white "/>
                                <Search className="absolute top-4 stroke-stone-500 right-5"/>
                                </>
                                    {tipoSelect && (
                                        <>
                                            <select
                                                onChange={alterFilter}
                                                defaultValue={filtro?.tipo}
                                                name="tipo"
                                                className="border focus-visible:ring-0   bg-white lex h-10 w-full rounded-md !border-stone-600 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                                <option value="TODOS" selected>Todos</option>
                                                <option value="CLT">CLT</option>
                                                <option value="ESTAGIARIO">Estagiario</option>
                                                <option value="TERCEIRIZADO">Terceirizado</option>
                                                <option value="DESLIGADO">Desligado</option>
                                            </select>
                                        </>
                                    )}

                            </span>
                            )}
                            {colaboradores?.sort((a, b) => {
                                return a.nomeCompleto! >= b.nomeCompleto! ? 1 : -1;
                            }).map((colaborador: InfoColaborador, i) => {
                                return (
                                    <button key={i}
                                            onClick={() => joinAcesso(colaborador)}
                                            title={alterNomeCompletoParaNomeSobrenome(colaborador.nomeCompleto)}
                                            className={cn("bg-stone-200 px-2 h-[60px] relative flex items-center hover:bg-stone-300 justify-between transition-all rounded-md w-full active:scale-95", !state.stateNavBar && "!justify-center")}>
                                        <Avatar>
                                            <AvatarImage
                                                src={!colaborador.dirFoto ? 'https://placehold.co/600?text=Foto' : colaborador.dirFoto}
                                                alt="fotoColaborador"/>
                                        </Avatar>
                                        {state.stateNavBar && (
                                            <>
                                            <span
                                                className="text-xs whitespace-nowrap">{alterNomeCompletoParaNomeSobrenome(colaborador.nomeCompleto)}</span>
                                                <span
                                                    className="smallSpan absolute right-2 bottom-1">#{colaborador.fkAuth}</span>
                                            </>
                                        )}

                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}