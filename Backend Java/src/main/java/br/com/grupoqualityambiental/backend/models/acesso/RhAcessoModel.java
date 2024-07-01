package br.com.grupoqualityambiental.backend.models.acesso;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "rh")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class RhAcessoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean delegado;
}
