package br.com.grupoqualityambiental.backend.dto.auth;

import br.com.grupoqualityambiental.backend.enumerated.colaborador.AuthColaboradorEnum;

public record RegisterDTO(String login, String password,
                          AuthColaboradorEnum role, boolean alterPass) {
}
