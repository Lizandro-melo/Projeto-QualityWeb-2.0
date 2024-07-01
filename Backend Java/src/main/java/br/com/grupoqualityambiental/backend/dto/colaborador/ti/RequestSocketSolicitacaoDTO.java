package br.com.grupoqualityambiental.backend.dto.colaborador.ti;

import br.com.grupoqualityambiental.backend.models.ti.SolicitacaoTiModels;

public record RequestSocketSolicitacaoDTO(Integer userId, SolicitacaoTiDTO solicitacao) {
}
