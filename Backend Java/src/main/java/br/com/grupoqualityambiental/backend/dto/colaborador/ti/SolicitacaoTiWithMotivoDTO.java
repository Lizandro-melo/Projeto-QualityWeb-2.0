package br.com.grupoqualityambiental.backend.dto.colaborador.ti;

import br.com.grupoqualityambiental.backend.enumerated.colaborador.SolicitacaoTiEnum;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;

import java.time.LocalDateTime;

public record SolicitacaoTiWithMotivoDTO(Long id, InfoColaboradorModel solicitante, LocalDateTime dataHora,
                                         String titulo,
                                         String ocorrencia, SolicitacaoTiEnum status, String anexo, String motivo,
                                         LocalDateTime dataHoraFinalizado) {
}
