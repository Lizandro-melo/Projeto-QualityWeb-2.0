import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {FieldValues, UseFormRegister} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";
import {ChangeEvent} from "react";


export const LabelInputPadrao = {
    Root: LabelInputPadraoRoot
}


type LabelInputPadraoRootProps = {
    type?: "text" | "password" | "number" | "date",
    name: string,
    title: string,
    register?: UseFormRegister<FieldValues>
    width: number
    textArea?: boolean
    required?: boolean
    value?: string
    change?: (e: ChangeEvent<any>) => void
}

function LabelInputPadraoRoot({
                                  title,
                                  name,
                                  type,
                                  register,
                                  width,
                                  textArea,
                                  required,
                                  value,
                                  change
                              }: LabelInputPadraoRootProps) {
    return (
        <div className={cn("flex flex-col gap-4", `w-[${width}%]`)}>
            <Label htmlFor={name}>{title}</Label>
            {!textArea && (
                <>
                    {register ? (
                        <Input{...register(name)} id={name} name={name} type={type}
                              required={required}
                              value={value}/>
                    ) : (
                        <Input id={name} name={name} type={type}
                               required={required}
                               onChange={change}
                               value={value}/>
                    )}
                </>
            )}
            {textArea && (
                <>
                    {register ? (
                        <Textarea {...register(name)} id={name} name={name} value={value}/>
                    ) : (
                        <Textarea onChange={change} id={name} name={name} value={value}/>
                    )}
                </>


            )}
        </div>
    )
}