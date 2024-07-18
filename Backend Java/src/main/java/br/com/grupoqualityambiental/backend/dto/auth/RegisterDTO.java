package br.com.grupoqualityambiental.backend.dto.auth;

import br.com.grupoqualityambiental.backend.enumerated.colaborador.AuthColaboradorEnum;
import br.com.grupoqualityambiental.backend.models.colaborador.EmpresaColaboradorModel;
import br.com.grupoqualityambiental.backend.models.colaborador.SetorColaboradorModel;

import java.time.LocalDate;

public record RegisterDTO(String nomeCompleto, String login, String email, String nCelular, String cep, LocalDate dataNascimento, String tipo, LocalDate dataAdmissao, EmpresaColaboradorModel empresa, SetorColaboradorModel setor) {
}
