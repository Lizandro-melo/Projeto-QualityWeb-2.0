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
    searchParams: ReadonlyURLSearchParams,
    configToken: object | undefined
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
    const host = "http://192.168.0.227:8080"
    const [user, setUser] = useState<InfoColaborador | null>(null);
    const [acessos, setAcessos] = useState<AcessoModel | null>(null);
    const isAuthenticated = !!user
    const displayLounding = stateLoundingGlobal((state: any) => state)
    const searchParams = useSearchParams()
    const [configToken, setConfigToken] = useState<any>()

    useEffect(() => {
        displayLounding.setDisplayLounding()
        const {'quality-token': token} = parseCookies()
        if (token) {
            setConfigToken({
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            axios.get(`${host}/auth/revalidate?token=${token}`).then(async (response) => {
                displayLounding.setDisplaySuccess("Validado!")
                const {data}: { data: ResponseRevalidate } = response
                setCookie(undefined, "quality-user", JSON.stringify(data.user), {
                    maxAge: 60 * 60 * 24, // 1 dia
                })
                setCookie(undefined, "quality-acessos", JSON.stringify(data.acessos), {
                    maxAge: 60 * 60 * 24, // 1 dia
                })
                setUser(data.user)
                setAcessos(data.acessos)
                await new Promise(resolve => setTimeout(resolve, 1500))
                displayLounding.setDisplayReset()
            }).catch(async () => {
                displayLounding.setDisplayFailure("Efetue o login novamente!")
                await new Promise(resolve => setTimeout(resolve, 1500))
                disconnect()
                displayLounding.setDisplayReset()

            })
        } else {
            disconnect()

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
            setConfigToken({
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            })
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
            await new Promise(resolve => setTimeout(resolve, 1500))
            displayLounding.setDisplayReset()
            Router.push("/home")
        }).catch(async () => {
            displayLounding.setDisplayFailure("Nome do usuário ou senha incorreto. Tente novamente.")
            await new Promise(resolve => setTimeout(resolve, 1500))
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
            disconnect, host, searchParams, configToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}