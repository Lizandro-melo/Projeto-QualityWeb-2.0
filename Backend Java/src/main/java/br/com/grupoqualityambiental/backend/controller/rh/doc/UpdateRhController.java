package br.com.grupoqualityambiental.backend.controller.rh.doc;

import br.com.grupoqualityambiental.backend.dto.rh.SubstituirDocRhDTO;
import br.com.grupoqualityambiental.backend.models.rh.DocRhModels;
import br.com.grupoqualityambiental.backend.service.rh.doc.UpdateRhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(
        path = "rh/update"
)
public class UpdateRhController {
    @Autowired
    private UpdateRhService updateRhService;


    @PostMapping(
            path = "doc"
    )
    public ResponseEntity<String> updateDocPasta(@RequestParam("file") MultipartFile file,
                                                 @RequestParam(
                                                         "dir") String dir) {
        return ResponseEntity.ok(updateRhService.updateDocPasta(file, dir));
    }

    @PostMapping(
            path = "substituir/doc"
    )
    public ResponseEntity<String> subDocRh(@RequestBody SubstituirDocRhDTO docs) {
        return ResponseEntity.ok(updateRhService.substituirDocExistente(docs));
    }
}
