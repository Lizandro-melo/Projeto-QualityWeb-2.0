package br.com.grupoqualityambiental.backend.repository.rh;

import br.com.grupoqualityambiental.backend.enumerated.colaborador.TipoColaboradorEnum;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.TipoDocRhEnum;
import br.com.grupoqualityambiental.backend.models.rh.AnotacaoRhModels;
import br.com.grupoqualityambiental.backend.models.rh.DocRhModels;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AnotacaoRhRepository extends JpaRepository<AnotacaoRhModels, Long> {

    List<AnotacaoRhModels> findByColaboradorReferent(Integer idColaborador);

    List<AnotacaoRhModels> findByAnotacaoContainingIgnoreCaseAndColaboradorReferentAndStatusAndDataInicioBetween(String anotacao, Integer idColaborador, Boolean status, LocalDate dataInicio, LocalDate dataFim);

    List<AnotacaoRhModels> findByAnotacaoContainingIgnoreCaseAndColaboradorReferentAndTipoAnotacaoAndStatusAndDataInicioBetween(String anotacao, Integer idColaborador, TipoColaboradorEnum tipoColaborador, Boolean status, LocalDate dataInicio, LocalDate dataFim);
}
