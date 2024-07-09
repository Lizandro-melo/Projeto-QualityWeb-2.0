package br.com.grupoqualityambiental.backend.models.rh;


import br.com.grupoqualityambiental.backend.enumerated.colaborador.TipoColaboradorEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Table(name = "anotacao")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class AnotacaoRhModels {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long responsavel;
    @Column(name = "colaborador_referent")
    private Long colaboradorReferent;
    private String anotacao;
    private Boolean atestado;
    private Boolean ferias;
    private Boolean faltou;
    private Boolean suspensao;
    private Boolean licenca;
    @Column(name = "atestado_hora")
    private Boolean atestadoHora;
    @Column(name = "adv_escrita")
    private Boolean advEscrita;
    @Column(name = "adv_verbal")
    private Boolean advVerbal;
    @Column(name = "hora_extra")
    private Float horaExtra;
    @Column(name = "data_inicio")
    private LocalDate dataInicio;
    @Column(name = "data_final")
    private LocalDate dataFinal;
    @Column(name = "adv_escrita_data")
    private LocalDate advEscritaData;
    @Column(name = "banco_positivo")
    private Float bancoPositivo;
    @Column(name = "banco_negativo")
    private Float bancoNegativo;
    @Column(name = "anotacao_tipo")
    @Enumerated(EnumType.STRING)
    private TipoColaboradorEnum tipoAnotacao;
    private String motivo;
    private Boolean atraso;
    @Column(name = "atraso_tempo")
    private Float atrasoTempo;
    private Boolean status;

}
