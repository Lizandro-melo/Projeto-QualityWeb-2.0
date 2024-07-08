package br.com.grupoqualityambiental.backend.models.postgres.cadastro;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "config_voto"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class ConfigVoteEntityCadastro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "datahora_inicio")
    private LocalDateTime dataInicio;
    @Column(name = "datahora_final")
    private LocalDateTime dataFinal;

}
