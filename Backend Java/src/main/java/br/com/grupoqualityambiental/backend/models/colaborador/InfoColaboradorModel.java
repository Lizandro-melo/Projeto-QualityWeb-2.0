package br.com.grupoqualityambiental.backend.models.colaborador;

import br.com.grupoqualityambiental.backend.dto.auth.RegisterDTO;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.TipoColaboradorEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Table(name = "info")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "fkAuth")
public class InfoColaboradorModel {
    @Id
    @Column(name = "fk_auth")
    private Long fkAuth;
    @Column(name = "nome_completo")
    private String nomeCompleto;
    private String cpf;
    private String rg;
    @Column(name = "emissor_rg")
    private String emissoRg;
    @Column(name = "n_cart_trab")
    private String nuCarteira;
    private String pis;
    @Column(name = "n_titulo_eleitor")
    private String nuTitulo;
    @Column(name = "nome_mae")
    private String nomeMaterno;
    private String cep;
    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;
    @Column(name = "dir_foto")
    private String dirFoto;
    @Enumerated(EnumType.STRING)
    private TipoColaboradorEnum tipo;

    public InfoColaboradorModel(Long id, String nomeCompleto, TipoColaboradorEnum tipo) {
        this.fkAuth = id;
        this.nomeCompleto = nomeCompleto;
        this.tipo = tipo;
    }

    public InfoColaboradorModel(RegisterDTO register, Long fkAuth) {
        this.fkAuth = fkAuth;
        nomeCompleto = register.nomeCompleto();
        cep = register.cep();
        dataNascimento = register.dataNascimento();
        tipo = TipoColaboradorEnum.valueOf(register.tipo());
    }
}
