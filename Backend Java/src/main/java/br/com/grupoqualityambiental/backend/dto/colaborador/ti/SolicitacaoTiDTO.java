package br.com.grupoqualityambiental.backend.dto.colaborador.ti;

import br.com.grupoqualityambiental.backend.enumerated.colaborador.SolicitacaoTiEnum;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import br.com.grupoqualityambiental.backend.models.ti.SolicitacaoTiModels;

import java.time.LocalDateTime;

public record SolicitacaoTiDTO(Long id, InfoColaboradorModel solicitante, LocalDateTime dataHora, String titulo,
                               String ocorrencia, SolicitacaoTiEnum status, String anexo,LocalDateTime dataHoraFinalizado) {
}
