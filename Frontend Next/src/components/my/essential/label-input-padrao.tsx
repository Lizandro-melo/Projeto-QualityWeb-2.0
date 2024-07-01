import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {FieldValues, UseFormRegister} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";


export const LabelInputPadrao = {
    Root: LabelInputPadraoRoot
}


type LabelInputPadraoRootProps = {
    type?: "text" | "password" | "number" | "date",
    name: string,
    title: string,
    register: UseFormRegister<FieldValues>
    width: number
    textArea?: boolean
    required?: boolean
}

function LabelInputPadraoRoot({title, name, type, register, width, textArea, required}: LabelInputPadraoRootProps) {
    return (
        <div className={cn("flex flex-col gap-4", `w-[${width}%]`)}>
            <Label htmlFor={name}>{title}</Label>
            {!textArea && (
                <Input {...register(name)} id={name} name={name} type={type} required={required}/>
            )}
            {textArea && (
                <Textarea {...register(name)} id={name} name={name}/>
            )}
        </div>
    )
}