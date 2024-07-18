import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {FieldValues, UseFormRegister} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";
import {ChangeEvent, HTMLAttributes} from "react";


export const LabelInputPadrao = {
    Root: LabelInputPadraoRoot
}


type LabelInputPadraoRootProps = {
    type?: "text" | "password" | "number" | "date" | "email",
    name: string,
    title: string,
    register?: UseFormRegister<FieldValues>
    width: number
    textArea?: boolean
    required?: boolean
    value?: string
    change?: (e: ChangeEvent<any>) => void,
    classNames?: string
    disabled?: boolean
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
                                  change,
                                  classNames,
                                  disabled
                              }: LabelInputPadraoRootProps) {
    return (
        <div className={cn("flex flex-col gap-3", `w-[${width}%]`)}>
            <Label htmlFor={name}>{title}</Label>
            {!textArea && (
                <>
                    {register ? (
                        <Input {...register(name)} id={name} name={name} type={type}
                               required={required} disabled={disabled}
                               value={value} className={classNames}/>
                    ) : (<Input id={name} name={name} type={type}
                                required={required}
                                onChange={change}
                                disabled={disabled}
                                value={value} className={classNames}/>)}

                </>
            )}
            {textArea && (
                <>
                    {register ? (
                        <Textarea {...register(name)} id={name} name={name}
                                  value={value} className={classNames} disabled={disabled}/>
                    ) : (
                        <Textarea onChange={change} id={name} name={name}
                                  value={value} className={classNames} disabled={disabled}/>
                    )}
                </>

            )}
        </div>
    )
}