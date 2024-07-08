package br.com.grupoqualityambiental.backend.models.postgres.cadastro;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "voto"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class VotoEntityCadastro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "candidato")
    @ManyToOne
    private ColaboradorMesEntityCadastro candidato;
    private String motivo;
    @JoinColumn(name = "eleitor")
    @OneToOne
    private FuncionarioEntityCadastro eleitor;
    private LocalDateTime datahora;
}
