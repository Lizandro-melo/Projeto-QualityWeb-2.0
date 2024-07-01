package br.com.grupoqualityambiental.backend.repository.colaborador;

import br.com.grupoqualityambiental.backend.models.colaborador.InfoCLTColaboradorModel;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoCLTColaboradorRepository extends JpaRepository<InfoCLTColaboradorModel, InfoColaboradorModel> {
}
