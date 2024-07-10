import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ChangeEvent, useCallback, useContext, useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {AuthContext} from "@/contexts/AuthContext";
import {
    CategoriaClassificacaoTiModels,
    InfoColaborador,
    ResponseSocketSolicitacaoTiDTO,
    SolicitacaoTiWithMotivoDTO, SolicitcaoTiDTO
} from "@/lib/models";
import {alterNomeCompletoParaNomeSobrenome, formatDateTimeUser} from "@/lib/utils";
import {
    solicitacaoSelectGlobal,
    solicitacaoSelectGlobalProps, stateLoundingGlobal, stateLoundingGlobalProps,
    stateModalHistoricoTicketGlobal,
    stateModalProps
} from "@/lib/globalStates";

export default function ModalFindSolicitacao() {

    const state = stateModalHistoricoTicketGlobal<stateModalProps>((state) => state)

    return (
        <>
            <Dialog open={state.stateModal} onOpenChange={state.alterState}>
                <DialogContent className="!max-w-[68rem] min-h-[90%]">
                    <DialogHeader>
                        <DialogTitle>Historico solicitações</DialogTitle>
                        <DialogDescription>Aqui você irá conseguir buscar todas as solicitações e verificar o que
                            aconteceu com cada uma delas.</DialogDescription>
                        <div className="border rounded-xl p-5 w-full h-full">
                            <ListaSolicitacoes/>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}


type filterProps = {
    numero: string,
    solicitante: string,
    situacao: string,
    motivo: string,
    dataAbertura: string,
    toggleData: 0 | 1 | 2,
    toggleNumero: 0 | 1 | 2
}

function ListaSolicitacoes() {

    const {host, user, acessos, configToken} = useContext(AuthContext)
    const queryClient = useQueryClient();
    const displayLounding = stateLoundingGlobal<stateLoundingGlobalProps>((state: any) => state)
    const selectSolicitacao = solicitacaoSelectGlobal<solicitacaoSelectGlobalProps>((state: any) => state)
    const state = stateModalHistoricoTicketGlobal<stateModalProps>((state) => state)
    const {data: solicitacoes} = useQuery({
        queryKey: ["solicitacoesHistory"],
        queryFn: async (): Promise<SolicitacaoTiWithMotivoDTO[]> => {
            return await axios.get(`${host}/suporte/find/solicitacao/all`, configToken).then((response) => {
                const solicitacoes: SolicitacaoTiWithMotivoDTO[] = response.data.map((solicitacao: SolicitacaoTiWithMotivoDTO) => {
                    if ((solicitacao.status === "FINALIZADO" && !solicitacao.motivo)) {
                        solicitacao.motivo = "Pulado"
                    }
                    return solicitacao;
                })
                return insertSolicitacoes(solicitacoes)
            })
        }
    })
    const {data: solicitantes} = useQuery({
        queryKey: ["solicitantesHistory"],
        queryFn: async (): Promise<InfoColaborador[]> => {
            return await axios.get(`${host}/colaborador/find/ativos`, configToken).then((response) => {
                const solicitantes: InfoColaborador[] = response.data
                return solicitantes
            })
        }
    })
    const {data: categorias} = useQuery({
        queryKey: ["categorias"],
        queryFn: async () => {
            return await axios.get(`${host}/suporte/find/classificar/categorias/all`, configToken).then(response => {
                const categorias: CategoriaClassificacaoTiModels[] = response.data
                return categorias
            })
        }
    })

    const [filter, setFilter] = useState<filterProps>({
        numero: "",
        dataAbertura: "",
        solicitante: "",
        motivo: "",
        situacao: "",
        toggleData: 0,
        toggleNumero: 0
    })

    const insertSolicitacoes = (solicitacoes: SolicitacaoTiWithMotivoDTO[]) => {
        if (acessos?.rolesTI) {
            return solicitacoes
        } else {
            return solicitacoes.filter(value => (value.solicitante.nomeCompleto === user?.nomeCompleto))
        }
    }

    const alterFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFilter((prevState: any) => ({
            ...prevState,
            [name]: value
        }))
    }, [])

    const applyFilter = useCallback(() => {
        const filteredData = solicitacoes?.filter((solicitacao) => {
            return (
                (filter.numero ? solicitacao.id?.toString().includes(filter.numero) : true) &&
                (filter.solicitante ? alterNomeCompletoParaNomeSobrenome(solicitacao.solicitante.nomeCompleto)?.toLowerCase().includes(filter.solicitante.toLowerCase()) : true) &&
                (filter.situacao ? solicitacao.status?.toUpperCase() === filter.situacao.toUpperCase() : true) &&
                (filter.motivo ? solicitacao.motivo?.toUpperCase().includes(filter.motivo.toUpperCase()) : true) &&
                (filter.dataAbertura ? formatDateTimeUser(solicitacao.dataHora)?.includes(filter.dataAbertura) : true)
            );
        });
        if (filteredData?.length === 0) {
            queryClient.fetchQuery(["solicitacoesHistory"])
            return
        }
        if (filter.numero === "" && filter.solicitante === "" && filter.motivo === "" && filter.situacao === "" && filter.dataAbertura === "") {
            queryClient.fetchQuery(["solicitacoesHistory"])
            return
        }

        queryClient.setQueryData(["solicitacoesHistory"], filteredData);

    }, [filter, solicitacoes, queryClient]);

    const joinSolicitacao = async (idSolicitacao: number | undefined) => {
        displayLounding.setDisplayLounding()
        await new Promise(resolve => setTimeout(resolve, 500))
        await axios.get(`${host}/suporte/find/solicitacao/exatc?id=${idSolicitacao}`, configToken).then(async (response) => {
            const solicitacaoSelect: ResponseSocketSolicitacaoTiDTO = response.data
            selectSolicitacao.setSelect(solicitacaoSelect);
            displayLounding.setDisplaySuccess(`Solicitacão ${idSolicitacao}, carregada com sucesso!`)
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
            state.alterState()
        }).catch(async (err) => {
            displayLounding.setDisplayFailure("Não foi possivel carregar está solicitacão!")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
        })
    }

    useEffect(() => {
        applyFilter()
    }, [filter]);


    return (
        <>
            <div className="w-full h-full relative overflow-y-scroll">
                <div className="absolute">
                    <Table className="relative">
                        <TableCaption>...</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hover:bg-slate-100 sticky top-1">
                            <span className="flex gap-2 relative items-center justify-between">
                                    <Input className="border-none bg-transparent focus-visible:!ring-0 "
                                           placeholder="N° solicitação" type="number" name="numero"
                                           onChange={alterFilter}
                                    />
                        </span>
                                </TableHead>
                                <TableHead className="hover:bg-slate-100">
                            <span className="flex gap-2 relative items-center justify-between whitespace-nowrap">
                                <Input className="border-none bg-transparent focus-visible:!ring-0 "
                                       placeholder="Solicitante" type="text" name="solicitante"
                                       onChange={alterFilter}
                                       list="listSolicitantes"
                                />
                                <datalist id="listSolicitantes">
                                    {solicitantes?.map((solicitante) => {
                                        return (
                                            <option value={alterNomeCompletoParaNomeSobrenome(solicitante.nomeCompleto)}
                                                    key={solicitante.fkAuth}>{alterNomeCompletoParaNomeSobrenome(solicitante.nomeCompleto)}</option>
                                        )
                                    })}
                                </datalist>
                        </span>
                                </TableHead>
                                <TableHead className="hover:bg-slate-100">
                            <span className="flex gap-2 relative items-center justify-between">
                            <Input className="border-none bg-transparent focus-visible:!ring-0 " placeholder="Situação"
                                   type="text" name="situacao"
                                   list="status"
                                   onChange={alterFilter}/>
                                 <datalist id="status">
                                    <option value={"PENDENTE"}>PENDENTE</option>
                                    <option value={"FINALIZADO"}>FINALIZADO</option>
                                </datalist>
                        </span>
                                </TableHead>
                                <TableHead className="hover:bg-slate-100">
                        <span className="flex gap-2 relative items-center justify-between">
                            <Input className="border-none bg-transparent focus-visible:!ring-0 " placeholder="Motivo"
                                   type="text" name="motivo"
                                   list="motivos"
                                   onChange={alterFilter}/>
                            <datalist id="motivos">
                                    <option value={"Pulado"}>Pulado</option>
                                {categorias?.map((categoria) => {
                                    return (
                                        <option value={categoria.nome} key={categoria.id}>{categoria.nome}</option>
                                    )
                                })}
                                </datalist>

                        </span>
                                </TableHead>
                                <TableHead className="hover:bg-slate-100 ">
                                    {filter && (
                                        <span className="flex gap-2 relative items-center justify-between">
                                 <Input className="border-none bg-transparent focus-visible:!ring-0 "
                                        placeholder="Data " type="text" name="dataAbertura"
                                        onChange={alterFilter}/>
                            </span>
                                    )}

                                </TableHead>
                                <TableHead className="hover:bg-slate-100">
                                    <span className="whitespace-nowrap">Data finalizada</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {solicitacoes?.map((solicitacao) => {
                                return (
                                    <TableRow key={solicitacao.id} className="cursor-pointer"
                                              onClick={() => joinSolicitacao(solicitacao.id)}>
                                        <TableCell>{solicitacao.id}</TableCell>
                                        <TableCell>{alterNomeCompletoParaNomeSobrenome(solicitacao.solicitante.nomeCompleto)}</TableCell>
                                        <TableCell>{solicitacao.status}</TableCell>
                                        <TableCell>{solicitacao.motivo}</TableCell>
                                        <TableCell
                                            className="whitespace-nowrap">{formatDateTimeUser(solicitacao.dataHora)}</TableCell>
                                        <TableCell
                                            className="whitespace-nowrap">{formatDateTimeUser(solicitacao.dataHoraFinalizado)}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}