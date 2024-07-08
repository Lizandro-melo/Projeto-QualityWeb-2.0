package br.com.grupoqualityambiental.backend.models.postgres.sistemarh;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "setor"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idSetor")
public class SetorSistemaRhEntity {

    @Column(
            name = "id_setor"
    )
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSetor;
    private String nome;

}
