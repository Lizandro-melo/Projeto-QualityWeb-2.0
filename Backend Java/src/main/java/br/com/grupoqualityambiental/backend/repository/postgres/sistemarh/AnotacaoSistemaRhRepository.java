package br.com.grupoqualityambiental.backend.repository.postgres.sistemarh;


import br.com.grupoqualityambiental.backend.models.postgres.sistemarh.AnotacaoSistemaRhEntity;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@Qualifier("sistemaRhDatASource")
public interface AnotacaoSistemaRhRepository extends JpaRepository<AnotacaoSistemaRhEntity, Long> {


    List<AnotacaoSistemaRhEntity> findByColaboradorAndTipoAndDataInicioBetween(long l, String tipo, LocalDate dataInicio, LocalDate dataFinal);
    List<AnotacaoSistemaRhEntity> findByColaboradorAndTipoAndStatusAndDataInicioBetween(long l, String tipo, Boolean status, LocalDate dataInicio, LocalDate dataFinal);

    List<AnotacaoSistemaRhEntity> findByColaboradorAndDataInicioBetween(long l, LocalDate dataInicio, LocalDate dataFinal);

    List<AnotacaoSistemaRhEntity> findByColaborador(Long idColaborador);
    
    @Query("SELECT SUM(bancoPositivo) AS bancoPositivo ,SUM(bancoNegativo) AS bancoNegativo, SUM(bancoPositivo) - SUM(bancoNegativo) AS bancoHoras, SUM(horaExtra) AS horaExtra, count(CASE WHEN faltou then 1 end) AS faltas, count(CASE WHEN atestadoHora then 1 end) AS atestadoHora, count(CASE WHEN atestado then 1 end) AS atestadoDias, count(CASE WHEN licenca then 1 end) AS licenca, count(CASE WHEN suspensao then 1 end) AS suspensao, count(CASE WHEN advertenciaEscrita then 1 end) AS advEscrita, count(CASE WHEN advertenciaVerbal then 1 end) AS advVerbal, SUM(atrasoInt) AS atrasoInt, count(CASE WHEN atraso then 1 end) AS atrasoQuantidade, count(CASE WHEN ferias then 1 end) AS ferias from AnotacaoSistemaRhEntity where colaborador = :idColaborador and status = true and tipo = :tipo and dataInicio BETWEEN :dataInicio and :dataFinal")
    Object findByDadosAnotacoes(@Param("idColaborador") Long id, @Param("dataInicio") LocalDate dataInicio, @Param("dataFinal") LocalDate dataFinal, @Param("tipo") String tipo);

    @Query("SELECT SUM(bancoPositivo) AS bancoPositivo ,SUM(bancoNegativo) AS bancoNegativo, SUM(bancoPositivo) - SUM(bancoNegativo) AS bancoHoras, SUM(horaExtra) AS horaExtra, count(CASE WHEN faltou then 1 end) AS faltas, count(CASE WHEN atestadoHora then 1 end) AS atestadoHora, count(CASE WHEN atestado then 1 end) AS atestadoDias, count(CASE WHEN licenca then 1 end) AS licenca, count(CASE WHEN suspensao then 1 end) AS suspensao, count(CASE WHEN advertenciaEscrita then 1 end) AS advEscrita, count(CASE WHEN advertenciaVerbal then 1 end) AS advVerbal, SUM(atrasoInt) AS atrasoInt, count(CASE WHEN atraso then 1 end) AS atrasoQuantidade, count(CASE WHEN ferias then 1 end) AS ferias from AnotacaoSistemaRhEntity where colaborador = :idColaborador and dataInicio BETWEEN :dataInicio and :dataFinal")
    Object findByDadosAnotacoesTodas(@Param("idColaborador") Long id, @Param("dataInicio") LocalDate dataInicio, @Param("dataFinal") LocalDate dataFinal);
}
