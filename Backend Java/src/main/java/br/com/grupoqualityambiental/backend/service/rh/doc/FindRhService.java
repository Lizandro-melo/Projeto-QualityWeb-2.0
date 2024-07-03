package br.com.grupoqualityambiental.backend.service.rh.doc;

import br.com.grupoqualityambiental.backend.models.rh.DocRhModels;
import br.com.grupoqualityambiental.backend.repository.rh.DocRhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FindRhService {

    @Autowired
    private DocRhRepository docRhRepository;

    public List<DocRhModels> getAllDocs(Integer id) {
        return docRhRepository.findByReferentColaborador(id);
    }
}
