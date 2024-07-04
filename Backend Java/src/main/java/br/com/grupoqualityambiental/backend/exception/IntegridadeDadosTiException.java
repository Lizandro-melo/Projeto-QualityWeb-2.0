package br.com.grupoqualityambiental.backend.exception;

import br.com.grupoqualityambiental.backend.dto.rh.TipoDocRhDTO;
import br.com.grupoqualityambiental.backend.models.rh.DocRhModels;

public class IntegridadeDadosTiException extends Exception {
    public IntegridadeDadosTiException(String msg) {
        super(msg);
    }
}
