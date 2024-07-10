import React, {useContext, useEffect, useRef, useState} from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {alterNomeCompletoParaNomeSobrenome, cn, formatDateTimeUser} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";
import ListAnexos from "@/components/my/essential/list-anexos";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import Stomp from "stompjs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {AuthContext} from "@/contexts/AuthContext";
import {
    CategoriaClassificacaoTiModels, GrupoClassificacaoTiModels,
    RequestMensagemTiDTO, ResponseSocketSolicitacaoTiDTO, SubcategoriaTiModels,
} from "@/lib/models";
import ListSolicitacoes from "@/components/my/system/suporte/list-solicitacoes";
import {
    solicitacaoSelectGlobal,
    solicitacaoSelectGlobalProps,
    stateLoundingGlobal, stateLoundingGlobalProps,
    stateModalClassificarTicketGlobal,
    stateModalDeletarTicketGlobal, stateModalProps, stateModalReClassificarTicketGlobal
} from "@/lib/globalStates";
import axios from "axios";
import {useQuery} from "react-query";
import {ArrowDown, Check, CheckCheck, Repeat, Trash} from "lucide-react";
import ListAnexosBaixar from "@/components/my/essential/list-anexos-baixar";
import {LabelInputPadrao} from "@/components/my/essential/label-input-padrao";

export const Tickets = {
    Root: TicketsRoot
}

type TicketsRoot = {
    clientSocket: Stomp.Client | null
}

function TicketsRoot() {

    return (
        <>
            <ModalReClassificarTicket/>
            <ModalDeletarTicket/>
            <ModalClassificarTicket/>
            <TicketsChamados/>
            <TicketsSolicitacao/>
        </>
    )
}

type TicketsChamadosProps = {
    clientSocket: Stomp.Client | null
}

function TicketsChamados() {

    return (
        <div className="h-full w-[20%] rounded-l-md shadow-lg">
            <div className="p-5 w-full h-[10%] bg-stone-200 rounded-tl-md shadow-md">
                <h1 className="text-xs">
                    Solicitações
                </h1>
            </div>
            <hr/>
            <div className="px-2 py-3 w-full h-[90%] rounded-bl-md">
                <div className="w-full h-full relative rounded-md overflow-y-scroll scrowInvivel">
                    <div className="absolute  flex flex-col gap-3 w-full">
                        <ListSolicitacoes/>
                    </div>
                </div>
            </div>
        </div>
    )
}

type TicketsSolicitacaoProps = {}

