import {create} from "zustand"
import {
    AcessoModel, AnotacaoRhModels, DocRhModels, InfoColaborador,
    MensagemTiDTO,
    ResponseSocketSolicitacaoTiDTO,
    SolicitcaoTiDTO
} from "@/lib/models";

export type stateLoundingGlobalProps = {
    stateDisplayLounding: boolean
    stateDisplaySuccess: boolean
    stateDisplayFailure: boolean
    setDisplayLounding: () => void
    setDisplaySuccess: (mensagem: string) => void
    setDisplayFailure: (mensagem: string) => void
    setDisplayReset: () => void
}
export const stateLoundingGlobal = create<stateLoundingGlobalProps>((set) => ({
    stateDisplayLounding: false,
    stateDisplaySuccess: false,
    stateDisplayFailure: false,
    mensagem: "",
    setDisplayLounding: () => set((state: any) => ({
        stateDisplayLounding: true,
        stateDisplaySuccess: false,
        stateDisplayFailure: false,
    })),
    setDisplaySuccess: (mensagem: string) => set((state: any) => ({
        stateDisplayLounding: false,
        stateDisplaySuccess: true,
        stateDisplayFailure: false,
        mensagem: mensagem,
    })),
    setDisplayFailure: (mensagem: string) => set((state: any) => ({
        stateDisplayLounding: false,
        stateDisplaySuccess: false,
        stateDisplayFailure: true,
        mensagem: mensagem,
    })),
    setDisplayReset: () => set((state: any) => ({
        stateDisplayLounding: false,
        stateDisplaySuccess: false,
        stateDisplayFailure: false,
    })),
}))

export type stateBarGlobalprops = {
    stateNavBar: boolean
    alterState: () => void
    setBool: (bool: boolean) => void
}
export const stateNavBarGlobal = create<stateBarGlobalprops>((set) => ({
    stateNavBar: true,
    alterState: () => set((state: any) => ({
        stateNavBar: !state.stateNavBar,
    })),
    setBool: (bool: boolean) => set((state: any) => ({
        stateNavBar: bool,
    }))
}))

export const stateListColaboradorBarGlobal = create<stateBarGlobalprops>((set) => ({
    stateNavBar: true,
    alterState: () => set((state: any) => ({
        stateNavBar: !state.stateNavBar,
    })),
    setBool: (bool: boolean) => set((state: any) => ({
        stateNavBar: bool,
    }))
}))

export type solicitacaoSelectGlobalProps = {
    solicitacaoSelect: SolicitcaoTiDTO | null,
    mensagens: MensagemTiDTO[] | null,
    setSelect: (solicitacaoSelected: ResponseSocketSolicitacaoTiDTO | null) => void
}
export const solicitacaoSelectGlobal = create<solicitacaoSelectGlobalProps>((set) => ({
    solicitacaoSelect: null,
    mensagens: null,
    setSelect: (solicitacaoSelected: ResponseSocketSolicitacaoTiDTO | null) => set((state: any) => ({
        solicitacaoSelect: solicitacaoSelected?.solicitacao,
        mensagens: solicitacaoSelected?.mensagens
    }))
}))

export type stateAlertDialogGlobalProps = {
    titulo: string | null,
    mensagem: string | null,
    action?: any,
    state: boolean
    setState: () => void
    setAlert: (titulo: string | null,
               mensagens: string | null,
               action: () => void) => void
}
export const stateAlertDialogGlobal = create<stateAlertDialogGlobalProps>((set) => ({
    titulo: null,
    mensagem: null,
    action: undefined,
    state: false,
    setState: () => set((stateGlobal) => ({
        state: !stateGlobal.state
    })),
    setAlert: (titulo: string | null,
               mensagens: string | null,
               action: any) => set((stateGlobal) => ({
        titulo: titulo,
        mensagem: mensagens,
        action: action,
        state: !stateGlobal.state,
    }))


}))

export type roleColaboradorSelectGlobalProps = {
    role: AcessoModel | null,
    setSelect: (acesso: AcessoModel | null) => void
}
export const roleColaboradorSelectGlobal = create<roleColaboradorSelectGlobalProps>((set) => ({
    role: null,
    setSelect: (acesso: AcessoModel | null) => set((state: any) => ({
        role: acesso
    }))
}))

export type colaboradorSelectGlobalProps = {
    colaborador: InfoColaborador | null
    setColaborador: (colaborador: InfoColaborador | null) => void
}
export const colaboradorSelectGlobal = create<colaboradorSelectGlobalProps>((set) => ({
    colaborador: null,
    setColaborador: (colaborador: InfoColaborador | null) => set((state) => ({
        colaborador: colaborador
    }))
}))

export type stateModalProps = {
    stateModal: boolean
    alterState: () => void
}
export const stateModalClassificarTicketGlobal = create<stateModalProps>((set) => ({
    stateModal: false,
    alterState: () => set((state) => ({
        stateModal: !state.stateModal,
    }))
}))

export const stateModalReClassificarTicketGlobal = create<stateModalProps>((set) => ({
    stateModal: false,
    alterState: () => set((state) => ({
        stateModal: !state.stateModal,
    }))
}))

export const stateModalDeletarTicketGlobal = create<stateModalProps>((set) => ({
    stateModal: false,
    alterState: () => set((state) => ({
        stateModal: !state.stateModal,
    }))
}))

export const stateModalHistoricoTicketGlobal = create<stateModalProps>((set) => ({
    stateModal: false,
    alterState: () => set((state) => ({
        stateModal: !state.stateModal,
    }))
}))

export const stateModalImportDocRhGlobal = create<stateModalProps>((set) => ({
    stateModal: false,
    alterState: () => set((state) => ({
        stateModal: !state.stateModal,
    }))
}))

export type stateModalDocExistenteProps = {
    stateModal: boolean
    tipo: string
    docExistente: DocRhModels | null
    docReferent: DocRhModels | null
    alterState: () => void
    setDados: (tipo: string, docExistente: DocRhModels, docReferent: DocRhModels) => void
}
export const stateModalImportDocExistenteRhGlobal = create<stateModalDocExistenteProps>((set) => ({
    stateModal: false,
    docExistente: null,
    docReferent: null,
    tipo: "",
    alterState: () => set((state) => ({
        stateModal: !state.stateModal,
    })),
    setDados: (tipo: string, docExistente: DocRhModels, docReferent: DocRhModels) => set((state) => ({
        tipo: tipo,
        docReferent: docReferent,
        docExistente: docExistente
    })),
}))

export type pageSelectProps = {
    page: string,
    setPage: (page: string) => void
}
export const pageSelectRhGlobal = create<pageSelectProps>((set) => ({
    page: "",
    setPage: (page: string) => set((state: any) => ({
        page: page
    }))
}))


export type AnotacaoSelectGlobalProps = {
    anotacao: AnotacaoRhModels | null
    setAnotacao: (anotacao: AnotacaoRhModels | null) => void
}
export const anotacaoSelectGlobal = create<AnotacaoSelectGlobalProps>((set) => ({
    anotacao: null,
    setAnotacao: (anotacao: AnotacaoRhModels | null) => set((state) => ({
        anotacao: anotacao
    }))
}))

export const stateModalAnotacaoGlobal = create<stateModalProps>((set) => ({
    stateModal: true,
    alterState: () => set((state) => ({
        stateModal: !state.stateModal,
    }))
}))