package br.com.grupoqualityambiental.backend;

import br.com.grupoqualityambiental.backend.enumerated.colaborador.AuthColaboradorEnum;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.TipoColaboradorEnum;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.TipoDocRhEnum;
import br.com.grupoqualityambiental.backend.models.colaborador.AuthColaboradorModel;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import br.com.grupoqualityambiental.backend.models.postgres.cadastro.ColaboradorMesEntityCadastro;
import br.com.grupoqualityambiental.backend.models.postgres.cadastro.FuncionarioEntityCadastro;
import br.com.grupoqualityambiental.backend.models.postgres.sistemarh.ColaboradorSistemaRhEntity;
import br.com.grupoqualityambiental.backend.repository.colaborador.AuthColaboradorRepository;
import br.com.grupoqualityambiental.backend.repository.colaborador.InfoColaboradorRepository;
import br.com.grupoqualityambiental.backend.repository.postgres.cadastro.FuncionarioRepository;
import br.com.grupoqualityambiental.backend.repository.postgres.sistemarh.ColaboradorSistemaRhRepository;
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
    private FuncionarioRepository funcionarioRepository;
    @Autowired
    private ColaboradorSistemaRhRepository colaboradorSistemaRhRepository;
    @Autowired
    private InfoColaboradorRepository infoColaboradorRepository;

    public static final String RED = "\033[0;31m";
    public static final String ANSI_RESET = "\u001B[0m";

    @Test
    void encryptedPassAuths() {

        for (FuncionarioEntityCadastro funcionarioIntranet : funcionarioRepository.findByStatus(1)) {
            String encryptedPassword = new BCryptPasswordEncoder().encode(funcionarioIntranet.getSenha());
            AuthColaboradorModel authColaborador = new AuthColaboradorModel(funcionarioIntranet.getIdfuncionario(), funcionarioIntranet.getLogin(), encryptedPassword, true, 0, AuthColaboradorEnum.USER, false);
            if (authColaboradorRepository.findByLoginAuth(authColaborador.getLogin()) != null) {
                authColaborador.setLogin(authColaborador.getLogin() + 1);
                authColaboradorRepository.save(authColaborador);
                System.out.println("Colaborador: (" + authColaborador.getLogin() + ") Teve o login alteredo por duplicidade");
                continue;
            } else {
                authColaboradorRepository.save(authColaborador);
                System.out.println("Colaborador: (" + authColaborador.getLogin() + ") Cadastrado!");
            }

        }
    }


    @Test
    void CadastrarInfo() {
        for (ColaboradorSistemaRhEntity colaboradorRh : colaboradorSistemaRhRepository.findAll()) {
            if (!Objects.equals(colaboradorRh.getTipo(), "DESLIGADO")) {
                String nomeSobrenome = colaboradorRh.getNomeCompleto().toLowerCase().split(" ")[0] + " " + colaboradorRh.getNomeCompleto().toLowerCase().split(" ")[colaboradorRh.getNomeCompleto().toLowerCase().split(" ").length - 1];
                for (AuthColaboradorModel authExistente : authColaboradorRepository.findByStatus(true)) {
                    if (Objects.equals(nomeSobrenome, authExistente.getLogin())) {
                        TipoColaboradorEnum tipo = switch (colaboradorRh.getTipo()) {
                            case "CONTRATADO" -> TipoColaboradorEnum.CLT;
                            case "ESTAGIARIO" -> TipoColaboradorEnum.ESTAGIARIO;
                            case "TERCEIRIZADO" -> TipoColaboradorEnum.TERCEIRIZADO;
                            default -> null;
                        };
                        InfoColaboradorModel cadastrarInfoColaborador = new InfoColaboradorModel(authExistente.getId(), colaboradorRh.getNomeCompleto().toUpperCase(), tipo);
                        infoColaboradorRepository.save(cadastrarInfoColaborador);
//                        System.out.println(colaboradorRh.getNomeCompleto() + " Colaborador cadastrado!");
                    } else {
                        System.out.println(nomeSobrenome + " != " + authExistente.getLogin());
                    }
                }
            }
        }

    }

}
