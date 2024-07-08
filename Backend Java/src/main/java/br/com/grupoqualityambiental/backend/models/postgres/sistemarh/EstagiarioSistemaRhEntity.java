package br.com.grupoqualityambiental.backend.models.postgres.sistemarh;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "estagiario"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idEstagiario")
public class EstagiarioSistemaRhEntity {

    @Column(
            name = "id_estagiario"
    )
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEstagiario;
    @Column(
            name = "data_demissao"
    )
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataDemissao;
    @Column(
            name = "data_admissao"
    )
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataAdmissao;
    @JoinColumn(name = "setor")
    @OneToOne
    private SetorSistemaRhEntity setor;
    @JoinColumn(name = "empresa")
    @OneToOne
    private EmpresaSistemaRhEntity empresa;
    private Boolean status;
}
