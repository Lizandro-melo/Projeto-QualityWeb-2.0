package br.com.grupoqualityambiental.backend.repository.colaborador;

import br.com.grupoqualityambiental.backend.models.colaborador.ContaBancariaColaboradorModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContaBancariaColaboradorRepository extends JpaRepository<ContaBancariaColaboradorModel, Long> {
}
