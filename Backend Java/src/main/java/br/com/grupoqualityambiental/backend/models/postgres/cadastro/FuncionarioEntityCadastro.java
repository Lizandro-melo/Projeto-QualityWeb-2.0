package br.com.grupoqualityambiental.backend.models.postgres.cadastro;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "funcionario"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idfuncionario")
public class FuncionarioEntityCadastro {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idfuncionario;
    private String nome;
    private String sobrenome;
    private String setor;
    private String login;
    private String senha;
    private Integer status;
    private Integer nivel;
    private String foto;
    private String empresa;
    private String dia;
    private String mes;
    private String admissao;
    @Column(
            name = "role_primary"
    )
    private String rolePrimary;
    @Column(
            name = "role_secondary"
    )
    private String roleSecondary;
    private boolean adm;
    private String tipo;
    @Column(
            name = "pedidos_musica"
    )
    private Integer pedidosMusica;
    @Column(
            name = "data_musica"
    )
    private LocalDate dataMusica;
    @Column(
            name = "primeiro_login"
    )
    private Boolean primeiroLogin;

    public void updateColaborador(FuncionarioEntityCadastro colaborador){
        senha = colaborador.getSenha();
        foto = colaborador.getFoto();
        empresa = colaborador.getEmpresa();
        dia = colaborador.getDia();
        mes = colaborador.getMes();
        rolePrimary = colaborador.getRolePrimary();
        roleSecondary = colaborador.getRoleSecondary();
        tipo = colaborador.getTipo();
        setor = colaborador.getSetor();
    }

    public void addCountMusica(){
        pedidosMusica++;
        return;
    }
}
