package br.com.grupoqualityambiental.backend.dto.colaborador.auth;

import br.com.grupoqualityambiental.backend.models.acesso.AcessoModel;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;

public record LoginResponseDTO(String token, InfoColaboradorModel user, AcessoModel acessos) {
}
