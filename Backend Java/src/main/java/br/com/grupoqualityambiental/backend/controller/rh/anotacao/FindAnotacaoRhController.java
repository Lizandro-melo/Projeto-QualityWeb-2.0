package br.com.grupoqualityambiental.backend.controller.rh.anotacao;

import br.com.grupoqualityambiental.backend.dto.rh.ResponseFindAnotacaoRhDTO;
import br.com.grupoqualityambiental.backend.service.rh.anotacao.FindAnotacaoRhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping(
        path = "rh/find/anotacao"
)
public class FindAnotacaoRhController {
    @Autowired
    private FindAnotacaoRhService findAnotacaoRhService;

    @GetMapping(
            path = "/filter"
    )
    public ResponseFindAnotacaoRhDTO getAnotacoes(@RequestParam("anotacao") String anotacao, @RequestParam("id") Integer idColaborador, @RequestParam("tipo") String tipo, @RequestParam("status") Boolean status, @RequestParam("dataInicio") LocalDate dataInicio, @RequestParam("dataFim") LocalDate dataFim) {
        return findAnotacaoRhService.getAnotacaoColaborador(anotacao, idColaborador, tipo, status, dataInicio, dataFim);
    }

}
