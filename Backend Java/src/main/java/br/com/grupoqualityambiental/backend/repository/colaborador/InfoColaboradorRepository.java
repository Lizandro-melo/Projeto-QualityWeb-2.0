package br.com.grupoqualityambiental.backend.repository.colaborador;

import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoColaboradorRepository extends JpaRepository<InfoColaboradorModel, Long> {
}
