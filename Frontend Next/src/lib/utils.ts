import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDateTimeUser(dataTimeBancoDados: string | undefined) {
    if (!dataTimeBancoDados) {
        return null;
    }

    const date = new Date(dataTimeBancoDados);

    if (isNaN(date.getTime())) {
        return null;
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function alterNomeCompletoParaNomeSobrenome(nomeCompleto: string | undefined) {
    if (!nomeCompleto) {
        return
    }
    const nomeDividido = nomeCompleto.split(" ")

    return `${nomeDividido[0]} ${nomeDividido[nomeDividido.length - 1]}`
}