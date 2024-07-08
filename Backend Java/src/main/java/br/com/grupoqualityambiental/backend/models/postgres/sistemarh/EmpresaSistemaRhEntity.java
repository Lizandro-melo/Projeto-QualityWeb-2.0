package br.com.grupoqualityambiental.backend.models.postgres.sistemarh;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "empresa"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idEmpresa")
public class EmpresaSistemaRhEntity {

    @Column(
            name = "id_empresa"
    )
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmpresa;
    private String nome;
}