function TicketsSolicitacao() {
    const stateModalClassificar = stateModalClassificarTicketGlobal<stateModalProps>((state) => state)
    const stateModalReClassificar = stateModalReClassificarTicketGlobal<stateModalProps>((state) => state)
    const stateModalDeletarTicket = stateModalDeletarTicketGlobal<stateModalProps>((state) => state)
    const [showButton, setShowButton] = useState(false);
    const selectSolicitacao = solicitacaoSelectGlobal<solicitacaoSelectGlobalProps>((state: any) => state)
    const {host, user, acessos, configToken} = useContext(AuthContext)
    const refDivMensagens = useRef<any>()
    const {data} = useQuery({
        queryKey: ["mensagens"],
        queryFn: async () => {
            if (!selectSolicitacao.solicitacaoSelect) {
                return undefined
            }
            await axios.get(`${host}/suporte/find/solicitacao/exatc?id=${selectSolicitacao.solicitacaoSelect.id}`, configToken).then((response) => {
                const solicitacaoSelect: ResponseSocketSolicitacaoTiDTO = response.data
                selectSolicitacao.setSelect(solicitacaoSelect)
            }).catch(() => {
                selectSolicitacao.setSelect(null)
            })
        },
        refetchInterval: 1000,
        refetchIntervalInBackground: false
    })

    const handleScroll = () => {
        if (refDivMensagens.current) {
            const {scrollTop, scrollHeight, clientHeight} = refDivMensagens.current;
            const isScrolledUp = ((scrollTop * scrollHeight) / 100) < ((scrollHeight * 110) / 100);
            setShowButton(isScrolledUp);
        }
    };

    useEffect(() => {
        if (refDivMensagens.current) {
            refDivMensagens.current?.addEventListener('scroll', handleScroll);
            return () => {
                refDivMensagens.current?.removeEventListener('scroll', handleScroll);
            };
        }
    }, [refDivMensagens.current])

    useEffect(() => {
        if (!refDivMensagens.current) return
        refDivMensagens.current.scrollTop = 100000
    }, [selectSolicitacao.mensagens?.length]);


    // @ts-ignore
    return (
        <div className="h-full w-[80%] rounded-r-md">
            {selectSolicitacao.solicitacaoSelect && (
                <div ref={refDivMensagens} className="w-full h-full relative rounded-md overflow-y-scroll scrowInvivel">
                    <div className="absolute  flex flex-col gap-3 w-full">
                        <div className="p-5 min-h-[150px] sticky top-0 z-50 bg-stone-100">
                            <h1 className="text-lg">
                                {selectSolicitacao.solicitacaoSelect?.titulo.toUpperCase()} #{selectSolicitacao.solicitacaoSelect.id}
                            </h1>
                            <span className="flex gap-2 absolute top-3 right-4">
                        </span>
                            <span className="text-xs">Ocorrencia:</span>
                            <br/>
                            <span
                                className="smallSpanDescription right-2 top-1">{selectSolicitacao.solicitacaoSelect.ocorrencia}</span>
                            <div className="absolute top-[50%] right-[30px] flex items-center gap-5">
                                {((selectSolicitacao.solicitacaoSelect.solicitante.nomeCompleto == user?.nomeCompleto && selectSolicitacao.solicitacaoSelect.status !== "FINALIZADO") || acessos?.rolesTI?.deletarTicket) && (
                                    <Button
                                        title="Deletar solicitação?"
                                        variant="destructive"
                                        onClick={() => stateModalDeletarTicket.alterState()}
                                        className={cn(" w-[50px] h-[50px] rounded-full transition-all scale-100", stateModalDeletarTicket.stateModal && "scale-0")}
                                    >
                                        <Trash/>
                                    </Button>
                                )}
                                {(acessos?.rolesTI?.reclassificar && selectSolicitacao.solicitacaoSelect.status === "FINALIZADO") && (
                                    <Button
                                        title="Reclassificar ticket"
                                        className={cn(" w-[50px] h-[50px] rounded-full transition-all scale-100")}
                                        onClick={() => stateModalReClassificar.alterState()}
                                    >
                                        <Repeat/>
                                    </Button>
                                )}
                                {(acessos?.rolesTI?.delegado && selectSolicitacao.solicitacaoSelect.status !== "FINALIZADO") && (

                                    <Button
                                        title="Finalizar ticket"
                                        className={cn(" w-[50px] h-[50px] rounded-full transition-all scale-100", stateModalClassificar.stateModal && "scale-0")}
                                        onClick={() => stateModalClassificar.alterState()}
                                    >
                                        <CheckCheck/>
                                    </Button>
                                )}
                                <Button
                                    onClick={() => refDivMensagens.current.scrollTop = 1000}
                                    className={cn(" w-[50px] h-[50px] rounded-full  transition-all opacity-0", showButton && "opacity-100 hover:opacity-30")}
                                >
                                    <ArrowDown/>
                                </Button>
                            </div>
                        </div>
                        {selectSolicitacao.solicitacaoSelect.anexo && (
                            <div className="px-5">
                            <span
                                className="smallSpanDescription right-2 top-1">Anexos:</span>
                                <ListAnexosBaixar list={JSON.parse(selectSolicitacao.solicitacaoSelect.anexo)}/>
                            </div>
                        )}
                        <hr/>
                        <div className="flex flex-col gap-3 px-3 h-full">
                            {
                                selectSolicitacao.mensagens?.map((mensagem, i) => {
                                    return (
                                        <>
                                            {alterNomeCompletoParaNomeSobrenome(mensagem.responsavel.nomeCompleto) === alterNomeCompletoParaNomeSobrenome(user?.nomeCompleto) ? (
                                                <section key={i}

                                                         className="bg-stone-200 px-10 py-2 min-h-[150px] relative flex flex-col items-end justify-between transition-all rounded-md w-full gap-2">
                                                    <div className="flex gap-2 items-center">
                                                        <span
                                                            className="text-xs">{alterNomeCompletoParaNomeSobrenome(mensagem.responsavel.nomeCompleto)}</span>
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={mensagem.responsavel?.dirFoto ? mensagem.responsavel?.dirFoto : 'https://placehold.co/600?text=Foto'}
                                                                alt="fotoColaborador"/>
                                                        </Avatar>
                                                        {/* eslint-disable-next-line react/no-unescaped-entities */}

                                                    </div>
                                                    <span
                                                        className="smallSpanDescription  right-2 top-1 min-h-[40px]">{mensagem.mensagem}</span>
                                                    <span
                                                        className="smallSpan absolute left-2 top-1">{formatDateTimeUser(mensagem.dataHora)}</span>
                                                    {mensagem.anexos && (
                                                        <div className=" w-full">
                            <span
                                className="smallSpanDescription right-2 top-1">Anexos:</span>
                                                            <ListAnexosBaixar
                                                                list={JSON.parse(mensagem.anexos)}/>
                                                        </div>
                                                    )}
                                                </section>
                                            ) : (
                                                <section key={i}

                                                         className="bg-stone-200 p-2 min-h-[150px] relative flex flex-col items-start justify-between transition-all rounded-md w-full gap-2">
                                                    <div className="flex gap-2 items-center">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={mensagem.responsavel?.dirFoto ? mensagem.responsavel?.dirFoto : 'https://placehold.co/600?text=Foto'}
                                                                alt="fotoColaborador"/>
                                                        </Avatar>
                                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                                        <span
                                                            className="text-xs">{alterNomeCompletoParaNomeSobrenome(mensagem.responsavel.nomeCompleto)}</span>
                                                    </div>
                                                    <span
                                                        className="smallSpanDescription right-2 top-1 min-h-[40px]">{mensagem.mensagem}</span>
                                                    <span
                                                        className="smallSpan absolute right-2 top-1">{formatDateTimeUser(mensagem.dataHora)}</span>
                                                    {mensagem.anexos && (
                                                        <div className=" w-full">
                            <span
                                className="smallSpanDescription right-2 top-1">Anexos:</span>
                                                            <ListAnexosBaixar
                                                                list={JSON.parse(mensagem.anexos)}/>
                                                        </div>
                                                    )}
                                                </section>
                                            )}
                                        </>

                                    )
                                })

                            }
                            <div
                                className="p-2 min-h-[80px] relative flex flex-col items-start justify-between transition-all rounded-md w-full gap-2">

                            </div>

                        </div>
                        <TicketsSendMensagem/>
                    </div>
                </div>
            )}
        </div>
    )
}

