import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";
import {destroyCookie, parseCookies, setCookie} from "nookies";
import Router from "next/router";
import {stateLoundingGlobal} from "@/lib/globalStates";
import {AcessoModel, InfoColaborador} from "@/lib/models";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";

type AuthContextType = {
    user: InfoColaborador | null
    acessos: AcessoModel | null
    isAuthenticated: boolean;
    singIn: (dadosLogin: { login: string, password: string }) => void,
    disconnect: () => void,
    host: string,
    searchParams: ReadonlyURLSearchParams
}

type ResponseSingIn = {
    token: string
    user: InfoColaborador
    acessos: AcessoModel
}
type ResponseRevalidate = {
    user: InfoColaborador
    acessos: AcessoModel
}


export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: { children: ReactNode }) {
    const host = "http://localhost:8080"
    const [user, setUser] = useState<InfoColaborador | null>(null);
    const [acessos, setAcessos] = useState<AcessoModel | null>(null);
    const isAuthenticated = !!user
    const displayLounding = stateLoundingGlobal((state: any) => state)
    const searchParams = useSearchParams()

    useEffect(() => {
        const {'quality-token': token} = parseCookies()
        if (token) {
            axios.get(`${host}/auth/revalidate?token=${token}`).then((response) => {
                const {data}: { data: ResponseRevalidate } = response
                setCookie(undefined, "quality-user", JSON.stringify(data.user), {
                    maxAge: 60 * 60 * 24, // 1 dia
                })
                setCookie(undefined, "quality-acessos", JSON.stringify(data.acessos), {
                    maxAge: 60 * 60 * 24, // 1 dia
                })
                setUser(data.user)
                setAcessos(data.acessos)
            }).catch(() => {
                disconnect()
                Router.push("/")
            })
        } else {
            disconnect()
            Router.push("/")
        }
    }, [])

    const singIn = async (dadosLogin: { login: string, password: string }) => {
        displayLounding.setDisplayLounding()
        await new Promise(resolve => setTimeout(resolve, 500))
        await axios.post(`${host}/auth/login`, {
            login: dadosLogin.login.toLowerCase(),
            password: dadosLogin.password
        }).then(async (response) => {
            const {data}: { data: ResponseSingIn } = response
            displayLounding.setDisplaySuccess("Logado com sucesso!")
            setCookie(undefined, "quality-token", data.token, {
                maxAge: 60 * 60 * 24, // 1 dia
            })
            setCookie(undefined, "quality-user", JSON.stringify(data.user), {
                maxAge: 60 * 60 * 24, // 1 dia
            })
            setCookie(undefined, "quality-acessos", JSON.stringify(data.acessos), {
                maxAge: 60 * 60 * 24, // 1 dia
            })
            setUser(data.user)
            setAcessos(data.acessos)
            await new Promise(resolve => setTimeout(resolve, 1000))
            displayLounding.setDisplayReset()
            Router.push("/home")
        }).catch(async () => {
            displayLounding.setDisplayFailure("Nome do usuário ou senha incorreto. Tente novamente.")
            await new Promise(resolve => setTimeout(resolve, 1000))
            displayLounding.setDisplayReset()
        })
    }

    const disconnect = () => {
        destroyCookie(undefined, 'quality-token')
        destroyCookie(undefined, 'quality-user')
        destroyCookie(undefined, 'quality-acessos')
        localStorage.clear()
        sessionStorage.clear()
        Router.push("/")
    }


    return (
        <AuthContext.Provider value={{
            user,
            acessos,
            isAuthenticated,
            singIn,
            disconnect, host, searchParams
        }}>
            {children}
        </AuthContext.Provider>
    )
}