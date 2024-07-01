package br.com.grupoqualityambiental.backend.service.rh;

import br.com.grupoqualityambiental.backend.repository.rh.DocRhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class UpdateRhService {
    @Autowired
    private DocRhRepository docRhRepository;

    public String updateDocPasta(MultipartFile file,
                                 String dir) {
        try {
            File theDir = new File(dir);
            if (!theDir.exists()) {
                theDir.mkdir();
            }
            String filePath = dir + "/" + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            return file.getOriginalFilename();
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return "";
        }
    }
}
