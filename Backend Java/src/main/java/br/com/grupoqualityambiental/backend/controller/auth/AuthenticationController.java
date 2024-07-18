package br.com.grupoqualityambiental.backend.controller.auth;

import br.com.grupoqualityambiental.backend.config.security.TokenService;
import br.com.grupoqualityambiental.backend.dto.auth.AuthenticationDTO;
import br.com.grupoqualityambiental.backend.dto.auth.LoginResponseDTO;
import br.com.grupoqualityambiental.backend.dto.auth.RegisterDTO;
import br.com.grupoqualityambiental.backend.dto.auth.RevalidateResponseDTO;
import br.com.grupoqualityambiental.backend.dto.essential.ResponseMensagemDTO;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.AuthColaboradorEnum;
import br.com.grupoqualityambiental.backend.exception.IntegridadeDadosException;
import br.com.grupoqualityambiental.backend.models.acesso.AcessoModel;
import br.com.grupoqualityambiental.backend.models.colaborador.AuthColaboradorModel;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import br.com.grupoqualityambiental.backend.repository.acesso.AcessoRepository;
import br.com.grupoqualityambiental.backend.repository.colaborador.AuthColaboradorRepository;
import br.com.grupoqualityambiental.backend.repository.colaborador.InfoColaboradorRepository;
import br.com.grupoqualityambiental.backend.service.auth.AuthorizationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthorizationService authorizationService;
    @Autowired
    private AuthColaboradorRepository authColaboradorRepository;
    @Autowired
    private InfoColaboradorRepository infoColaboradorRepository;
    @Autowired
    private AcessoRepository acessoRepository;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            var login = data.login().toLowerCase();
            var usernamePassword =
                    new UsernamePasswordAuthenticationToken(login,
                            data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            var token =
                    tokenService.generateToken((AuthColaboradorModel) auth.getPrincipal());
            AuthColaboradorModel userAuth =
                    authColaboradorRepository.findByLoginAuth(login);
            Integer contagemLoginAtual = userAuth.getContagemLogin();
            userAuth.setContagemLogin(contagemLoginAtual + 1);
            InfoColaboradorModel user = infoColaboradorRepository.findById(userAuth.getId()).get();
            AcessoModel acessos = acessoRepository.findByReferentColaborador(userAuth.getId().longValue());
            authColaboradorRepository.save(userAuth);
            return ResponseEntity.ok(new LoginResponseDTO(token, user, acessos));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseMensagemDTO(e.getMessage()));
        }

    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody @Valid RegisterDTO data) {
        try {
            return ResponseEntity.ok(authorizationService.register(data));
        } catch (IntegridadeDadosException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(path = "/revalidate")
    public ResponseEntity<Object> revalidadeUser(@RequestParam(name = "token") String token) {
        if (tokenService.validateToken(token) == null) {
            return ResponseEntity.badRequest().build();
        }
        AuthColaboradorModel userAuth = authColaboradorRepository.findByLoginAuth(tokenService.validateToken(token));
        InfoColaboradorModel user = infoColaboradorRepository.findById(userAuth.getId()).get();
        AcessoModel acessos = acessoRepository.findByReferentColaborador(userAuth.getId().longValue());
        return ResponseEntity.ok(new RevalidateResponseDTO(user, acessos));

    }
}
