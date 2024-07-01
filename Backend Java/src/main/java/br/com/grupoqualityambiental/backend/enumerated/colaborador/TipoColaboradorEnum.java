package br.com.grupoqualityambiental.backend.enumerated.colaborador;

public enum TipoColaboradorEnum {
    CLT("clt"),
    ESTAGIARIO("estagiario"),
    TERCEIRIZADO("terceirizado"),
    ;

    private String tipo;

    TipoColaboradorEnum(String role) {
        this.tipo = role;
    }

    public String getRole() {
        return this.tipo;
    }
}
