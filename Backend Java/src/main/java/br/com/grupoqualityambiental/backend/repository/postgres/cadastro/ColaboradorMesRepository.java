package br.com.grupoqualityambiental.backend.repository.postgres.cadastro;

import br.com.grupoqualityambiental.backend.models.postgres.cadastro.ColaboradorMesEntityCadastro;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ColaboradorMesRepository extends JpaRepository<ColaboradorMesEntityCadastro, Long> {
}
