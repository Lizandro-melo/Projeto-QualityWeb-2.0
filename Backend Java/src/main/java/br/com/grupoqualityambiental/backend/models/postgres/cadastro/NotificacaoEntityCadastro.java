package br.com.grupoqualityambiental.backend.models.postgres.cadastro;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
@Table(
        name = "notificacao"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class NotificacaoEntityCadastro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mensagem;
    private LocalDateTime datahora;
    @JoinColumn(name = "fk_colaborador")
    @ManyToOne
    private FuncionarioEntityCadastro colaborador;
    private Boolean status;
    private String tipo;

    public void mensagemEstoqueItemDisponivel(FuncionarioEntityCadastro solicitante) {
        colaborador = solicitante;
        mensagem = "Itens solicitados já disponiveis!";
        datahora = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        status = true;
        tipo = "estoque";
    }
}
