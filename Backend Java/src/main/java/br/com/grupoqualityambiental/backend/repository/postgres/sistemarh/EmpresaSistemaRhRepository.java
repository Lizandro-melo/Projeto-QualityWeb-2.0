package br.com.grupoqualityambiental.backend.repository.postgres.sistemarh;


import br.com.grupoqualityambiental.backend.models.postgres.sistemarh.EmpresaSistemaRhEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaSistemaRhRepository extends JpaRepository<EmpresaSistemaRhEntity, Long> {
}
