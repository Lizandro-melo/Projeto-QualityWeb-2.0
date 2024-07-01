package br.com.grupoqualityambiental.backend.dto.colaborador.ti;

public record RequestClassificarDTO(Integer referentGrupo,
                                    Integer referentCategoria,
                                    Integer referentSubcategoria,
                                    Integer referentSolicitacao,
                                    Integer responsavel,
                                    String observacao) {
}
