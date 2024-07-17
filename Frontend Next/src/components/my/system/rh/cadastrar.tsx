import ListColaboradoresAtivos from "@/components/my/essential/ListColaboradoresAtivos";
import {LabelInputPadrao} from "@/components/my/essential/label-input-padrao";
import {useForm} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useContext, useEffect} from "react";
import {useQuery} from "react-query";
import {AuthContext} from "@/contexts/AuthContext";
import axios from "axios";
import {EmpresaColaboradorModel, RegisterDTO} from "@/lib/models";
import {pageSelectProps, pageSelectRhGlobal, stateLoundingGlobal} from "@/lib/globalStates";

export default function Cadastrar() {

    const {register, handleSubmit, setValue, reset} = useForm()

    const {host, configToken} = useContext(AuthContext)
    const displayLounding = stateLoundingGlobal((state: any) => state)
    const {data: empresas} = useQuery({
        queryKey: ["empresas"],
        queryFn: async () => {
            const response: EmpresaColaboradorModel[] = await axios.get(`${host}/colaborador/find/empresas`, configToken).then((reponse) => reponse.data)
            return response;
        },
        enabled: !!host && !!configToken,
    })
    const {data: setores} = useQuery({
        queryKey: ["setores"],
        queryFn: async () => {
            const response: EmpresaColaboradorModel[] = await axios.get(`${host}/colaborador/find/setores`, configToken).then((reponse) => reponse.data)
            return response;
        },
        enabled: !!host && !!configToken,
    })
    const selectPage = pageSelectRhGlobal<pageSelectProps>((state) => state)

    const cadastrarColaborador = async (data: any) => {
        displayLounding.setDisplayLounding();
        const cadastro: RegisterDTO = {
            ...data,
            empresa: JSON.parse(data.empresa),
            setor: JSON.parse(data.setor)
        }
        await axios.post(`${host}/auth/register`, cadastro, configToken).then(async (response) => {
            displayLounding.setDisplaySuccess(response.data);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            reset()
            selectPage.setPage("listaColaboradores")
            displayLounding.setDisplayReset()
        }).catch(async () => {
            displayLounding.setDisplaySuccess("Ocorreu um erro ao cadastrar! verifique os dados!");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            displayLounding.setDisplayReset()
        })
    }

    useEffect(() => {
        const data = new Date().toLocaleDateString()
        setValue("login", `${data.split("/")[2]}${data.split("/")[1]}${data.split("/")[0]}${Math.round(Math.random() * 99)}`)
    }, []);


    return (
        <>
            <ScrollArea className="w-full">
                <form onSubmit={handleSubmit(cadastrarColaborador)}
                      className="w-full h-full p-5  scale-[95%] absolute overflow-auto">
                    <div className="gap-5 w-full h-full flex flex-col items-center">
                        <div className="w-[60%] p-5 flex flex-col gap-3 border border-stone-300 rounded-md">
                            <span className="text-xs">Informações pessoais</span>
                            <div className="flex gap-3 w-full justify-center">
                                <LabelInputPadrao.Root name={"nomeCompleto"} title={"Nome completo"} width={70}
                                                       register={register}
                                                       classNames="w-full" required/>
                                <LabelInputPadrao.Root name={"login"} title={"Matricula"} width={30}
                                                       register={register}
                                                       classNames="w-full" disabled/>
                            </div>
                            <div className="flex gap-3 w-full justify-center">
                                <LabelInputPadrao.Root name={"email"} title={"E-mail"} width={50}
                                                       register={register}
                                                       classNames="w-full" type="email" required/>
                                <LabelInputPadrao.Root name={"nCelular"} title={"Numero do celular"} width={50}
                                                       register={register}
                                                       classNames="w-full" type="text" required/>
                            </div>
                            <div className="flex gap-3 w-full justify-center">
                                <LabelInputPadrao.Root name={"cep"} title={"CEP"} width={50}
                                                       register={register}
                                                       classNames="w-full" type="text"/>
                                <LabelInputPadrao.Root name={"dataNascimento"} title={"Data de nascimento"} width={50}
                                                       register={register}
                                                       classNames="w-full" type="date" required/>
                            </div>
                        </div>
                        <div className="w-[60%] p-5 flex flex-col gap-3 border border-stone-300 rounded-md">
                            <span className="text-xs">Informações de contrato</span>
                            <div className="flex gap-3 w-full justify-center">
                                <div className={cn("flex flex-col gap-3 w-[50%]")}>
                                    <Label htmlFor="tipo">Tipo de contrato</Label>
                                    <select
                                        className="flex h-9 w-full rounded-md text-xs border !border-stone-600 border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        {...register("tipo")}
                                        name="tipo"
                                        required
                                    >
                                        <option value="">Escolha</option>
                                        <option value="CLT">CLT</option>
                                        <option value="ESTAGIARIO">Estagiario</option>
                                        <option value="TERCEIRIZADO">Terceirizado</option>
                                    </select>
                                </div>
                                <LabelInputPadrao.Root name={"dataAdmissao"} title={"Data de inicio"} width={50}
                                                       register={register}
                                                       classNames="w-full" type="date"/>
                            </div>
                            <div className="flex gap-3 w-full justify-center">
                                <div className={cn("flex flex-col gap-3 w-[50%]")}>
                                    <Label htmlFor="empresa">Empresa</Label>
                                    <select
                                        className="flex h-9 w-full rounded-md text-xs border !border-stone-600 border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        {...register("empresa")}
                                        name="empresa"
                                        required
                                    >
                                        <option value="">Escolha</option>
                                        {empresas?.map((empresa) => {
                                            return (
                                                <option key={empresa.id}
                                                        value={JSON.stringify(empresa)}>{empresa.nome}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className={cn("flex flex-col gap-3 w-[50%]")}>
                                    <Label htmlFor="setor">Setor</Label>
                                    <select
                                        className="flex h-9 w-full rounded-md text-xs border !border-stone-600 border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        {...register("setor")}
                                        name="setor"
                                        required
                                    >
                                        <option value="">Escolha</option>
                                        {setores?.map((setor) => {
                                            return (
                                                <option key={setor.id}
                                                        value={JSON.stringify(setor)}>{setor.nome}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="w-[60%] flex gap-3 rounded-md">
                            <Button>
                                Cadastrar
                            </Button>
                        </div>
                    </div>
                </form>
            </ScrollArea>

        </>
    )
}