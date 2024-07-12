import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {AuthProvider} from "@/contexts/AuthContext";
import LoudingDisplay from "@/components/my/essential/louding-display";
import {QueryClient, QueryClientProvider} from "react-query";
import DialogAlertGlobal from "@/components/my/essential/DialogAlertGlobal";


export default function App({Component, pageProps}: AppProps) {

    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>

            <AuthProvider>
                <DialogAlertGlobal/>
                <LoudingDisplay/>
                <Component {...pageProps} />
            </AuthProvider>

        </QueryClientProvider>
    );
}
