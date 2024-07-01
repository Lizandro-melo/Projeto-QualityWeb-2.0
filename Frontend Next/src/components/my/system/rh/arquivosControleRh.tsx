import ListColaboradoresAtivos from "@/components/my/essential/ListColaboradoresAtivos";
import React, {ChangeEvent, useCallback, useContext, useEffect, useState} from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {FileText, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {
    colaboradorSelectGlobal,
    colaboradorSelectGlobalProps,
    stateLoundingGlobal,
    stateModalImportDocRhGlobal
} from "@/lib/globalStates";
import {DocRhModels} from "@/lib/models";
import {useForm} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import axios from "axios";
import {AuthContext} from "@/contexts/AuthContext";
import {useQueryClient} from "react-query";
import Router from "next/router";


export default function ArquivosControleRh() {
    return (
        <>
            <ListColaboradoresAtivos/>
            <ArquivosReferents/>
        </>
    )
}

type filterProps = {
    apelido: string,
    tipo: string,

}

function ArquivosReferents() {
    const queryClient = useQueryClient();
    const state = stateModalImportDocRhGlobal((state) => state)
    const colaboradorSelect = colaboradorSelectGlobal<colaboradorSelectGlobalProps>((state: any) => state)
    const [docs, setDocs] = useState<DocRhModels[]>()
    const {host} = useContext(AuthContext);
    const [filter, setFilter] = useState<filterProps>({
        apelido: "",
        tipo: ""
    })

    useEffect(() => {
        if (!colaboradorSelect.colaborador?.fkAuth || !host) {
            return
        }
        getDocs()
    }, [colaboradorSelect.colaborador?.fkAuth, host])

    useEffect(() => {
        applyFilter()
    }, [filter]);

    const getDocs = () => {
        axios.get(`${host}/rh/find/doc?id=${colaboradorSelect.colaborador?.fkAuth}`).then((response) => {
            const newList = response.data.map((doc: DocRhModels) => {
                switch (doc.tipo) {
                    case "IDENTIDADE":
                        doc.tipo = "Identidade"
                        break
                    case "TITULOELEITOR":
                        doc.tipo = "Título de eleitor"
                        break
                    case "COMPROVANTERESIDENCIA":
                        doc.tipo = "Comprovante de residencia"
                        break
                    case "EXAMECOMPLEMENTAR":
                        doc.tipo = "Exame Complementar"
                        break
                    case "DECLARACAO":
                        doc.tipo = "Declaração"
                        break
                    case "CONTRATO":
                        doc.tipo = "Contrato"
                        break
                }
                return doc;
            })
            setDocs(newList)
        })
    }

    const alterFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFilter((prevState: any) => ({
            ...prevState,
            [name]: value
        }))
    }, [])

    const applyFilter = useCallback(() => {
        if (!colaboradorSelect.colaborador?.fkAuth || !host) {
            return
        }
        const filteredData = docs?.filter((doc) => {
            return (
                (filter?.apelido ? doc.apelido?.toLowerCase().includes(filter.apelido.toLowerCase()) : true) &&
                (filter?.tipo ? doc.tipo?.toLowerCase().includes(filter.tipo.toLowerCase()) : true)
            );
        });
        if (filteredData?.length === 0) {
            getDocs()
            return
        }
        if (filter?.apelido === "" && filter?.tipo === "") {
            getDocs()
            return
        }

        setDocs(filteredData)

    }, [filter, docs, queryClient]);


    return (
        <>
            {colaboradorSelect.colaborador && (
                <>
                    <ModalImportDocument/>
                    <div className="h-full w-[80%] rounded-r-md">
                        <div className="flex justify-start w-full p-5 flex-col h-full">
                            <div className="w-full flex justify-start mb-5 items-center gap-5">
                                <div className="flex justify-between items-center bg-stone-300 rounded-full">
                                    <Avatar>
                                        <AvatarImage
                                            src={colaboradorSelect.colaborador?.dirFoto ? colaboradorSelect.colaborador?.dirFoto : 'https://placehold.co/600?text=Foto'}/>
                                    </Avatar>
                                    <span
                                        className="text-center text-sm mx-5">{colaboradorSelect.colaborador?.nomeCompleto}</span>
                                </div>
                                <p className="text-stone-500 text-xs">Coloque o mouse por cima do documento para
                                    pré-visualizalo</p>
                            </div>
                            <ScrollArea
                                className="h-[60%] w-full rounded-md border relative overflow-y-scroll scrowInvivel">
                                <div className="p-3 absolute w-full">
                                    <h4 className="mb-4 text-sm font-medium leading-none">Documentos</h4>
                                    <Table>
                                        <TableHeader className="text-xs">
                                            <TableHead>
                                                <Input
                                                    className="border-none bg-transparent focus-visible:!ring-0 text-xs"
                                                    placeholder="Apelido" type="text" name="apelido"
                                                    onChange={alterFilter}
                                                />
                                            </TableHead>
                                            <TableHead>
                                        <span className="flex gap-2 relative items-center justify-between">
                            <Input className="border-none bg-transparent focus-visible:!ring-0 text-xs"
                                   placeholder="Tipo de documento"
                                   type="text" name="tipo"
                                   list="tipos" onChange={alterFilter}/>
                                            <datalist id="tipos">
                                            <option value="Identidade">Identidade</option>
                                            <option value="CPF">CPF</option>
                                            <option value="CNH">CNH</option>
                                            <option value="Título de eleitor">Título de eleitor</option>
                                            <option value="Comprovante de residencia">Comprovante de residencia</option>
                                            <option value="Exame complementar">Exame complementar</option>
                                            <option value="Declaração">Declaração</option>
                                            <option value="Contrato">Contrato</option>
                                </datalist>
                            </span>
                                            </TableHead>
                                            <TableHead>
                                                Data de emissão
                                            </TableHead>
                                            <TableHead>
                                                Data de vencimento
                                            </TableHead>

                                        </TableHeader>
                                        <TableBody>
                                            {docs?.map((doc: DocRhModels) => {
                                                const fileName = `${doc.dir?.split("/")[4]}/${doc.dir?.split("/")[5]}`
                                                return (
                                                    <>
                                                        <TableRow key={doc.id}
                                                                  className="hover:bg-stone-400 cursor-pointer"
                                                                  title="Baixar" onClick={() => {
                                                            Router.push(`${host}/rh/find/download/arquivo?name=${fileName}`, "", {
                                                                scroll: true
                                                            })
                                                        }}>
                                                            <TableCell>{doc.apelido}</TableCell>
                                                            <TableCell>{doc.tipo}</TableCell>
                                                            <TableCell>{doc.dataEmissao}</TableCell>
                                                            <TableCell>{doc.dataVencimento}</TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </ScrollArea>
                            <Button variant="default"
                                    onClick={() => state.alterState()}
                                    className="w-full bg-stone-300 h-[5%] text-black hover:bg-stone-300">
                                Importar um documento
                            </Button>
                            <ScrollArea
                                className="h-[35%] w-full rounded-md border relative overflow-y-scroll scrowInvivel">
                                <div className="p-3 absolute w-full">
                                    <h4 className="mb-4 text-sm font-medium leading-none">Alertas</h4>
                                    <Table>
                                        <TableHeader>
                                            <TableHead>
                                                Tipo de documento
                                            </TableHead>
                                            <TableHead>
                                                Tempo até o vencimento
                                            </TableHead>
                                        </TableHeader>
                                    </Table>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

function ModalImportDocument() {

    const state = stateModalImportDocRhGlobal((state) => state)
    const colaboradorSelect = colaboradorSelectGlobal<colaboradorSelectGlobalProps>((state: any) => state)

    const [doc, setDoc] = useState<DocRhModels>()
    const {register, handleSubmit, reset} = useForm()
    const [requeredVencimento, setRequeredVencimento] = useState(false)
    const {host} = useContext(AuthContext);
    const displayLounding = stateLoundingGlobal((state: any) => state);


    const updateFile = async (e: ChangeEvent<HTMLInputElement>) => {
        displayLounding.setDisplayLounding()
        await new Promise((resolve) => setTimeout(resolve, 500));
        const formData = new FormData();
        if (e.target.files) {
            formData.append("file", e.target.files[0]);
        }
        formData.append("dir", `C:/Users/paralamas/Desktop/qualityweb2/public/assets/rh/doc/${colaboradorSelect.colaborador?.nomeCompleto}`);
        try {
            const response = await axios.post(`${host}/rh/update/doc`, formData);
            setDoc((prevState: any) => ({
                ...prevState,
                dir: `/assets/rh/doc/${colaboradorSelect.colaborador?.nomeCompleto}/${response.data}`
            }))
            displayLounding.setDisplaySuccess("Importado")
            displayLounding.setDisplayReset()
        } catch (error) {
            displayLounding.setDisplayFailure("Falha ao enviar o arquivo")
            displayLounding.setDisplayReset()
            throw new Error("Falha ao enviar o arquivo");
        }
    };

    const enviarDoc = async (data: any) => {
        displayLounding.setDisplayLounding()
        await new Promise((resolve) => setTimeout(resolve, 500));
        const document: DocRhModels = {
            ...data,
            dir: doc?.dir,
            referentColaborador: colaboradorSelect.colaborador?.fkAuth!
        }
        await axios.post(`${host}/rh/create/doc`, document).then(async (response) => {
            displayLounding.setDisplaySuccess(response.data)
            await new Promise((resolve) => setTimeout(resolve, 1500));
            state.alterState()
            displayLounding.setDisplayReset()
            reset()
            setDoc((prevState: any) => ({
                ...prevState,
                dir: null,
                tipo: ""
            }))
        }).catch(async (erro) => {
            displayLounding.setDisplayFailure(erro.response.data)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            displayLounding.setDisplayReset()
        })
    }

    return (
        <>
            <Dialog open={state.stateModal} onOpenChange={state.alterState}>
                <DialogContent className="!max-w-[60rem] min-h-[60%]">
                    <DialogHeader>
                        <DialogTitle>Importar um documento</DialogTitle>
                        <DialogDescription>Aqui você irá conseguir importar um documento e armazenar em nosso
                            servidor!</DialogDescription>
                        <div className="border rounded-xl p-5 w-full h-full flex justify-around">
                            <div className="w-[35%] h-full">
                                {!doc?.dir && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="border border-stone-300 h-full w-full flex items-center justify-center flex-none rounded-md">
                                        <Plus className="w-10 absolute z-[10]"/>
                                        <Input type="file"
                                               onChange={(e) => updateFile(e)}
                                               className="text-white z-[20] cursor-pointer bg-transparent file:hidden w-full h-full border border-none"/>

                                    </Button>
                                )}
                                {doc?.dir && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="border border-stone-300 h-full w-full flex items-center justify-center flex-none rounded-md relative">
                                        <Input type="file"
                                               onChange={(e) => updateFile(e)}
                                               className="text-white z-[40] cursor-pointer bg-transparent file:hidden w-full h-full border border-none"/>
                                        {(doc?.dir.split(".")[doc?.dir.split(".").length - 1].toUpperCase() == "PNG" ||
                                            doc?.dir.split(".")[doc?.dir.split(".").length - 1].toUpperCase() == "JPEG" ||
                                            doc?.dir.split(".")[doc?.dir.split(".").length - 1].toUpperCase() == "JPG") ? (
                                            <img src={doc?.dir} alt="Foto inportada"
                                                 className={"w-full z-[10] absolute"}/>
                                        ) : (
                                            <FileText className="w-[50%] h-[50%] absolute"/>
                                        )}
                                    </Button>
                                )}
                            </div>
                            <form method="POST"
                                  onSubmit={handleSubmit(enviarDoc)}
                                  className=" w-[60%] h-full flex flex-col justify-start items-center gap-5">
                                <div className={cn("flex flex-col gap-4 w-full",)}>
                                    <div className={cn("flex flex-col gap-4 w-full",)}>
                                        <Label>Apelido</Label>
                                        <Input {...register("apelido")} id={"apelido"}
                                               name={"apelido"}
                                               type={"text"}
                                               placeholder={"Coloque um apelido neste documento:"}
                                               required
                                        />
                                    </div>
                                    <Label>Tipo de documento</Label>
                                    <select
                                        value={doc?.tipo}
                                        className="flex h-10 w-full rounded-md border !border-stone-600 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" {...register("tipo")}
                                        id={"tipos"} name={"tipo"}
                                        required={true}>
                                        <option value="" selected disabled>Selecione</option>
                                        <option value="IDENTIDADE">Identidade</option>
                                        <option value="CPF">CPF</option>
                                        <option value="CNH">CNH</option>
                                        <option value="ASO">ASO</option>
                                        <option value="TITULOELEITOR">Título de eleitor</option>
                                        <option value="COMPROVANTERESIDENCIA">Comprovante de residencia</option>
                                        <option value="EXAMECOMPLEMENTAR">Exame complementar</option>
                                        <option value="DECLARACAO">Declaração</option>
                                        <option value="CONTRATO">Contrato</option>
                                    </select>
                                </div>
                                <div className={cn("flex flex-col gap-3 w-full",)}>
                                    <Label>Tem vencimento?</Label>
                                    <div className="flex gap-2 items-center">
                                        <Input checked={requeredVencimento} onChange={() => setRequeredVencimento(true)}
                                               name="vencimento" id={"sim"} type={"radio"}
                                               className="w-5 h-5"/>
                                        <Label className="" htmlFor={"sim"}>Sim</Label>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Input checked={!requeredVencimento}
                                               onChange={() => setRequeredVencimento(false)} name="vencimento" id="nao"
                                               type={"radio"}
                                               className="w-5 h-5"/>
                                        <Label className="" htmlFor={"nao"}>Não</Label>
                                    </div>
                                </div>

                                <div className={cn("flex flex-col gap-4 w-full",)}>
                                    <Label>Data de emissão</Label>
                                    <Input {...register("dataEmissao")} id={"dataEmissao"}
                                           name={"dataEmissao"}
                                           type={"date"}
                                    />
                                </div>
                                {requeredVencimento && (
                                    <div className={cn("flex flex-col gap-4 w-full",)}>
                                        <Label>Data de vencimento</Label>

                                        <Input {...register("dataVencimento")} id={"dataVencimento"}
                                               name={"dataVencimento"}
                                               type={"date"}
                                        />
                                    </div>
                                )}
                                <Button className={"w-full"}>
                                    Enviar
                                </Button>
                            </form>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}