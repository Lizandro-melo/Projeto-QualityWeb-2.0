package br.com.grupoqualityambiental.backend.repository.postgres.cadastro;


import br.com.grupoqualityambiental.backend.models.postgres.cadastro.VotoEntityCadastro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VotoRepository extends JpaRepository<VotoEntityCadastro, Long> {
    @Query(value = "SELECT COUNT(v.*) from voto v \n" +
            "where candidato = :id", nativeQuery = true)
    Integer contarVotos(@Param("id") Integer id);
}
