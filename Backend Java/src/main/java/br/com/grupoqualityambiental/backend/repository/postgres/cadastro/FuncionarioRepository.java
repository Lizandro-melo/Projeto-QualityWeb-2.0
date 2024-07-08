package br.com.grupoqualityambiental.backend.repository.postgres.cadastro;

import br.com.grupoqualityambiental.backend.models.postgres.cadastro.FuncionarioEntityCadastro;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Qualifier("cadastroDataSource")
public interface FuncionarioRepository extends JpaRepository<FuncionarioEntityCadastro, Long> {
    List<FuncionarioEntityCadastro> findByStatus(Integer status);

    List<FuncionarioEntityCadastro> findByLogin(String login);

    FuncionarioEntityCadastro findByLoginAndStatus(String login, Integer status);

    FuncionarioEntityCadastro findByLoginAndSenhaAndStatus(String login, String senha, Integer status);

    FuncionarioEntityCadastro findByNome(String nome);

    List<FuncionarioEntityCadastro> findByRolePrimaryAndStatus(String master, Integer status);
}
