package br.com.grupoqualityambiental.backend.service.auth;

import br.com.grupoqualityambiental.backend.dto.auth.RegisterDTO;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.AuthColaboradorEnum;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.TipoColaboradorEnum;
import br.com.grupoqualityambiental.backend.exception.IntegridadeDadosException;
import br.com.grupoqualityambiental.backend.models.colaborador.*;
import br.com.grupoqualityambiental.backend.repository.colaborador.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    private AuthColaboradorRepository authColaboradorRepository;
    @Autowired
    private InfoColaboradorRepository infoColaboradorRepository;
    @Autowired
    private InfoCLTColaboradorRepository infoCLTColaboradorRepository;
    @Autowired
    private InfoEstagiarioColaboradorRepository infoEstagiarioColaboradorRepository;
    @Autowired
    private InfoMEIColaboradorRepository infoMEIColaboradorRepository;
    @Autowired
    private ContatoColaboradorRepository contatoColaboradorRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return authColaboradorRepository.findByLogin(username);
    }

    public String register(RegisterDTO register) throws IntegridadeDadosException {
        //Criar o usuario de login
        if (authColaboradorRepository.findByLogin(register.login().toLowerCase()) != null)
            throw new IntegridadeDadosException("Login já existente em nosso banco de dados!");
        String encryptedPassword = new BCryptPasswordEncoder().encode("12345678");
        AuthColaboradorModel newUser = new AuthColaboradorModel(register.login(), encryptedPassword,
                AuthColaboradorEnum.USER, true);
        authColaboradorRepository.save(newUser);
        //Dados do usuario
        InfoColaboradorModel infoColaborador = new InfoColaboradorModel(register, newUser.getId());
        infoColaboradorRepository.save(infoColaborador);
        ContatoColaboradorModel contatoColaborador = new ContatoColaboradorModel(register, infoColaborador);
        contatoColaboradorRepository.save(contatoColaborador);
        TipoColaboradorEnum tipoConvertido = TipoColaboradorEnum.valueOf(register.tipo());
        switch (tipoConvertido) {
            case CLT:
                InfoCLTColaboradorModel infoCLT = new InfoCLTColaboradorModel(register, newUser.getId().intValue());
                infoCLTColaboradorRepository.save(infoCLT);
                break;

            case ESTAGIARIO:
                InfoEstagiarioColaboradorModel infoEstagiario = new InfoEstagiarioColaboradorModel(register, newUser.getId().intValue());
                infoEstagiarioColaboradorRepository.save(infoEstagiario);
                break;
            case TERCEIRIZADO:
                InfoMEIColaboradorModel infoMEI = new InfoMEIColaboradorModel(register, newUser.getId().intValue());
                infoMEIColaboradorRepository.save(infoMEI);
                break;
        }
        return "Colaborador cadastrado com sucesso!";

    }

}
