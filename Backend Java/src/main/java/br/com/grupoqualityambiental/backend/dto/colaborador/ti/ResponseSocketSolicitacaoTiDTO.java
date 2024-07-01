package br.com.grupoqualityambiental.backend.dto.colaborador.ti;

import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import br.com.grupoqualityambiental.backend.models.ti.MensagemTiModels;
import br.com.grupoqualityambiental.backend.models.ti.SolicitacaoTiModels;

import java.util.List;

public record ResponseSocketSolicitacaoTiDTO(SolicitacaoTiDTO solicitacao,
                                             List<MensagemTiDTO> mensagens) {
}
