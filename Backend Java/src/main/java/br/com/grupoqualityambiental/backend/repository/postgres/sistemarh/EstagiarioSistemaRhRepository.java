package br.com.grupoqualityambiental.backend.repository.postgres.sistemarh;


import br.com.grupoqualityambiental.backend.models.postgres.sistemarh.EstagiarioSistemaRhEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstagiarioSistemaRhRepository extends JpaRepository<EstagiarioSistemaRhEntity, Long> {
}
