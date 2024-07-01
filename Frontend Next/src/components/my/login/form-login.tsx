import {LabelInputPadrao} from "@/components/my/essential/label-input-padrao";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {FieldValues, useForm, UseFormRegister} from "react-hook-form";
import {useContext} from "react";
import {AuthContext} from "@/contexts/AuthContext";

export const FormLogin = {
    Root: FormLoginRoot,

}


export function FormLoginRoot() {
    const {register, handleSubmit} = useForm()
    const {singIn} = useContext(AuthContext)

    const logIn = (data: any) => {
        singIn(data)
    }

    return (
        <div className="w-[65%] h-[65%] bg-white dark:bg-slate-950 flex rounded-[20px] shadow-2xl">
            <div className="w-[50%] h-full rounded-l-[20px] bg-stone-100 flex justify-center items-center shadow-lg ">
                <div className="flex flex-col justify-center items-center">
                    <span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="./assets/logo-grupo-quality.png" alt="Logo da empresa"
                             className="w-[300px] drop-shadow-xl"/>
                    </span>
                </div>
            </div>
            <form onSubmit={handleSubmit(logIn)} method="POST"
                  className="w-[50%] h-full flex justify-center items-center flex-col gap-4">
                <FormLoginEntradas register={register}/>
                <FormLoginButtom/>
            </form>
        </div>
    )
}

type FormLoginEntradasProps = {
    register: UseFormRegister<FieldValues>
}

export function FormLoginEntradas({register}: FormLoginEntradasProps) {
    return (
        <>
            <LabelInputPadrao.Root register={register} name={"login"} title={"Login"} type={"text"} width={70}/>
            <LabelInputPadrao.Root register={register} name={"password"} title={"Senha"} type={"password"} width={70}/>
        </>
    )
}

export function FormLoginButtom() {
    return (
        <>
            <div className="flex flex-col gap-4 w-[70%]">
                <Button type="submit">Entrar</Button>
            </div>

        </>
    )
}