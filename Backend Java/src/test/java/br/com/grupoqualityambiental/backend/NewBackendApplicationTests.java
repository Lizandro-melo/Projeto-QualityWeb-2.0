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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.List;
import java.util.Objects;

@SpringBootTest
class NewBackendApplicationTests {
    @Autowired
    private AuthColaboradorRepository authColaboradorRepository;
    @Autowired
    private InfoColaboradorRepository infoColaboradorRepository;

    static final Runtime run = Runtime.getRuntime();
    static Process pro;
    static BufferedReader read;

    public static final String RED = "\033[0;31m";
    public static final String ANSI_RESET = "\u001B[0m";

    @Test
    void encryptedPassAuths() {

    }



    private static void showFB() throws IOException {
        read = new BufferedReader(new InputStreamReader(pro.getInputStream()));
        System.out.println(read.readLine());
    }


    @Test
    void ExecComando() throws IOException {
        String Start = "shutdown -s -t 00";

        try {
            pro = run.exec(Start);
            showFB();

            OutputStream out = pro.getOutputStream();

            out.write("cd C:/ ".getBytes());
            out.flush();
            showFB();

            out.close();
        } catch (Exception e) {
            System.err.println(e);
        }
    }

}
