package br.com.grupoqualityambiental.backend.repository.postgres.cadastro;


import br.com.grupoqualityambiental.backend.models.postgres.cadastro.NotificacaoEntityCadastro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface NotificacaoRepository extends JpaRepository<NotificacaoEntityCadastro, Long> {

    List<NotificacaoEntityCadastro> findByColaborador_idfuncionario(Integer id);

    List<NotificacaoEntityCadastro> findByColaborador_idfuncionarioAndStatus(Integer id, boolean b);
}
