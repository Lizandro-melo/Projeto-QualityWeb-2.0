package br.com.grupoqualityambiental.backend.models.colaborador;


import br.com.grupoqualityambiental.backend.dto.auth.RegisterDTO;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.ContatoColaboradorEnum;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "contato")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class ContatoColaboradorModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "fk_auth")
    @ManyToOne
    private InfoColaboradorModel colaboradorReferent;
    @Enumerated(EnumType.STRING)
    private ContatoColaboradorEnum tipo;
    @Column(name = "numero_celular")
    private String nCelular;
    @Column(name = "numero_fixo")
    private String nFixo;
    private String email;

    public ContatoColaboradorModel(RegisterDTO register, InfoColaboradorModel infoColaborador){
        colaboradorReferent = infoColaborador;
        tipo = ContatoColaboradorEnum.PESSOAL;
        nCelular = register.nCelular();
        email = register.email();
    }

}
