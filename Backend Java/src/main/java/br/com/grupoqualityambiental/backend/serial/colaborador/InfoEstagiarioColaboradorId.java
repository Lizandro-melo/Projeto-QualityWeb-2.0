package br.com.grupoqualityambiental.backend.serial.colaborador;

import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class InfoEstagiarioColaboradorId implements Serializable {
    @OneToOne
    @JoinColumn(name = "fk_auth")
    private InfoColaboradorModel colaboradorReferent;
}