function TicketsSendMensagem() {

    const [state, setState] = useState(false)
    const {user, host, configToken} = useContext(AuthContext)
    const selectSolicitacao = solicitacaoSelectGlobal<solicitacaoSelectGlobalProps>((state: any) => state)
    const {register, handleSubmit, reset} = useForm()
    const [anexos, setAnexos] = useState([])
    const displayLounding = stateLoundingGlobal((state: any) => state)
    const [anexoListItens, setAnexoListItens] = useState<File[]>([]);

    const updateFiles = async (): Promise<string[]> => {
        const updatedAnexos: string[] = [];
        for (let i = 0; i < anexoListItens.length; i++) {
            const formData = new FormData();
            formData.append("file", anexoListItens[i]);
            formData.append("dir", "C:/Users/paralamas/Desktop/Projeto QualityWeb 2.0/Frontend Next/public/assets/arquivosTicket");

            try {
                const response = await axios.post(`${host}/suporte/create/update/files`, formData, configToken);
                updatedAnexos.push(`arquivosTicket/${response.data}`);
                setAnexoListItens([])
            } catch (error) {
                throw new Error("Falha ao enviar o arquivo");
            }
        }
        return updatedAnexos;
    };


    const sendMensagem = async (data: any) => {
        if (!data.mensagem || !user?.fkAuth) {
            return
        }
        let updatedAnexos: string[] = [];
        if (anexoListItens.length !== 0) {
            try {
                updatedAnexos = await updateFiles();
            } catch {
                displayLounding.setDisplayFailure("Falha na tentativa de enviar os documentos. Tente novamente!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                displayLounding.setDisplayReset();
                return;
            }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mensagem: RequestMensagemTiDTO = {
            mensagem: data.mensagem,
            referentSolicitacao: selectSolicitacao.solicitacaoSelect?.id,
            responsavel: user?.fkAuth,
            anexos: updatedAnexos.length === 0 ? null : JSON.stringify(updatedAnexos),
        }
        await axios.post(`${host}/suporte/create/mensagem`, mensagem, configToken).then(async (response) => {
            setState(false)
            reset()
        }).catch(async (err) => {
            displayLounding.setDisplayFailure("Falha ao enviar esta mensagem. Tente novamente!")
            await new Promise(resolve => setTimeout(resolve, 1000))
            displayLounding.setDisplayReset()
        })


    }

    return (
        <form
            onSubmit={handleSubmit(sendMensagem)}
            onClick={() => {
                if (!state) {
                    setState(true)
                }
            }}
            className={cn("w-full h-[50px] bg-white sticky bottom-0 flex flex-col  transition-all rounded-b-md shadow border border-stone-300 ", state && "!h-[400px] p-5 items-start gap-2", !state && "hover:animate-pulse cursor-pointer justify-center items-center ")}>
            {!state && (
                <span className="smallSpanDescription font-bold">
                (Click aqui para responder...)
            </span>
            )}
            {state && (
                <>
                    <span>Mensagem</span>
                    <Textarea
                        required
                        {...register("mensagem")}
                        id="mensagem" name="mensagem"
                        placeholder="Digite aqui sua mensagem"
                        className="outline-none resize-none h-[50%]"/>
                    <span>Anexos</span>
                    <ListAnexos list={anexoListItens} alterList={setAnexoListItens}/>
                    <div className="flex gap-2">
                        <Button onClick={() => setState(false)} variant="destructive">
                            Cancelar envio
                        </Button>
                        <Button type="submit">
                            Enviar
                        </Button>
                    </div>
                </>
            )}
        </form>
    )
}

export function ModalDeletarTicket() {

    const state = stateModalDeletarTicketGlobal<stateModalProps>((state) => state)
    const displayLounding = stateLoundingGlobal<stateLoundingGlobalProps>((state: any) => state)
    const selectSolicitacao = solicitacaoSelectGlobal<solicitacaoSelectGlobalProps>((state: any) => state)
    const {host, configToken} = useContext(AuthContext)


    const deletarSolicitacao = async () => {
        displayLounding.setDisplayLounding()
        await new Promise(resolve => setTimeout(resolve, 500))
        await axios.delete(`${host}/suporte/update/solicitacao?id=${selectSolicitacao.solicitacaoSelect?.id}`, configToken).then(async () => {
            displayLounding.setDisplaySuccess("Solicitação excluída com sucesso!")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
            state.alterState();
            selectSolicitacao.setSelect(null)
        }).catch(async () => {
            displayLounding.setDisplayFailure("Não foi possivel deletar está solicitação no momento!")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
        })
    }

    return (
        <>
            <Dialog open={state.stateModal} onOpenChange={state.alterState}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Quer realmente deletar está solicitação?
                        </DialogTitle>
                        <DialogDescription>
                            Ao deletar a solicitação, todos os dados da mesma será excluido do nosso servidor!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-4 mt-3">

                        <Button onClick={deletarSolicitacao} type="button" variant="destructive">
                            Sim
                        </Button>
                        <Button onClick={state.alterState} type="button">
                            Não
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export function ModalClassificarTicket() {

    const classNameSelect = "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"


    const displayLounding = stateLoundingGlobal<stateLoundingGlobalProps>((state: any) => state)
    const selectSolicitacao = solicitacaoSelectGlobal<solicitacaoSelectGlobalProps>((state: any) => state)

    const {register, handleSubmit, reset} = useForm()

    const state = stateModalClassificarTicketGlobal<stateModalProps>((state) => state)
    const {host, user, configToken} = useContext(AuthContext)

    const [categorias, setCategorias] = useState<CategoriaClassificacaoTiModels[]>([])
    const [subCategorias, setSubCategorias] = useState<SubcategoriaTiModels[]>([])

    const {data: grupos} = useQuery({
        queryKey: ["grupos"],
        queryFn: async (): Promise<GrupoClassificacaoTiModels[]> => {
            return await axios.get(`${host}/suporte/find/classificar/grupos`, configToken).then(response => response.data)
        }
    })

    const classificarTicket = async (data: any) => {
        await new Promise(resolve => setTimeout(resolve, 500))
        displayLounding.setDisplayLounding()
        const classificacaoEnviar = {
            ...data,
            responsavel: user?.fkAuth,
            referentSolicitacao: selectSolicitacao.solicitacaoSelect?.id

        }
        await axios.post(`${host}/suporte/create/classificar`, classificacaoEnviar, configToken).then(async (response) => {
            displayLounding.setDisplaySuccess(response.data)
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
            selectSolicitacao.setSelect(null)
            state.alterState()
            reset()
        }).catch(async () => {
            displayLounding.setDisplayFailure("Não foi possivel classificar esta solicitação no momento!")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
        })

    }

    const pularClassificacao = async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
        displayLounding.setDisplayLounding()
        const classificacaoEnviar = {
            referentSolicitacao: selectSolicitacao.solicitacaoSelect?.id
        }
        await axios.post(`${host}/suporte/create/finalizar`, classificacaoEnviar, configToken).then(async (response) => {
            displayLounding.setDisplaySuccess(response.data)
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
            selectSolicitacao.setSelect(null)
            state.alterState()
            reset()
        }).catch(async () => {
            displayLounding.setDisplayFailure("Não foi possivel finalizar esta solicitação no momento!")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
        })
    }

    return (
        <Dialog open={state.stateModal} modal onOpenChange={state.alterState}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Classificar ticket</DialogTitle>
                    <DialogDescription>Classifique o ticket que você acabou de finalizar, para ajudar em nossa avaliação
                        de ocorrencias</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(classificarTicket)} method="POST" className="flex flex-col gap-5">
                    <div className="flex gap-3">
                        <div>
                            <select
                                {...register("referentGrupo")}
                                onChange={async (e) => {
                                    await axios.get(`${host}/suporte/find/classificar/categorias?id=${e.target.value}`, configToken).then(response => setCategorias(response.data))
                                }}
                                className={classNameSelect} defaultValue="null">
                                <option disabled value="null">Selecione um grupo</option>
                                {grupos?.map((grupo) => {
                                    return (
                                        <option key={grupo.id}
                                                value={grupo.id}>{grupo.nome}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div>
                            <select
                                {...register("referentCategoria")}
                                title="Para aparecer as categorias, selecione um grupo"
                                onChange={async (e) => {
                                    await axios.get(`${host}/suporte/find/classificar/subcategorias?id=${e.target.value}`, configToken).then(response => setSubCategorias(response.data))
                                }}
                                className={classNameSelect} defaultValue="null">
                                <option disabled value="null">Selecione uma categoria</option>
                                {categorias?.map((categoria) => {
                                    return (
                                        <option key={categoria.id}
                                                value={categoria.id}>{categoria.nome}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>

                            <select
                                {...register("referentSubcategoria")}
                                className={classNameSelect} defaultValue="null">
                                <option disabled value="null">Selecione uma sub</option>
                                {subCategorias?.map((subcategoria) => {
                                    return (
                                        <option key={subcategoria.id}
                                                value={subcategoria.id}>{subcategoria.nome}</option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                    <LabelInputPadrao.Root register={register} name={"observacao"} title={"Observação"} textArea
                                           width={100}/>
                    <div className="flex gap-3">
                        <Button type="submit">
                            Classificar
                        </Button>
                        <Button onClick={() => pularClassificacao()} type="button" variant="destructive">
                            Pula
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>


    )
}

export function ModalReClassificarTicket() {

    const classNameSelect = "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"


    const displayLounding = stateLoundingGlobal<stateLoundingGlobalProps>((state: any) => state)
    const selectSolicitacao = solicitacaoSelectGlobal<solicitacaoSelectGlobalProps>((state: any) => state)

    const {register, handleSubmit, reset} = useForm()

    const state = stateModalReClassificarTicketGlobal<stateModalProps>((state) => state)
    const {host, user, configToken} = useContext(AuthContext)

    const [categorias, setCategorias] = useState<CategoriaClassificacaoTiModels[]>([])
    const [subCategorias, setSubCategorias] = useState<SubcategoriaTiModels[]>([])

    const {data: grupos} = useQuery({
        queryKey: ["grupos"],
        queryFn: async (): Promise<GrupoClassificacaoTiModels[]> => {
            return await axios.get(`${host}/suporte/find/classificar/grupos`, configToken).then(response => response.data)
        }
    })

    const reclassificarTicket = async (data: any) => {
        await new Promise(resolve => setTimeout(resolve, 500))
        displayLounding.setDisplayLounding()
        const classificacaoEnviar = {
            ...data,
            responsavel: user?.fkAuth,
            referentSolicitacao: selectSolicitacao.solicitacaoSelect?.id

        }
        await axios.post(`${host}/suporte/create/reclassificar`, classificacaoEnviar, configToken).then(async (response) => {
            displayLounding.setDisplaySuccess(response.data)
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
            selectSolicitacao.setSelect(null)
            state.alterState()
            reset()
        }).catch(async () => {
            displayLounding.setDisplayFailure("Não foi possivel classificar esta solicitação no momento!")
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
        })

    }


    return (
        <Dialog open={state.stateModal} modal onOpenChange={state.alterState}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reclassificar ticket</DialogTitle>
                    <DialogDescription>Reclassifique o ticket que você acabou de finalizar, para ajudar em nossa
                        avaliação
                        de ocorrencias</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(reclassificarTicket)} method="POST" className="flex flex-col gap-5">
                    <div className="flex gap-3">
                        <div>
                            <select
                                {...register("referentGrupo")}
                                onChange={async (e) => {
                                    await axios.get(`${host}/suporte/find/classificar/categorias?id=${e.target.value}`, configToken).then(response => setCategorias(response.data))
                                }}
                                className={classNameSelect} defaultValue="null">
                                <option disabled value="null">Selecione um grupo</option>
                                {grupos?.map((grupo) => {
                                    return (
                                        <option key={grupo.id}
                                                value={grupo.id}>{grupo.nome}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div>
                            <select
                                {...register("referentCategoria")}
                                title="Para aparecer as categorias, selecione um grupo"
                                onChange={async (e) => {
                                    await axios.get(`${host}/suporte/find/classificar/subcategorias?id=${e.target.value}`, configToken).then(response => setSubCategorias(response.data))
                                }}
                                className={classNameSelect} defaultValue="null">
                                <option disabled value="null">Selecione uma categoria</option>
                                {categorias?.map((categoria) => {
                                    return (
                                        <option key={categoria.id}
                                                value={categoria.id}>{categoria.nome}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>

                            <select
                                {...register("referentSubcategoria")}
                                className={classNameSelect} defaultValue="null">
                                <option disabled value="null">Selecione uma sub</option>
                                {subCategorias?.map((subcategoria) => {
                                    return (
                                        <option key={subcategoria.id}
                                                value={subcategoria.id}>{subcategoria.nome}</option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                    <LabelInputPadrao.Root register={register} name={"observacao"} title={"Observação"} textArea
                                           width={100}/>
                    <div className="flex gap-3">
                        <Button type="submit">
                            Reclassificar
                        </Button>
                        <Button onClick={() => state.alterState()} type="button" variant="destructive">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>


    )
}