import {
    InfoColaborador, MensagemTiDTO,
    RequestSocketSolicitacaoDTO,
    ResponseSocketSolicitacaoTiDTO,
    SolicitcaoTiDTO,
    SolicitcaoTiModels
} from "@/lib/models";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import React, {useCallback, useContext, useEffect, useState} from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import {AuthContext} from "@/contexts/AuthContext";
import axios from "axios";
import {
    solicitacaoSelectGlobal, solicitacaoSelectGlobalProps,
    stateNavBarGlobal
} from "@/lib/globalStates";
import {useQuery} from "react-query";
import {alterNomeCompletoParaNomeSobrenome, formatDateTimeUser} from "@/lib/utils";


type ListSolicitacoesProps = {}
export default function ListSolicitacoes() {


    const {acessos, user, host} = useContext(AuthContext)
    const selectSolicitacao = solicitacaoSelectGlobal<solicitacaoSelectGlobalProps>((state: any) => state)
    const {data: solicitacoes} = useQuery({
        queryKey: ["solicitacoes"],
        queryFn: async () => {
            if (!acessos) {
                return;
            }
            return await axios.get(`${host}/suporte/find/solicitacao`).then((response) => {
                return insertSolicitacoes(response.data)
            })
        },
        refetchInterval: 1500,
        refetchIntervalInBackground: true
    })

    const insertSolicitacoes = (solicitacoes: SolicitcaoTiDTO[]) => {
        if (acessos?.rolesTI) {
            return solicitacoes
        } else {
            return solicitacoes.filter(value => (value.solicitante.nomeCompleto === user?.nomeCompleto))
        }
    }

    const joinSolicitacao = async (idSolicitacao: number | undefined) => {
        await axios.get(`${host}/suporte/find/solicitacao/exatc?id=${idSolicitacao}`).then((response) => {
            const solicitacaoSelect: ResponseSocketSolicitacaoTiDTO = response.data
            selectSolicitacao.setSelect(solicitacaoSelect);
        })
    }

    return (
        <>
            {solicitacoes?.sort((a: any, b: any) => a.id - b.id
            ).map((solicitacao: SolicitcaoTiDTO, i) => {
                return (
                    <button key={i}
                            onClick={() => joinSolicitacao(solicitacao.id)}
                            className="bg-stone-200 px-2 h-[60px] relative flex items-center hover:bg-stone-300 justify-between transition-all rounded-md w-full active:scale-95">
                        <Avatar>
                            <AvatarImage
                                src={!solicitacao.solicitante.dirFoto ? 'https://placehold.co/600?text=Foto' : solicitacao.solicitante.dirFoto}
                                alt="fotoColaborador"/>
                        </Avatar>
                        <span
                            className="text-xs whitespace-nowrap">{alterNomeCompletoParaNomeSobrenome(solicitacao.solicitante.nomeCompleto)}</span>
                        <span
                            className="smallSpan absolute right-2 top-1">{formatDateTimeUser(solicitacao.dataHora)}</span>
                        <span className="smallSpan absolute right-2 bottom-1">#{solicitacao.id}</span>
                    </button>
                )
            })}
        </>
    )
}