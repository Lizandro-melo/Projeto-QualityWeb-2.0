package br.com.grupoqualityambiental.backend.models.colaborador;


import br.com.grupoqualityambiental.backend.serial.colaborador.InfoCLTColaboradorId;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Table(name = "info_estagiario")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class InfoEstagiarioColaboradorModel {
    @EmbeddedId
    private InfoCLTColaboradorId id;
    @Column(name = "data_admissao")
    private LocalDate dataAdmissao;
    @Column(name = "data_demissao")
    private LocalDate dataDemissao;
    @JoinColumn(name = "fk_empresa")
    @OneToOne
    private EmpresaColaboradorModel empresa;
    @JoinColumn(name = "fk_setor")
    @OneToOne
    private EmpresaColaboradorModel setor;
    private Boolean status;
}

