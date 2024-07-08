package br.com.grupoqualityambiental.backend.models.postgres.sistemarh;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "colaborador"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idColaborador")
public class ColaboradorSistemaRhEntity {

    @Column(
            name = "id_colaborador"
    )
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idColaborador;
    private String nome;
    @Column(
            name = "data_nascimento"
    )
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;
    @Column(
            name = "nome_completo"
    )
    private String nomeCompleto;
    private String tipo;
    @Column(
            name = "data_demissao"
    )
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataDemissao;
    @Column(
            name = "data_admissao"
    )
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataAdmissao;
    @ManyToOne
    @JoinColumn(name = "setor_fk")
    private SetorSistemaRhEntity setor;
    @ManyToOne
    @JoinColumn(name = "empresa_fk")
    private EmpresaSistemaRhEntity empresa;
    @ManyToOne
    @JoinColumn(name = "estagiario_fk")
    private EstagiarioSistemaRhEntity estagiario;
    private Boolean status;
    private String cep;
    @Column(name = "numero_residencial")
    private String numeroResidencial;
    private String telefone;
    private String email;
    private String cpf;
    private String rg;
    @Column(name = "emissor_rg")
    private String emissorRg;
    @Column(name = "titulo_eleitor")
    private String tituloEleitor;
    private String pis;
    @Column(name = "nome_escola")
    private String nomeEscola;
    @Column(name = "cart_trab")
    private String numCarteiraTrab;
    @Column(name = "nome_mae")
    private String nomeMae;
    private Boolean alergia;
    @Column(name = "contato_pessoal_numero")
    private String contatoPessoalNumero;
    @Column(name = "contato_pessoal_telefone")
    private String contatoPessoalTelefone;
    @Column(name = "contato_pessoal_email")
    private String contatoPessoalEmail;
    @Column(name = "contato_emergencia_numero")
    private String contatoEmergenciaNumero;
    @Column(name = "contato_emergencia_nome")
    private String contatoEmergenciaNome;
    @Column(name = "contato_emergencia_email")
    private String contatoEmergenciaEmail;
    @Column(name = "contato_emergencia_telefone")
    private String contatoEmergenciaTelefone;
    @Column(name = "contato_emergencia_numero_2")
    private String contatoEmergenciaNumero2;
    @Column(name = "contato_emergencia_nome_2")
    private String contatoEmergenciaNome2;
    @Column(name = "contato_emergencia_email_2")
    private String contatoEmergenciaEmail2;
    @Column(name = "contato_emergencia_telefone_2")
    private String contatoEmergenciaTelefone2;
    @Column(name = "conta_bancaria_nome")
    private String contaBancariaNome;
    @Column(name = "conta_bancaria_n_agencia")
    private String contaBancariaNumeroAgencia;
    @Column(name = "conta_bancaria_n_conta")
    private String contaBancariaNumeroConta;
    @Column(name = "conta_bancaria_chave_pix")
    private String contaBancariaChavePix;


    public ColaboradorSistemaRhEntity(ColaboradorSistemaRhEntity colaborador) {
        idColaborador = colaborador.getIdColaborador();
        nome = colaborador.getNome();
        dataNascimento = colaborador.getDataNascimento();
        nomeCompleto = colaborador.getNomeCompleto();
        tipo = colaborador.getTipo();
        dataDemissao = colaborador.getDataDemissao();
        dataAdmissao = colaborador.getDataAdmissao();
        setor = colaborador.getSetor();
        empresa = colaborador.getEmpresa();
        estagiario = colaborador.getEstagiario();
        status = colaborador.getStatus();
        cep = colaborador.getCep();
        numeroResidencial = colaborador.getNumeroResidencial();
        telefone = colaborador.getTelefone();
        email = colaborador.getEmail();
        cpf = colaborador.getCpf();
        rg = colaborador.getRg();
        emissorRg = colaborador.getEmissorRg();
        tituloEleitor = colaborador.getTituloEleitor();
        pis = colaborador.getPis();
        nomeEscola = colaborador.getNomeEscola();
        numCarteiraTrab = colaborador.getNumCarteiraTrab();
        nomeMae = colaborador.getNomeMae();
        alergia = colaborador.getAlergia();
    }

    public void updateColaborador(ColaboradorSistemaRhEntity colaborador) {
        tipo = colaborador.getTipo();
    }
}
