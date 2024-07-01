package br.com.grupoqualityambiental.backend.controller.ti;

import br.com.grupoqualityambiental.backend.dto.colaborador.ti.RequestClassificarDTO;
import br.com.grupoqualityambiental.backend.dto.colaborador.ti.RequestMensagemTiDTO;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.SolicitacaoTiEnum;
import br.com.grupoqualityambiental.backend.exception.ti.IntegridadeDadosTiException;
import br.com.grupoqualityambiental.backend.models.ti.ClassificacaoTiModels;
import br.com.grupoqualityambiental.backend.models.ti.MensagemTiModels;
import br.com.grupoqualityambiental.backend.models.ti.SolicitacaoTiModels;
import br.com.grupoqualityambiental.backend.repository.ti.SolicitacaoTiRepository;
import br.com.grupoqualityambiental.backend.service.ti.CreateTiService;
import br.com.grupoqualityambiental.backend.service.ti.FindTiService;
import br.com.grupoqualityambiental.backend.service.websocket.SocketTiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping(
        path = "suporte/create"
)
public class CreateTiController {

    @Autowired
    private FindTiService findTiService;
    @Autowired
    private CreateTiService createTiService;
    @Autowired
    private SolicitacaoTiRepository solicitacaoTiRepository;


    @PostMapping(
            path = "solicitacao"
    )
    public ResponseEntity<String> createSolicitacao(@RequestBody SolicitacaoTiModels requestSolicitacao) throws IntegridadeDadosTiException {
        try {
            return ResponseEntity.ok(createTiService.verificarIntegridadeAndCreateSolicitacao(requestSolicitacao));
        } catch (IntegridadeDadosTiException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(
            path = "mensagem"
    )
    public ResponseEntity<String> createMensagem(@RequestBody RequestMensagemTiDTO request) throws IntegridadeDadosTiException {
        try {
            return ResponseEntity.ok(createTiService.verficarIntegridadeAndSendMensagem(request));
        } catch (IntegridadeDadosTiException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(
            path = "classificar"
    )
    public ResponseEntity<String> classificarTicket(@RequestBody RequestClassificarDTO classificacao) {
        createTiService.verificarIntegridadeAndClassificarTicket(classificacao);
        return ResponseEntity.ok("Solicitação finalizada com " +
                "sucesso");
    }

    @PostMapping(
            path = "reclassificar"
    )
    public ResponseEntity<String> reclassificarTicket(@RequestBody RequestClassificarDTO classificacao) {
        createTiService.verificarIntegridadeAndReClassificarTicket(classificacao);
        return ResponseEntity.ok("Solicitação reclassificada com " +
                "sucesso");
    }


    @PostMapping(
            path = "finalizar"
    )
    public ResponseEntity<String> finalizarTicket(@RequestBody RequestClassificarDTO classificacao) {
        SolicitacaoTiModels solicitacao =
                solicitacaoTiRepository.findById(classificacao.referentSolicitacao().longValue()).get();
        solicitacao.setStatus(SolicitacaoTiEnum.FINALIZADO);
        solicitacao.setDataHoraFinalizado(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        solicitacaoTiRepository.save(solicitacao);
        return ResponseEntity.ok("Solicitação finalizada com " +
                "sucesso");
    }

    @PostMapping(
            path = "update/files"
    )
    public ResponseEntity<String> updateFiles(@RequestParam("file") MultipartFile file,
                                              @RequestParam(
                                                      "dir") String dir) {
        try {
            String filePath = dir + "/" + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            return ResponseEntity.ok(file.getOriginalFilename());
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("");
        }
    }

}
