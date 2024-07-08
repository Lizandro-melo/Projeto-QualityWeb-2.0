package br.com.grupoqualityambiental.backend.models.postgres.cadastro;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "colaborador_mes"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class ColaboradorMesEntityCadastro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "idcolaborador")
    private Long idColaborador;
    private String nome;
}
