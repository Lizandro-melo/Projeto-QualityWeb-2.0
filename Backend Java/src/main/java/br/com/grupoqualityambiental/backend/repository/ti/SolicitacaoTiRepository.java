package br.com.grupoqualityambiental.backend.repository.ti;

import br.com.grupoqualityambiental.backend.enumerated.colaborador.SolicitacaoTiEnum;
import br.com.grupoqualityambiental.backend.models.ti.CategoriaClassificacaoTiModels;
import br.com.grupoqualityambiental.backend.models.ti.SolicitacaoTiModels;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitacaoTiRepository extends JpaRepository<SolicitacaoTiModels, Long> {
    Iterable<? extends SolicitacaoTiModels> findAllByStatus(SolicitacaoTiEnum status);
}
