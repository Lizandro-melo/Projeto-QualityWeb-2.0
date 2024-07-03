package br.com.grupoqualityambiental.backend.controller.rh.doc;

import br.com.grupoqualityambiental.backend.exception.ti.IntegridadeDadosTiException;
import br.com.grupoqualityambiental.backend.models.rh.DocRhModels;
import br.com.grupoqualityambiental.backend.service.rh.doc.CreateRhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(
        path = "rh/create"
)
public class CreateRhController {

    @Autowired
    private CreateRhService createRhService;


    @PostMapping(
            path = "doc"
    )
    public ResponseEntity<String> getAllDocsColaborador(@RequestBody DocRhModels doc) {
        try {
            return ResponseEntity.ok(createRhService.insertDoc(doc));
        } catch (IntegridadeDadosTiException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
