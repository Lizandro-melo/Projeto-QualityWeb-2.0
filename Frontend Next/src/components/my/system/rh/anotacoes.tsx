import ListColaboradoresAtivos from "@/components/my/essential/ListColaboradoresAtivos";
import {
    anotacaoSelectGlobal,
    AnotacaoSelectGlobalProps,
    colaboradorSelectGlobal,
    colaboradorSelectGlobalProps, stateModalAnotacaoGlobal, stateModalProps
} from "@/lib/globalStates";
import {
    alterNomeCompletoParaNomeSobrenome,
    data1MesAtrasInput, dataAtualInput, formatarDataComum,
    formatarDataInput,
    formatDateTimeUser
} from "@/lib/utils";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import ContainerSystem from "@/components/my/essential/container-system";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {AuthContext} from "@/contexts/AuthContext";
import {
    AnotacaoRhModels,
    ContabilizacaoDadosAnotacao, InfoColaborador,
    InfoColaboradorCompletoDTO,
    ResponseFindAnotacaoRhDTO
} from "@/lib/models";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {LabelInputPadrao} from "@/components/my/essential/label-input-padrao";
import {useForm} from "react-hook-form";

type filtroProps = {
    anotacao: string
    tipo: string
    status: boolean
    dataInicio: string
    dataFim: string
    idColaborador: string
}
const dataObj = new Date()
export default function Anotacoes() {
    const queryClient = useQueryClient();
    const {host, configToken, searchParams} = useContext(AuthContext);
    const {colaborador} = colaboradorSelectGlobal<colaboradorSelectGlobalProps>((state: any) => state);
    const {setAnotacao} = anotacaoSelectGlobal<AnotacaoSelectGlobalProps>((state: any) => state);
    const [filtro, setFiltro] = useState<filtroProps>({
        anotacao: "",
        tipo: "",
        status: true,
        dataInicio: data1MesAtrasInput(),
        dataFim: dataAtualInput(),
        idColaborador: ""
    })
    const state = stateModalAnotacaoGlobal<stateModalProps>(state => state)


    const fetchAnotacoes = async (): Promise<ResponseFindAnotacaoRhDTO | undefined> => {
        try {
            if (!colaborador?.fkAuth) {
                return undefined
            }
            const response = await axios.get(`${host}/rh/find/anotacao/filter?anotacao=${filtro.anotacao}&id=${filtro.idColaborador}&tipo=${filtro.tipo}&status=${filtro.status}&dataInicio=${filtro.dataInicio}&dataFim=${filtro.dataFim}`, configToken).then((response) => {
                const anotacoes: ResponseFindAnotacaoRhDTO = response.data
                return anotacoes
            })
            return response;
        } catch (error) {
            return undefined
        }
    };

    const {data: responseAnotacao} = useQuery({
        queryKey: ["Anotacoes", filtro],
        queryFn: fetchAnotacoes,
        enabled:
            !!filtro && !!colaborador?.fkAuth && filtro?.tipo !== "" && !!configToken
    })

    useEffect(() => {
        if (!colaborador) {
            return
        }
        setFiltro((prevState) => ({
            ...prevState,
            tipo: colaborador?.tipo,
            idColaborador: colaborador.fkAuth.toString()!
        }))
    }, [colaborador])

    const alterFiltro = (e: ChangeEvent<any>) => {
        const {name, value} = e.target
        if (name === "status") {
            setFiltro((prevState: any) => ({...prevState, status: value === "true"}))
            return
        }
        setFiltro((prevState: any) => ({...prevState, [name]: value}))
    }

    useEffect(() => {
        queryClient.fetchQuery(["Anotacoes", filtro], fetchAnotacoes)
    }, [filtro, queryClient, colaborador]);

    return (
        <>
            <ModalAnotacaoView/>
            <ListColaboradoresAtivos tipoSelect/>
            <ContainerSystem>
                {responseAnotacao?.infoColaborador && (
                    <>
                        <div className="flex w-full">
                            <div>


                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={responseAnotacao?.infoColaborador.infoPessoais.dirFoto ? responseAnotacao?.infoColaborador.infoPessoais.dirFoto : "https://placehold.co/100x100"}
                                    className={"w-[100px] h-[100px]"}
                                    alt="Foto do Colaborador"/>


                            </div>
                            <div className=" h-full flex flex-col text-xs px-3">
                                {responseAnotacao.infoColaborador.infoPessoais.fkAuth && (
                                    <span>Código de registro: {responseAnotacao.infoColaborador.infoPessoais.fkAuth}</span>
                                )}
                                <span>Nome: {responseAnotacao?.infoColaborador.infoPessoais.nomeCompleto}</span>
                                {responseAnotacao.infoColaborador.infoPessoais.dataNascimento && (
                                    <span>Idade: {new Date().getFullYear() - parseInt(responseAnotacao?.infoColaborador.infoPessoais.dataNascimento.split("-")[0])} anos ({formatarDataComum(responseAnotacao?.infoColaborador.infoPessoais.dataNascimento)?.split(" ")[0]})</span>
                                )}

                                {responseAnotacao.infoColaborador.infoPessoais.cpf && (
                                    <span>CPF: {responseAnotacao.infoColaborador.infoPessoais.cpf}</span>
                                )}

                            </div>
                            <div className="h-full flex flex-col text-xs px-3">
                                {responseAnotacao.infoColaborador.infoMEI ? (
                                    <>
                                        {responseAnotacao.infoColaborador.infoMEI?.dataAdmissao && (
                                            <span>Data de contratação: {formatarDataComum(responseAnotacao.infoColaborador.infoMEI.dataAdmissao)}</span>
                                        )}
                                        {responseAnotacao.infoColaborador.infoMEI?.dataDemissao && (
                                            <span>Data de desligamento: {formatarDataComum(responseAnotacao.infoColaborador.infoMEI.dataDemissao)}</span>
                                        )}
                                        {responseAnotacao.infoColaborador.infoMEI.empresa?.nome && (
                                            <span>Empresa: {responseAnotacao.infoColaborador.infoMEI.empresa.nome}</span>
                                        )}
                                        {responseAnotacao.infoColaborador.infoMEI.setor?.nome && (
                                            <span>Setor: {responseAnotacao.infoColaborador.infoMEI.setor.nome}</span>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {(responseAnotacao.infoColaborador.infoCLT && !responseAnotacao.infoColaborador.infoEstagiario?.status) ? (
                                            <>
                                                {responseAnotacao.infoColaborador.infoCLT?.dataAdmissao && (
                                                    <span>Data de contratação: {formatarDataComum(responseAnotacao.infoColaborador.infoCLT.dataAdmissao)}</span>
                                                )}
                                                {responseAnotacao.infoColaborador.infoCLT?.dataDemissao && (
                                                    <span>Data de desligamento: {formatarDataComum(responseAnotacao.infoColaborador.infoCLT.dataDemissao)}</span>
                                                )}
                                                {responseAnotacao.infoColaborador.infoCLT.empresa?.nome && (
                                                    <span>Empresa: {responseAnotacao.infoColaborador.infoCLT.empresa.nome}</span>
                                                )}
                                                {responseAnotacao.infoColaborador.infoCLT.setor?.nome && (
                                                    <span>Setor: {responseAnotacao.infoColaborador.infoCLT.setor.nome}</span>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {responseAnotacao.infoColaborador.infoEstagiario?.dataAdmissao && (
                                                    <span>Data de contratação: {responseAnotacao.infoColaborador.infoEstagiario.dataAdmissao}</span>
                                                )}
                                                {responseAnotacao.infoColaborador.infoEstagiario?.dataDemissao && (
                                                    <span>Data de desligamento: {responseAnotacao.infoColaborador.infoEstagiario.dataDemissao}</span>
                                                )}
                                                {responseAnotacao.infoColaborador.infoEstagiario?.empresa?.nome && (
                                                    <span>Empresa: {responseAnotacao.infoColaborador.infoEstagiario.empresa.nome}</span>
                                                )}
                                                {responseAnotacao.infoColaborador.infoEstagiario?.setor?.nome && (
                                                    <span>Setor: {responseAnotacao.infoColaborador.infoEstagiario.setor.nome}</span>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="w-full h-full relative overflow-y-auto">
                            <div className="absolute w-full">
                                <Table className="relative">
                                    <TableCaption>...</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="hover:bg-slate-100 sticky top-1">
                            <span className="flex gap-2 relative items-center justify-between">
                                    <Input onChange={alterFiltro}
                                           className="border-none bg-transparent focus-visible:!ring-0 "
                                           placeholder="Anotação" type="text" name="anotacao"

                                    />
                        </span>
                                            </TableHead>

                                            <TableHead className="hover:bg-slate-100">
                            <span className="flex gap-2 relative items-center justify-between">
                            <select onChange={alterFiltro}
                                    className="flex h-10 w-full rounded-md border text-center !border-stone-600 border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-none bg-transparent focus-visible:!ring-0"
                                    name="tipo"
                                    value={filtro.tipo}
                            >
                                <option value="TODOS">TODOS</option>
                                    <option value="CLT">CLT</option>
                                    <option value="ESTAGIARIO">ESTAGIARIO</option>
                                    <option value="TERCEIRIZADO">TERCEIRIZADO</option>
                            </select>

                        </span>
                                            </TableHead>
                                            <TableHead className=" hover:bg-slate-100">
                        <span className=" flex gap-2 relative items-center justify-between">
                            <select
                                className=" flex h-10 w-full rounded-md border text-center !border-stone-600 border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-none bg-transparent focus-visible:!ring-0"
                                name="status" onChange={alterFiltro} value={filtro.status ? "true" : "false"}>
                            <option value="true" selected>Ativos</option>
                            <option value="false">Inativos</option>
                            </select>

                                        </span>
                                            </TableHead>

                                            <TableHead className="hover:bg-slate-100">
                                                <span className="flex gap-2 relative items-center justify-center">
                            <Input onChange={alterFiltro}
                                   className="border-none bg-transparent text-center focus-visible:!ring-0 "
                                   type="date" name="dataInicio" title={"Data de inicio"} value={filtro.dataInicio}
                            />

                        </span>
                                            </TableHead>
                                            <TableHead className="hover:bg-slate-100">
                                                  <span className="flex gap-2 relative items-center justify-center">
                            <Input onChange={alterFiltro}
                                   className="border-none bg-transparent text-center focus-visible:!ring-0 "
                                   type="date" name="dataFim" title={"Data de final"} value={filtro.dataFim}
                            />

                        </span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {responseAnotacao?.anotacoes?.sort((a: any, b: any) => a.id - b.id).map((anotacao) => {
                                            return (
                                                <TableRow
                                                    key={anotacao.id}
                                                    onClick={() => {
                                                        state.alterState()
                                                        setAnotacao(anotacao)
                                                    }}
                                                    className={"hover:bg-stone-200 cursor-pointer"}>
                                                    <TableCell className="max-w-[200px] overflow-hidden text-ellipsis">
                                                            <span
                                                                className=" whitespace-nowrap ">
                                                            {anotacao.anotacao}
                                                            </span>
                                                    </TableCell>
                                                    <TableCell>
                                                            <span
                                                                className="text-center flex items-center justify-center">
                                                            {anotacao.tipoAnotacao}
                                                            </span>
                                                    </TableCell>
                                                    <TableCell>
                                                            <span
                                                                className="text-center flex items-center justify-center"
                                                            >
                                                            {anotacao.status ? "Ativa" : "Inativa"}
                                                            </span>
                                                    </TableCell>
                                                    <TableCell>
                                                            <span
                                                                className="text-center flex items-center justify-center"
                                                            >
                                                            {formatarDataComum(anotacao.dataInicio)}
                                                            </span>
                                                    </TableCell>
                                                    <TableCell>
                                                            <span
                                                                className="text-center flex items-center justify-center"
                                                            >
                                                            {formatarDataComum(anotacao.dataFinal)}
                                                            </span>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </>

                )}
            </ContainerSystem>
        </>
    )
}

export function ModalAnotacaoView() {

    const state = stateModalAnotacaoGlobal<stateModalProps>(state => state)
    const {anotacao} = anotacaoSelectGlobal<AnotacaoSelectGlobalProps>((state: any) => state);
    const {register, handleSubmit} = useForm()

    return (
        <>
            <Dialog open={state.stateModal} onOpenChange={state.alterState}>
                <DialogContent className="!max-w-[68rem] min-h-[90%]">
                    <DialogHeader>
                        <DialogTitle>Anotação {anotacao?.id}#</DialogTitle>
                        <DialogDescription>Aqui você irá conseguir visualizar e editar a anotação!</DialogDescription>
                        <div className="border rounded-xl p-5 w-full h-full">
                            <LabelInputPadrao.Root textArea title={"Ocorrencia"} name={"anotacao"} width={100} required
                                                   register={register} value={anotacao?.anotacao}/>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}