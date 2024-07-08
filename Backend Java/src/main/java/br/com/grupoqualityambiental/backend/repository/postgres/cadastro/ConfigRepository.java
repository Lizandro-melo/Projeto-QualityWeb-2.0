package br.com.grupoqualityambiental.backend.repository.postgres.cadastro;

import br.com.grupoqualityambiental.backend.models.postgres.cadastro.ConfigVoteEntityCadastro;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfigRepository extends JpaRepository<ConfigVoteEntityCadastro,
        Long> {
}
