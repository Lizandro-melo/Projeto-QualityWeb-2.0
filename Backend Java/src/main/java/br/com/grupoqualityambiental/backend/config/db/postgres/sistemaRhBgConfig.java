package br.com.grupoqualityambiental.backend.config.db.postgres;

import br.com.grupoqualityambiental.backend.repository.postgres.sistemarh.ColaboradorSistemaRhRepository;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "sistemaRhEntityManagerFactory",
        transactionManagerRef = "sistemaRhTrancactionManager",
        basePackageClasses = ColaboradorSistemaRhRepository.class
)
public class sistemaRhBgConfig {

    @Bean(name = "sistemaRhDataSource")
    @ConfigurationProperties(
            prefix = "sistemarh.datasource"
    )
    public HikariDataSource sistemaRhDataSource() {
        return DataSourceBuilder.create().type(HikariDataSource.class).build();
    }

    @Bean(name = "sistemaRhEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean sistemaRhEntityManagerFactory(EntityManagerFactoryBuilder builder, @Qualifier("sistemaRhDataSource") DataSource dataSource){
        return builder.dataSource(dataSource).packages("br.com.grupoqualityambiental.backend.models.postgres.sistemarh").persistenceUnit("sistemaRhPU").build();
    }

    @Bean(name = "sistemaRhTrancactionManager")
    public PlatformTransactionManager sistemaRhTransactionManager(@Qualifier("sistemaRhEntityManagerFactory") EntityManagerFactory entityManagerFactory){
        return new JpaTransactionManager(entityManagerFactory);
    }
}
