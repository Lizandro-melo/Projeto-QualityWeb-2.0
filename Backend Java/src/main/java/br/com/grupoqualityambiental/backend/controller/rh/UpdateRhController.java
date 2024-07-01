package br.com.grupoqualityambiental.backend.controller.rh;

import br.com.grupoqualityambiental.backend.service.rh.UpdateRhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
}
