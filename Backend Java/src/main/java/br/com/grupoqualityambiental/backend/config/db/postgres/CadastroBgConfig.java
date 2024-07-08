package br.com.grupoqualityambiental.backend.config.db.postgres;

import br.com.grupoqualityambiental.backend.repository.postgres.cadastro.FuncionarioRepository;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackageClasses = FuncionarioRepository.class,
        transactionManagerRef = "cadastroTransactionManager",
        entityManagerFactoryRef = "cadastroEntityManagerFactory"
)
public class CadastroBgConfig {


    @Bean(name = "cadastroDataSource")
    @ConfigurationProperties(
            prefix = "cadastro.datasource"
    )
    public HikariDataSource cadastroDataSource() {
        return DataSourceBuilder.create().type(HikariDataSource.class).build();
    }


    @Bean(name = "cadastroEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean cadastroEntityManagerFactory(EntityManagerFactoryBuilder builder, @Qualifier("cadastroDataSource") DataSource dataSource) {
        return builder.dataSource(dataSource).packages("br.com.grupoqualityambiental.backend.models.postgres.cadastro").persistenceUnit("cadastroPU").build();
    }

    @Bean(name = "cadastroTransactionManager")
    public PlatformTransactionManager cadastroTransactionManager(@Qualifier("cadastroEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }

}
