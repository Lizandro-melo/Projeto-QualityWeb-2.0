import ListColaboradoresAtivos from "@/components/my/essential/ListColaboradoresAtivos";
import {
    anotacaoSelectGlobal,
    AnotacaoSelectGlobalProps,
    colaboradorSelectGlobal,
    colaboradorSelectGlobalProps,
    stateLoundingGlobal,
    stateLoundingGlobalProps,
    stateModalAnotacaoGlobal,
    stateModalProps
} from "@/lib/globalStates";
import {
    cn, data1MesAtrasInput, dataAtualInput, formatarDataComum,
} from "@/lib/utils";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import ContainerSystem from "@/components/my/essential/container-system";
import React, {ChangeEvent, useContext, useEffect, useRef, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {AuthContext} from "@/contexts/AuthContext";
import {
    AnotacaoRhModels,
    ResponseFindAnotacaoRhDTO
} from "@/lib/models";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {LabelInputPadrao} from "@/components/my/essential/label-input-padrao";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {RotateCw} from "lucide-react";
import ListAnexos from "@/components/my/essential/list-anexos";
import ListAnexosBaixar from "@/components/my/essential/list-anexos-baixar";


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

            const response = await axios.get(`${host}/rh/find/anotacao/filter?anotacao=${filtro.anotacao}&id=${filtro.idColaborador}&tipo=${filtro.tipo}&status=${filtro.status}&dataInicio=${filtro.dataInicio}&dataFim=${filtro.dataFim}`, configToken).then((response) => {
                const anotacoes: ResponseFindAnotacaoRhDTO = response.data
                return anotacoes
            })
            return response;
        } catch (error) {
            return undefined
        }
    };

    const {data: responseAnotacao, refetch} = useQuery({
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
        refetch()
    }, [filtro, queryClient, colaborador])

    return (
        <>
            <ModalAnotacaoView refreshNotas={refetch}/>
            <ListColaboradoresAtivos tipoSelect/>
            <ContainerSystem>
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
                            {responseAnotacao?.infoColaborador.infoPessoais.fkAuth && (
                                <span>Código de registro: {responseAnotacao?.infoColaborador.infoPessoais.fkAuth}</span>
                            )}
                            <span>Nome: {responseAnotacao?.infoColaborador.infoPessoais.nomeCompleto}</span>
                            {responseAnotacao?.infoColaborador.infoPessoais.dataNascimento && (
                                <span>Idade: {new Date().getFullYear() - parseInt(responseAnotacao?.infoColaborador.infoPessoais.dataNascimento.split("-")[0])} anos ({formatarDataComum(responseAnotacao?.infoColaborador.infoPessoais.dataNascimento)?.split(" ")[0]})</span>
                            )}

                            {responseAnotacao?.infoColaborador.infoPessoais.cpf && (
                                <span>CPF: {responseAnotacao?.infoColaborador.infoPessoais.cpf}</span>
                            )}

                        </div>
                        <div className="h-full flex flex-col text-xs px-3">
                            {responseAnotacao?.infoColaborador.infoMEI ? (
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
                                    {(responseAnotacao?.infoColaborador.infoCLT && !responseAnotacao?.infoColaborador.infoEstagiario?.status) ? (
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
                                            {responseAnotacao?.infoColaborador.infoEstagiario?.dataAdmissao && (
                                                <span>Data de contratação: {responseAnotacao?.infoColaborador.infoEstagiario.dataAdmissao}</span>
                                            )}
                                            {responseAnotacao?.infoColaborador.infoEstagiario?.dataDemissao && (
                                                <span>Data de desligamento: {responseAnotacao?.infoColaborador.infoEstagiario.dataDemissao}</span>
                                            )}
                                            {responseAnotacao?.infoColaborador.infoEstagiario?.empresa?.nome && (
                                                <span>Empresa: {responseAnotacao?.infoColaborador.infoEstagiario.empresa.nome}</span>
                                            )}
                                            {responseAnotacao?.infoColaborador.infoEstagiario?.setor?.nome && (
                                                <span>Setor: {responseAnotacao?.infoColaborador.infoEstagiario.setor.nome}</span>
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
                                    className="flex h-10 w-full rounded-md border text-center !border-stone-600 border-Input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-none bg-transparent focus-visible:!ring-0"
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
                                className=" flex h-10 w-full rounded-md border text-center !border-stone-600 border-Input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-none bg-transparent focus-visible:!ring-0"
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
                                                    setAnotacao(anotacao)
                                                    state.alterState()
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


            </ContainerSystem>
        </>
    )
}

export function ModalAnotacaoView({refreshNotas}: { refreshNotas: any }) {

    const queryClient = useQueryClient();
    const state = stateModalAnotacaoGlobal<stateModalProps>(state => state)
    const {colaborador} = colaboradorSelectGlobal<colaboradorSelectGlobalProps>((state: any) => state);
    const anotacaoSelect = anotacaoSelectGlobal<AnotacaoSelectGlobalProps>((state: any) => state);
    const {register, handleSubmit} = useForm()
    const [anotacao, setAnotacao] = useState<AnotacaoRhModels>()
    const [modo, setModo] = useState(false)
    const [anexoListItens, setAnexoListItens] = useState<File[]>([]);

    const {host, configToken} = useContext(AuthContext)
    const displayLounding = stateLoundingGlobal<stateLoundingGlobalProps>((state: any) => state)

    useEffect(() => {
        setAnotacao(anotacaoSelect.anotacao!)
    }, [anotacaoSelect.anotacao]);

    const sendAnotacaoEditada = async () => {
        displayLounding.setDisplayLounding()
        let updatedAnexos: string[] = [];
        if (anexoListItens.length !== 0) {
            try {
                updatedAnexos = await updateFile();
            } catch {
                displayLounding.setDisplayFailure("Falha na tentativa de enviar os documentos. Tente novamente!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                displayLounding.setDisplayReset();
                return;
            }
        }
        const anotacaoRequest: AnotacaoRhModels = {
            ...anotacao!,
            anexo: updatedAnexos.length === 0 ? null : JSON.stringify(updatedAnexos),
        }
        await new Promise(resolve => setTimeout(resolve, 500))
        await axios.put(`${host}/rh/update/anotacao/atualizar`, anotacaoRequest, configToken).then(async (response) => {
            displayLounding.setDisplaySuccess(response.data)
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
            setModo(false)
            state.alterState()
            refreshNotas()
            setAnexoListItens([])
        }).catch(async (error) => {
            displayLounding.setDisplayFailure("Não foi possivel atualizar a anotação")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
        })
    };

    const inativarNota = async () => {
        displayLounding.setDisplayLounding()
        await new Promise(resolve => setTimeout(resolve, 500))
        await axios.delete(`${host}/rh/update/anotacao/inativar?id=${anotacao?.id}`, configToken).then(async (response) => {
            displayLounding.setDisplaySuccess(response.data)
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
            setModo(false)
            state.alterState()
            refreshNotas()
        }).catch(async (error) => {
            displayLounding.setDisplayFailure("Não foi possivel inativar a anotação")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
        })
    }

    const reativarNota = async () => {
        displayLounding.setDisplayLounding()
        await new Promise(resolve => setTimeout(resolve, 500))
        await axios.get(`${host}/rh/update/anotacao/reativar?id=${anotacao?.id}`, configToken).then(async (response) => {
            displayLounding.setDisplaySuccess(response.data)
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
            setModo(false)
            state.alterState()
            refreshNotas()
        }).catch(async (error) => {
            displayLounding.setDisplayFailure("Não foi possivel inativar a anotação")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
        })
    }

    const alterAnotacao = (e: ChangeEvent<any>) => {
        const {name, value} = e.target
        setAnotacao((prevState: any) => ({
            ...prevState,
            [name]: value
        }))
    }

    const alterDados = (e: ChangeEvent<any>) => {
        const {name, checked} = e.target

        setAnotacao((prevState: any) => ({
            ...prevState,
            [name]: checked
        }))
    }

    const updateFile = async () => {
        let updatedAnexos: string[] = [];
        for (const file of anexoListItens) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("dir", `C:/Users/paralamas/Desktop/Projeto QualityWeb 2.0/Frontend Next/public/assets/rh/doc/${colaborador?.nomeCompleto}`);

            await axios.post(`${host}/rh/update/doc`, formData, configToken).then(async (response) => {
                updatedAnexos.push(`/assets/rh/doc/${colaborador?.nomeCompleto}/${response.data}`)
            }).catch(async () => {
                throw new Error("Falha ao enviar o arquivo");
            });
        }
        return updatedAnexos
    };


    return (
        <>
            <Dialog open={state.stateModal} onOpenChange={() => {
                setModo(false)
                state.alterState()
            }}>
                <DialogContent className="!max-w-[68rem] scale-[85%]">
                    <DialogHeader>
                        <DialogTitle>Anotação {anotacao?.id}#</DialogTitle>
                        {modo ? (
                            <form className="border rounded-xl p-3 w-full h-full relative pb-10"
                                  onSubmit={handleSubmit(sendAnotacaoEditada)}>
                                <div className=" w-full flex flex-col gap-2">
                                    <div className={cn("flex flex-col gap-4 w-full")}>
                                        <Label htmlFor={"anotacao"}>Ocorrencia</Label>
                                        <Textarea className="text-xs" id={"anotacao"}
                                                  name={"anotacao"}
                                                  required
                                                  onChange={alterAnotacao}
                                                  value={anotacao?.anotacao} rows={3}/>
                                    </div>
                                </div>
                                <div className="flex w-full h-full py-5">
                                    <div className="text-sm w-[50%] h-full flex flex-col gap-2">
                                        <Label>Dados:</Label>
                                        <ul className="flex gap-2 flex-col py-2">
                                            <li className="flex gap-3 items-center">
                                                <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       onChange={alterDados}
                                                       id="atestado"
                                                       name="atestado"
                                                       checked={anotacao?.atestado}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="atestado"
                                                >
                                                    Atestado de dias
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       onChange={alterDados}
                                                       id="atestadoHora"
                                                       name="atestadoHora"

                                                       checked={anotacao?.atestadoHora}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="atestadoHora"
                                                >
                                                    Atestado de horas
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       id="ferias"
                                                       onChange={alterDados}
                                                       name="ferias"

                                                       checked={anotacao?.ferias}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="ferias"
                                                >
                                                    Ferias
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       id="suspensao"
                                                       name="suspensao"
                                                       onChange={alterDados}

                                                       checked={anotacao?.suspensao}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="suspensao"
                                                >
                                                    Suspensão
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       id="licenca"
                                                       onChange={alterDados}
                                                       name="licenca"

                                                       checked={anotacao?.licenca}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="licenca"
                                                >
                                                    Licença
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       id="advVerbal"
                                                       onChange={alterDados}
                                                       name="advVerbal"
                                                       checked={anotacao?.advVerbal}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="advVerbal"
                                                >
                                                    Advertência verbal
                                                </Label>

                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       id="advEscrita"
                                                       onChange={alterDados}
                                                       name="advEscrita"
                                                       checked={anotacao?.advEscrita}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="advEscrita"
                                                >
                                                    Advertência escrita
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       id="atraso"
                                                       name="atraso"
                                                       onChange={alterDados}
                                                       checked={anotacao?.atraso}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="atraso"
                                                >
                                                    Atraso
                                                </Label>
                                            </li>
                                            <li className="flex gap-2 flex-col">
                                                <div className={cn("flex flex-col gap-4 w-full")}>
                                                    <Label htmlFor={"anotacao"}>Motivo</Label>
                                                    <select
                                                        value={anotacao?.motivo}
                                                        required
                                                        name="motivo"
                                                        onChange={alterAnotacao}
                                                        className="flex h-9 w-[50%] rounded-md border !border-stone-600 border-Input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                                        <option value="">Registre um motivo</option>
                                                        <option value="Atestado dias">Atestado dias</option>
                                                        <option value="Atestado horas">Atestado horas</option>
                                                        <option value="Ferias">Ferias</option>
                                                        <option value="Suspensão">Suspensão</option>
                                                        <option value="Licença">Licença</option>
                                                        <option value="Advertência verbal">Advertência verbal</option>
                                                        <option value="Advertência escrita">Advertência escrita</option>
                                                        <option value="Atraso">Atraso</option>
                                                    </select>
                                                </div>
                                            </li>
                                            {anotacao?.atraso && (
                                                <li className="flex gap-2 flex-col">
                                                    <LabelInputPadrao.Root name="atrasoTempo" title={"Tempo de atraso"}
                                                                           change={alterAnotacao} width={50}
                                                                           type="number"
                                                                           required
                                                                           value={anotacao?.atrasoTempo!.toString()}/>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="text-sm w-[50%] h-full flex flex-col gap-2">
                                        <ul className="flex gap-2 flex-col py-2">

                                            <li className="flex gap-2 flex-col">
                                                <LabelInputPadrao.Root name="horaExtra" title={"Hora extra"}
                                                                       change={alterAnotacao} width={100}
                                                                       type="number"
                                                                       required
                                                                       value={anotacao?.horaExtra!.toString()}/>
                                            </li>

                                            <li className="flex gap-2 flex-col">
                                                <LabelInputPadrao.Root name="bancoPositivo" title={"Banco positivo"}
                                                                       change={alterAnotacao} width={100}
                                                                       type="number"
                                                                       required
                                                                       value={anotacao?.bancoPositivo!.toString()}/>
                                            </li>

                                            <li className="flex gap-2 flex-col">
                                                <LabelInputPadrao.Root name="bancoNegativo" title={"Banco negativo"}
                                                                       change={alterAnotacao} width={100}
                                                                       type="number"
                                                                       value={anotacao?.bancoNegativo!.toString()}/>
                                            </li>


                                            <li className="flex gap-2">
                                                <LabelInputPadrao.Root name="dataInicio" title={"Data de inicio"}
                                                                       change={alterAnotacao} width={50}
                                                                       type="date"
                                                                       value={anotacao?.dataInicio}/>
                                                <LabelInputPadrao.Root name="dataFinal" title={"Data de final"}
                                                                       change={alterAnotacao} width={50}
                                                                       type="date"
                                                                       value={anotacao?.dataFinal}/>
                                            </li>
                                            {anotacao?.advEscrita && (
                                                <li className="flex gap-2 flex-col">
                                                    <LabelInputPadrao.Root name="advEscritaData"
                                                                           title={"Data da adv escrita"}
                                                                           change={alterAnotacao} width={100}
                                                                           type="date"
                                                                           value={anotacao?.advEscritaData}/>
                                                </li>
                                            )}

                                        </ul>
                                        {(anotacao?.atestado || anotacao?.atestadoHora || anotacao?.advEscrita || anotacao?.licenca) && (
                                            <ListAnexos list={anexoListItens} alterList={setAnexoListItens}/>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute bottom-2">
                                    <Button variant="destructive">
                                        Enviar edição
                                    </Button>
                                    <Button variant="link" onClick={() => {
                                        if (JSON.stringify(anotacaoSelect.anotacao) !== JSON.stringify(anotacao)) {
                                            setAnotacao(anotacaoSelect.anotacao!)
                                        }
                                        setModo(false)
                                    }}>
                                        Cancelar edição
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className="border rounded-xl p-3 w-full h-full relative flex flex-col gap-5 pb-20">
                                <div className=" w-full flex flex-col gap-2">
                                    <Label className="text-sm">Ocorrencia:</Label>
                                    <span className="text-xs">
                                    {anotacao?.anotacao}
                                    </span>
                                </div>
                                <div className="flex w-full h-full">
                                    <div className="text-sm w-[50%] h-full flex flex-col gap-2">
                                        <Label>Dados:</Label>
                                        <ul className="flex gap-2 flex-col py-2">
                                            <li className="flex gap-3 items-center">
                                                <Input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       name="atestado"
                                                       id="atestado"
                                                       checked={anotacao?.atestado}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="atestado"
                                                >
                                                    Atestado de dias
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <Input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       name="atestadoHora"
                                                       id="atestadoHora"
                                                       checked={anotacao?.atestadoHora}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="atestadoHora"
                                                >
                                                    Atestado de horas
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <Input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       name="ferias"
                                                       id="ferias"
                                                       checked={anotacao?.ferias}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="ferias"
                                                >
                                                    Ferias
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <Input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       name="suspensao"
                                                       id="suspensao"
                                                       checked={anotacao?.suspensao}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="suspensao"
                                                >
                                                    Suspensão
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <Input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       name="licenca"
                                                       id="licenca"
                                                       checked={anotacao?.licenca}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="licenca"
                                                >
                                                    Licença
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <Input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       name="advVerbal"
                                                       id="advVerbal"
                                                       checked={anotacao?.advVerbal}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="advVerbal"
                                                >
                                                    Advertência verbal
                                                </Label>

                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <Input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       name="advEscrita"
                                                       id="advEscrita"
                                                       checked={anotacao?.advEscrita}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="advEscrita"
                                                >
                                                    Advertência escrita
                                                </Label>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <Input type="checkbox" className="checked:w-4 checked:h-4 w-4 h-4"
                                                       name="atraso"
                                                       id="atraso"
                                                       checked={anotacao?.atraso}/>
                                                <Label
                                                    className="text-xs"
                                                    htmlFor="atraso"
                                                >
                                                    Atraso
                                                </Label>
                                            </li>
                                            {anotacao?.advEscrita && (
                                                <li className="flex gap-2 items-center">
                                                    <Label
                                                        htmlFor="dataFinal"
                                                    >
                                                        Data da adv. escrita:
                                                    </Label>
                                                    <span className="text-xs">
                                                    {formatarDataComum(anotacao?.advEscritaData)}
                                                </span>
                                                </li>
                                            )}
                                            {anotacao?.atraso && (
                                                <li className="flex gap-2 items-center">
                                                    <Label
                                                        htmlFor="dataFinal"
                                                    >
                                                        Tempo de atraso:
                                                    </Label>
                                                    <span className="text-xs">
                                                    {anotacao?.atrasoTempo} min
                                                </span>
                                                </li>
                                            )}
                                        </ul>

                                    </div>
                                    <div className="text-sm w-[50%] h-full flex flex-col gap-2">
                                        <Label>Informações:</Label>
                                        <ul className="flex gap-2 flex-col py-2">
                                            {(anotacao?.horaExtra || anotacao?.horaExtra! > 0) && (
                                                <li className="flex gap-2 items-center">
                                                    <Label
                                                        htmlFor="horaExtra"
                                                    >
                                                        Hora extra:
                                                    </Label>
                                                    <span className="text-xs">
                                                    {anotacao?.horaExtra} min
                                                </span>
                                                </li>
                                            )}
                                            {(anotacao?.bancoPositivo || anotacao?.bancoPositivo! > 0) && (
                                                <li className="flex gap-2 items-center">
                                                    <Label
                                                        htmlFor="bancoPositivo"
                                                    >
                                                        Banco positivo:
                                                    </Label>
                                                    <span className="text-xs">
                                                    {anotacao?.bancoPositivo} min
                                                </span>
                                                </li>
                                            )}
                                            {(anotacao?.bancoNegativo || anotacao?.bancoNegativo! > 0) && (
                                                <li className="flex gap-2 items-center">
                                                    <Label
                                                        htmlFor="bancoNegativo"
                                                    >
                                                        Banco negativo:
                                                    </Label>
                                                    <span className="text-xs">
                                                    {anotacao?.bancoNegativo} min
                                                </span>
                                                </li>
                                            )}

                                            <li className="flex gap-2 items-center">
                                                <Label
                                                    htmlFor="dataInicio"
                                                >
                                                    Data de inicio:
                                                </Label>
                                                <span className="text-xs">
                                                    {formatarDataComum(anotacao?.dataInicio)}
                                                </span>
                                            </li>
                                            <li className="flex gap-2 items-center">
                                                <Label
                                                    htmlFor="dataFinal"
                                                >
                                                    Data de final:
                                                </Label>
                                                <span className="text-xs">
                                                    {formatarDataComum(anotacao?.dataFinal)}
                                                </span>
                                            </li>
                                        </ul>
                                        {(anotacao?.anexo && anotacao?.anexo!.length > 0) && (
                                            <ListAnexosBaixar list={JSON.parse(anotacao.anexo!)}/>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute bottom-2">
                                    <Button onClick={() => setModo(true)}>
                                        Editar Anotação
                                    </Button>
                                    {!anotacao?.status ? (
                                        <Button variant="link" onClick={() => reativarNota()}>
                                            Reativar anotação
                                        </Button>
                                    ) : (
                                        <Button variant="link" onClick={() => inativarNota()}>
                                            Inativar anotação
                                        </Button>

                                    )}
                                </div>
                            </div>
                        )}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}