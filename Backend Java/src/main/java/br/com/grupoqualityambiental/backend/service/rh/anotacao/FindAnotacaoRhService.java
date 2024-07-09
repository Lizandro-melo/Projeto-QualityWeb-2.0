package br.com.grupoqualityambiental.backend.service.rh.anotacao;

import br.com.grupoqualityambiental.backend.dto.rh.ContabilizacaoDadosAnotacao;
import br.com.grupoqualityambiental.backend.dto.rh.ResponseFindAnotacaoRhDTO;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.TipoColaboradorEnum;
import br.com.grupoqualityambiental.backend.models.rh.AnotacaoRhModels;
import br.com.grupoqualityambiental.backend.repository.rh.AnotacaoRhRepository;
import br.com.grupoqualityambiental.backend.service.colaborador.FindColaboradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class FindAnotacaoRhService {
    @Autowired
    private FindColaboradorService findColaboradorService;
    @Autowired
    private AnotacaoRhRepository anotacaoRhRepository;


    public ResponseFindAnotacaoRhDTO getAnotacaoColaborador(String anotacao, Integer idColaborador, String tipo, Boolean status, LocalDate dataInicio, LocalDate dataFim) {
        TipoColaboradorEnum tipoColaborador = TipoColaboradorEnum.valueOf(tipo.toUpperCase());
        List<AnotacaoRhModels> anotacoes = new ArrayList<>();
        if (Objects.equals(tipoColaborador, TipoColaboradorEnum.TODOS)) {
            anotacoes = anotacaoRhRepository.findByAnotacaoContainingIgnoreCaseAndColaboradorReferentAndStatusAndDataInicioBetween(anotacao, idColaborador, status, dataInicio, dataFim);
        } else {
            anotacoes = anotacaoRhRepository.findByAnotacaoContainingIgnoreCaseAndColaboradorReferentAndTipoAnotacaoAndStatusAndDataInicioBetween(anotacao, idColaborador, tipoColaborador, status, dataInicio, dataFim);
        }

        return new ResponseFindAnotacaoRhDTO(findColaboradorService.getAllInfoCompletasColaborador(idColaborador), anotacoes, new ContabilizacaoDadosAnotacao(anotacoes));
    }
}
