import ListColaboradoresAtivos from "@/components/my/essential/ListColaboradoresAtivos";
import {colaboradorSelectGlobal, colaboradorSelectGlobalProps} from "@/lib/globalStates";
import {alterNomeCompletoParaNomeSobrenome, formatDateTimeUser} from "@/lib/utils";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";

export default function Anotacoes() {

    const {colaborador} = colaboradorSelectGlobal<colaboradorSelectGlobalProps>((state: any) => state);


    return (
        <>
            <ListColaboradoresAtivos tipoSelect/>
            <div className="h-full w-[80%] rounded-r-md">
                <div className="flex justify-start w-full p-5 flex-col h-full">
                    {colaborador && (
                        <>
                            <div className="flex w-full">

                                <div>
                                    {colaborador.dirFoto ? (
                                        <>

                                        </>
                                    ) : (
                                        <>
                                            <img src="https://placehold.co/130x130" alt="Foto do Colaborador"/>
                                        </>
                                    )}
                                </div>
                                <div className="bg-slate-500 w-full h-full flex flex-col text-sm px-3">
                                    <span>Nome: {colaborador.nomeCompleto}</span>
                                    <span>idade: {new Date().getFullYear() - parseInt(colaborador.dataNascimento.split("-")[0])} anos ({formatDateTimeUser(colaborador.dataNascimento)?.split(" ")[0]})</span>
                                </div>

                            </div>
                            <div className="w-full h-full relative overflow-y-scroll">
                                <div className="absolute">
                                    <Table className="relative">
                                        <TableCaption>...</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="hover:bg-slate-100 sticky top-1">
                            <span className="flex gap-2 relative items-center justify-between">
                                    <Input className="border-none bg-transparent focus-visible:!ring-0 "
                                           placeholder="Anotação" type="number" name="numero"

                                    />
                        </span>
                                                </TableHead>

                                                <TableHead className="hover:bg-slate-100">
                            <span className="flex gap-2 relative items-center justify-between">
                            <Input className="border-none bg-transparent focus-visible:!ring-0 " placeholder="Tipo"
                                   type="text" name="situacao"
                                   list="status"
                            />

                        </span>
                                                </TableHead>
                                                <TableHead className="hover:bg-slate-100">
                        <span className="flex gap-2 relative items-center justify-between">
                            <Input className="border-none bg-transparent focus-visible:!ring-0 " placeholder="Motivo"
                                   type="text" name="motivo"
                                   list="motivos"
                            />

                        </span>
                                                </TableHead>
                                                <TableHead className="hover:bg-slate-100">
                        <span className="flex gap-2 relative items-center justify-between">
                            <Input className="border-none bg-transparent focus-visible:!ring-0 " placeholder="Estado"
                                   type="text" name="motivo"
                                   list="motivos"
                            />

                        </span>
                                                </TableHead>
                                                <TableHead className="hover:bg-slate-100">
                                                    <span className="whitespace-nowrap">Data Inicial</span>
                                                </TableHead>
                                                <TableHead className="hover:bg-slate-100">
                                                    <span className="whitespace-nowrap">Data Final</span>
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
                </div>
            </div>
        </>
    )
}