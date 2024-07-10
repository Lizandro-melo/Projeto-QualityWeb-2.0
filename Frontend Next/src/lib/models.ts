import {number} from "zod";

export type InfoColaborador = {
    fkAuth: number
    nomeCompleto: string
    cpf: string
    rg: string
    emissoRg: string
    nCarteira: string
    pis: string
    nTitulo: string
    nomeMaterno: string
    cep: string
    dataNascimento: string
    dirFoto: string
    tipo: string
}

export type AcessoModel = {
    id: number
    referentColaborador: number
    rolesTI: TiAcessoModel
    rolesRH: RhAcessoModel
}

export type TiAcessoModel = {
    id: number
    deletarTicket: boolean
    alterarTicket: boolean
    puxarRelatorio: boolean
    alterarStatus: boolean
    reclassificar: boolean
    delegado: boolean
}

export type RhAcessoModel = {
    id: number
    delegado: boolean
}

export type ResponseSocketSolicitacaoTiDTO = {
    solicitacao: SolicitcaoTiDTO
    mensagens: MensagemTiDTO[]
}

export type SolicitcaoTiModels = {
    id?: number
    solicitante: number | undefined
    dataHora?: string
    titulo: string
    ocorrencia: string
    status?: string
    anexos?: string | null
}

export type MensagemTiModels = {
    id: number
    referentSolicitacao: SolicitcaoTiModels
    mensagem: string
    status: string
    responsavel: number
    dataHora: string
    anexos: string
}

export type MensagemTiDTO = {
    id: number
    referentSolicitacao: number
    mensagem: string
    status: string
    responsavel: InfoColaborador
    dataHora: string
    anexos: string
}

export type RequestSocketSolicitacaoDTO = {
    userId: number | undefined
    solicitacao: SolicitcaoTiDTO
}

export type SolicitcaoTiDTO = {
    id?: number
    solicitante: InfoColaborador
    dataHora?: string
    titulo: string
    ocorrencia: string
    status?: string
    anexo?: string
    dataHoraFinalizado?: string
}

export type SolicitacaoTiWithMotivoDTO = {
    id?: number
    solicitante: InfoColaborador
    dataHora?: string
    titulo: string
    ocorrencia: string
    motivo: string
    status?: string
    anexo?: string
    dataHoraFinalizado?: string
}

export type ContentSocketTiModels = {
    id?: number
    solicitacao: SolicitcaoTiModels
    user: number
}

export type ContentSocketTiDTO = {
    id?: number
    solicitacao: SolicitcaoTiModels
    user: InfoColaborador
}

export type RequestMensagemTiDTO = {
    referentSolicitacao: number | undefined,
    responsavel: number
    mensagem: string
    anexos: string | null
}

export type GrupoClassificacaoTiModels = {
    id: number
    nome: string
    status: boolean
}

export type SubcategoriaTiModels = {
    id: number
    nome: string
    status: boolean
    referentCategoria: number
}

export type CategoriaClassificacaoTiModels = {
    id: number
    nome: string
    status: boolean
    referentGrupo: number
}

export type DocRhModels = {
    id?: number | undefined
    dir?: string
    tipo?: string
    dataVencimento?: string
    dataEmissao?: string
    tempoAlerta?: string
    referentColaborador: number | undefined
    apelido: string
}

export type TipoDocRhDTO = {
    tipo: string
    doc: DocRhModels
}

export type SubstituirDocRhDTO = {
    docExistente: DocRhModels | null,
    docSubstituto: DocRhModels | null
}

export type EmpresaColaboradorModel = {
    id: number
    nome: string
}

export type SetorColaboradorModel = {
    id: number
    nome: string
}

export type DocExpirandoAlertRhDTO = {
    doc: DocRhModels | null,
    diasRestantes: number
}

export type ContatoColaboradorModel = {
    id: number
    colaboradorReferent: InfoColaborador
    tipo: string
    nCelular: string
    nfixo: string
    email: string
}

export type ContaBancariaColaboradorModel = {
    id: number
    colaboradorReferent: InfoColaborador
    nomeBanco: string
    numeroConta: string
    numeroAgencia: string
}

export type InfoCLTColaboradorModel = {
    id: number
    dataAdmissao: string
    dataDemissao: string
    empresa: EmpresaColaboradorModel
    setor: SetorColaboradorModel
}

export type InfoEstagiarioColaboradorModel = {
    id: number
    dataAdmissao: string
    dataDemissao: string
    empresa: EmpresaColaboradorModel
    setor: SetorColaboradorModel
    status: boolean
}

export type InfoMEIColaboradorModel = {
    id: number
    dataAdmissao: string
    dataDemissao: string
    empresa: EmpresaColaboradorModel
    setor: SetorColaboradorModel
    status: boolean
}

export type InfoColaboradorCompletoDTO = {
    infoPessoais: InfoColaborador
    contatos: ContatoColaboradorModel[]
    contasBancarias: ContaBancariaColaboradorModel[]
    infoCLT: InfoCLTColaboradorModel
    infoEstagiario: InfoEstagiarioColaboradorModel
    infoMEI: InfoMEIColaboradorModel
}

export type ContabilizacaoDadosAnotacao = {
    atestado: number
    ferias: number
    faltou: number
    suspensao: number
    licenca: number
    atestadoHora: number
    advEscrita: number
    advVerbal: number
    horasExtras: number
    bancoHoras: number
    atrasos: number
    atrasoTempo: number
}

export type AnotacaoRhModels = {
    id: number;
    responsavel: number;
    colaboradorReferent: number;
    anotacao: string;
    atestado: boolean;
    ferias: boolean;
    faltou: boolean;
    suspensao: boolean;
    licenca: boolean;
    atestadoHora: boolean;
    advEscrita: boolean;
    advVerbal: boolean;
    horaExtra: number;
    dataInicio: string;
    dataFinal: string;
    advEscritaData: string;
    bancoPositivo: number;
    bancoNegativo: number;
    tipoAnotacao: string;
    motivo: string;
    atraso: boolean;
    atrasoTempo: number;
    status: boolean;
};

export type ResponseFindAnotacaoRhDTO = {
    infoColaborador: InfoColaboradorCompletoDTO
    anotacoes: AnotacaoRhModels[]
    dadosContabilizados: ContabilizacaoDadosAnotacao
}


