import {ContainerMain} from "@/components/my/essential/container-main";
import {FormLogin} from "@/components/my/login/form-login";
import {useEffect} from "react";
import {parseCookies, setCookie} from "nookies";
import axios from "axios";
import Router from "next/router";


export default function Login() {

    useEffect(() => {
        const {'quality-token': token} = parseCookies()
        if (token) {
            axios.get(`http://localhost:8080/auth/revalidate?token=${token}`).then((response) => {
                Router.push("/home")
            }).catch(() => {
                return
            })
        }
    }, [])

    return (
        <ContainerMain.Root center>
            <section className="plano-fundo-login absolute"></section>
            <FormLogin.Root/>
        </ContainerMain.Root>
    );
}
