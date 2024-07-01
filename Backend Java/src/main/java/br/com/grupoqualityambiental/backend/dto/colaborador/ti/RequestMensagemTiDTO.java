package br.com.grupoqualityambiental.backend.dto.colaborador.ti;

public record RequestMensagemTiDTO(Integer referentSolicitacao, Integer responsavel, String mensagem, String anexos) {
}
