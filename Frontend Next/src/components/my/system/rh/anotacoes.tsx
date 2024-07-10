import ListColaboradoresAtivos from "@/components/my/essential/ListColaboradoresAtivos";
import {colaboradorSelectGlobal, colaboradorSelectGlobalProps} from "@/lib/globalStates";
import {alterNomeCompletoParaNomeSobrenome, formatDateTimeUser} from "@/lib/utils";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import ContainerSystem from "@/components/my/essential/container-system";
import {ChangeEvent, useState} from "react";
import {useQuery} from "react-query";

type filtroProps = {
    anotacao: string
    idColaborador: number
    tipo: string
    status: string
    dataInicio: string
    dataFim: string
}
export default function Anotacoes() {

    const {colaborador} = colaboradorSelectGlobal<colaboradorSelectGlobalProps>((state: any) => state);
    const [filtro, setFiltro] = useState<filtroProps>()

    const {data: anotacoes} = useQuery({
        queryKey: ["Anotacoes", filtro]
    })

    const alterFiltro = (e: ChangeEvent<any>) => {
        const {name, value} = e.target
        setFiltro((prevState: any) => ({...prevState, [name]: value}))
    }

    return (
        <>
            <ListColaboradoresAtivos tipoSelect/>
            <ContainerSystem>
                {colaborador && (
                    <>
                        <div className="flex w-full">

                            <div>
                                {colaborador.dirFoto ? (
                                    <>

                                    </>
                                ) : (
                                    <>
                                        <img src="https://placehold.co/100x100" alt="Foto do Colaborador"/>
                                    </>
                                )}
                            </div>
                            <div className="bg-slate-500 w-full h-full flex flex-col text-xs px-3">
                                <span>Nome: {colaborador.nomeCompleto}</span>
                                <span>idade: {new Date().getFullYear() - parseInt(colaborador.dataNascimento.split("-")[0])} anos ({formatDateTimeUser(colaborador.dataNascimento)?.split(" ")[0]})</span>
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
                            <Input onChange={alterFiltro} className="border-none bg-transparent focus-visible:!ring-0 "
                                   placeholder="Tipo da Anotação"
                                   type="text" name="tipo"
                                   list="tiposAnotacao"
                            />
                                <datalist id={"tiposAnotacao"}>
                                    <option value="TODOS">TODOS</option>
                                    <option value="CLT">CLT</option>
                                    <option value="ESTAGIARIO">ESTAGIARIO</option>
                                    <option value="TERCEIRIZADO">TERCEIRIZADO</option>
                                </datalist>

                        </span>
                                            </TableHead>
                                            <TableHead className="hover:bg-slate-100">
                        <span className="flex gap-2 relative items-center justify-between">
                            <Input onChange={alterFiltro} className="border-none bg-transparent focus-visible:!ring-0 "
                                   placeholder="Estado"
                                   type="text" name="status"
                            />

                        </span>
                                            </TableHead>

                                            <TableHead className="hover:bg-slate-100">
                                                <span className="flex gap-2 relative items-center justify-between">
                            <Input onChange={alterFiltro} className="border-none bg-transparent focus-visible:!ring-0 "
                                   type="date" name="dataInicio" title={"Data de inicio"}
                            />

                        </span>
                                            </TableHead>
                                            <TableHead className="hover:bg-slate-100">
                                                  <span className="flex gap-2 relative items-center justify-between">
                            <Input onChange={alterFiltro} className="border-none bg-transparent focus-visible:!ring-0 "
                                   type="date" name="dataFim" title={"Data de final"}
                            />

                        </span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>


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