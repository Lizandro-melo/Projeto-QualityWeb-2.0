package br.com.grupoqualityambiental.backend.models.postgres.sistemarh;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Table(
        name = "anotacao"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idAnotacao")
public class AnotacaoSistemaRhEntity {

    @Column(
            name = "id_anotacao"
    )
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnotacao;
    private String responsavel;
    private String anotacao;
    private Boolean atestado;
    private Boolean ferias;
    private Boolean faltou;
    private Boolean suspensao;
    private Boolean licenca;
    @Column(
            name = "atestado_hora"
    )
    private Boolean atestadoHora;
    @Column(
            name = "advertencia_escrita"
    )
    private Boolean advertenciaEscrita;
    @Column(
            name = "advertencia_verbal"
    )
    private Boolean advertenciaVerbal;
    @Column(
            name = "hora_extra"
    )
    private Integer horaExtra;
    @Column(
            name = "data_inicio"
    )
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataInicio;
    @Column(
            name = "data_final"
    )
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataFinal;
    @Column(
            name = "data_advertencia_escrita"
    )
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataAdvEscrita;
    @Column(
            name = "banco_positivo"
    )
    private Integer bancoPositivo;
    @Column(
            name = "banco_negativo"
    )
    private Integer bancoNegativo;
    @Column(
            name = "fk_colaborador"
    )
    private Long colaborador;
    private String tipo;
    private String motivo;
    private Boolean atraso;
    private Boolean status;
    @Column(name = "atraso_int")
    private Integer atrasoInt;

    public void updateAnotacao(AnotacaoSistemaRhEntity anotacaoSistemaRhEntity) {
        responsavel = anotacaoSistemaRhEntity.getResponsavel();
        anotacao = anotacaoSistemaRhEntity.getAnotacao();
        atestado = anotacaoSistemaRhEntity.getAtestado();
        ferias = anotacaoSistemaRhEntity.getFerias();
        faltou = anotacaoSistemaRhEntity.getFaltou();
        suspensao = anotacaoSistemaRhEntity.getSuspensao();
        licenca = anotacaoSistemaRhEntity.getLicenca();
        atestadoHora = anotacaoSistemaRhEntity.getAtestadoHora();
        advertenciaEscrita = anotacaoSistemaRhEntity.getAdvertenciaEscrita();
        advertenciaVerbal = anotacaoSistemaRhEntity.getAdvertenciaVerbal();
        horaExtra = anotacaoSistemaRhEntity.getHoraExtra();
        bancoPositivo = anotacaoSistemaRhEntity.getBancoPositivo();
        bancoNegativo = anotacaoSistemaRhEntity.getBancoNegativo();
        colaborador = anotacaoSistemaRhEntity.getColaborador();
        tipo = anotacaoSistemaRhEntity.getTipo();
        motivo = anotacaoSistemaRhEntity.getMotivo();
        atraso = anotacaoSistemaRhEntity.getAtraso();
        atrasoInt = anotacaoSistemaRhEntity.getAtrasoInt();
    }
    
    public void anotacaoDemissao(LocalDate dataDemissao, LocalDate dataAtual, ColaboradorSistemaRhEntity colaborador, String responsavel, String demissaoString){
        anotacao = ("Colaborador foi desligado na data: " +demissaoString);
        dataInicio = dataAtual;
        dataFinal = dataAtual;
        motivo = "DEMISSÃO";
        this.colaborador = colaborador.getIdColaborador();
        tipo = colaborador.getTipo();
        this.responsavel = responsavel;
        status = true;
    }

}
