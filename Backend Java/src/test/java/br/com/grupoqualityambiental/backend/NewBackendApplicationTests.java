package br.com.grupoqualityambiental.backend;

import br.com.grupoqualityambiental.backend.enumerated.colaborador.AuthColaboradorEnum;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.TipoColaboradorEnum;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.TipoDocRhEnum;
import br.com.grupoqualityambiental.backend.models.colaborador.AuthColaboradorModel;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;

import br.com.grupoqualityambiental.backend.repository.colaborador.AuthColaboradorRepository;
import br.com.grupoqualityambiental.backend.repository.colaborador.InfoColaboradorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Objects;

@SpringBootTest
class NewBackendApplicationTests {
    @Autowired
    private AuthColaboradorRepository authColaboradorRepository;
    @Autowired
    private InfoColaboradorRepository infoColaboradorRepository;

    public static final String RED = "\033[0;31m";
    public static final String ANSI_RESET = "\u001B[0m";

    @Test
    void encryptedPassAuths() {

    }



}
