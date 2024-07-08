import {AcessoModel, InfoColaborador, ResponseSocketSolicitacaoTiDTO, SolicitcaoTiDTO} from "@/lib/models";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {alterNomeCompletoParaNomeSobrenome, formatDateTimeUser} from "@/lib/utils";
import React, {ChangeEvent, ChangeEventHandler, useCallback, useContext} from "react";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {AuthContext} from "@/contexts/AuthContext";
import {
    colaboradorSelectGlobal, colaboradorSelectGlobalProps,
    roleColaboradorSelectGlobal,
    roleColaboradorSelectGlobalProps
} from "@/lib/globalStates";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

type ListColaboradoresAtivosProps = {
    tipoSelect?: boolean
}

export default function ListColaboradoresAtivos({tipoSelect}: ListColaboradoresAtivosProps) {
    const queryClient = useQueryClient();
    const {host, user, acessos} = useContext(AuthContext)
    const roleSelect = roleColaboradorSelectGlobal<roleColaboradorSelectGlobalProps>((state: any) => state)
    const colaboradorSelect = colaboradorSelectGlobal<colaboradorSelectGlobalProps>((state: any) => state)

    const {data: colaboradores} = useQuery({
        queryKey: ["colaboradoresList"],
        queryFn: async (): Promise<InfoColaborador[]> => {
            return await axios.get(`${host}/colaborador/find/ativos`).then((response) => {
                const solicitantes: InfoColaborador[] = response.data
                return solicitantes
            })
        },

    })

    const joinAcesso = async (colaborador: InfoColaborador | null) => {
        colaboradorSelect.setColaborador(colaborador)
        await axios.get(`${host}/colaborador/find/roles?id=${colaborador?.fkAuth}`).then((response) => {
            const role: AcessoModel = response.data
            roleSelect.setSelect(role)
        })
    }

    const filtrarColaborador = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target

        const listaFiltrada = colaboradores?.filter((colaborador) => {
            return (
                value.length !== 0 ? alterNomeCompletoParaNomeSobrenome(colaborador.nomeCompleto)?.toLowerCase().includes(value.toLowerCase()) : true
            )
        })

        if (value === "") {
            queryClient.fetchQuery(["colaboradoresList"])
        }

        queryClient.setQueryData(["colaboradoresList"], listaFiltrada)
    }, [colaboradores, queryClient])

    return (
        <>
            <div className="h-full w-[20%] rounded-l-md shadow-lg">
                <div className="p-5 w-full h-[10%] bg-stone-200 rounded-tl-md shadow-md">
                    <h1 className="text-xs">
                        Colaboradores Ativos
                    </h1>
                </div>
                <hr/>
                <div className="px-2 py-3 w-full h-[90%] rounded-bl-md">
                    <div className="w-full h-full relative rounded-md overflow-y-scroll scrowInvivel">
                        <div className="absolute  flex flex-col gap-3 w-full">
                            <span className="sticky top-0 w-full z-50 h-full flex flex-col gap-2 bg-white py-2">
                                <>
                            <Input onChange={filtrarColaborador} name="nomeCompleto" placeholder="Nome sobrenome"
                                   className="border focus-visible:ring-0   bg-white "/>
                                <Search className="absolute top-4 stroke-stone-500 right-5"/>
                                </>
                                {tipoSelect && (
                                    <>
                                        <select
                                            value=""
                                            className="border focus-visible:ring-0   bg-white lex h-10 w-full rounded-md !border-stone-600 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                            <option value="" disabled>Tipo colaborador</option>
                                            <option value="CLT">CLT</option>
                                            <option value="ESTAGIARIO">Estagiario</option>
                                            <option value="TERCEIRIZADO">Terceirizado</option>
                                            <option value="Todos">Todos</option>
                                        </select>
                                    </>
                                )}

                            </span>
                            {colaboradores?.sort((a: any, b: any) => a.id - b.id
                            ).map((colaborador: InfoColaborador, i) => {
                                return (
                                    <button key={i}
                                            onClick={() => joinAcesso(colaborador)}
                                            className="bg-stone-200 px-2 h-[60px] relative flex items-center hover:bg-stone-300 justify-between transition-all rounded-md w-full active:scale-95">
                                        <Avatar>
                                            <AvatarImage
                                                src={!colaborador.dirFoto ? 'https://placehold.co/600?text=Foto' : colaborador.dirFoto}
                                                alt="fotoColaborador"/>
                                        </Avatar>
                                        <span
                                            className="text-xs whitespace-nowrap">{alterNomeCompletoParaNomeSobrenome(colaborador.nomeCompleto)}</span>
                                        <span
                                            className="smallSpan absolute right-2 bottom-1">#{colaborador.fkAuth}</span>
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