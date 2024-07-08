package br.com.grupoqualityambiental.backend.repository.postgres.sistemarh;


import br.com.grupoqualityambiental.backend.models.postgres.sistemarh.SetorSistemaRhEntity;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Qualifier("sistemaRhDataSource")
public interface SetorSistemaRhRepository extends JpaRepository<SetorSistemaRhEntity,Long> {

    List<SetorSistemaRhEntity> findByNome(String setor);
}
