package br.com.grupoqualityambiental.backend.controller.ti;

import br.com.grupoqualityambiental.backend.dto.colaborador.ti.RequestClassificarDTO;
import br.com.grupoqualityambiental.backend.dto.colaborador.ti.RequestMensagemTiDTO;
import br.com.grupoqualityambiental.backend.exception.ti.IntegridadeDadosTiException;
import br.com.grupoqualityambiental.backend.models.ti.SolicitacaoTiModels;
import br.com.grupoqualityambiental.backend.service.ti.CreateTiService;
import br.com.grupoqualityambiental.backend.service.ti.FindTiService;
import br.com.grupoqualityambiental.backend.service.ti.UpdateTiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping(
        path = "suporte/update"
)
public class UpdateTiController {

    @Autowired
    private UpdateTiService updateTiService;

    @DeleteMapping(
            path = "solicitacao"
    )
    public ResponseEntity<String> deleteSolicitacao(@RequestParam(
            "id") Integer idSolicitacao)  {
        return ResponseEntity.ok(updateTiService.deleteSolicitacao(idSolicitacao));
    }
}
