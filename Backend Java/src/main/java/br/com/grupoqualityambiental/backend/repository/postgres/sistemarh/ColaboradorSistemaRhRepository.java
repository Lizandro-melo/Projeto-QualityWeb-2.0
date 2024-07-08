package br.com.grupoqualityambiental.backend.repository.postgres.sistemarh;




import br.com.grupoqualityambiental.backend.models.postgres.sistemarh.ColaboradorSistemaRhEntity;
import br.com.grupoqualityambiental.backend.models.postgres.sistemarh.EmpresaSistemaRhEntity;
import br.com.grupoqualityambiental.backend.models.postgres.sistemarh.SetorSistemaRhEntity;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Qualifier("sistemaRhDataSource")
public interface ColaboradorSistemaRhRepository extends JpaRepository<ColaboradorSistemaRhEntity, Long> {
    List<ColaboradorSistemaRhEntity> findBySetor(SetorSistemaRhEntity setor);

    ColaboradorSistemaRhEntity findByNomeCompleto(String nomeCompleto);

    List<ColaboradorSistemaRhEntity> findByEmpresa(EmpresaSistemaRhEntity empresa);

    List<ColaboradorSistemaRhEntity> findByStatus(boolean b);

    List<ColaboradorSistemaRhEntity> findByEstagiario_Status(boolean b);

    List<ColaboradorSistemaRhEntity> findByStatusAndTipo(boolean b, String contratado);
}
