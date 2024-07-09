package br.com.grupoqualityambiental.backend.service.rh.anotacao;

import br.com.grupoqualityambiental.backend.repository.colaborador.InfoColaboradorRepository;
import br.com.grupoqualityambiental.backend.repository.rh.AnotacaoRhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateAnotacaoRhService {

    @Autowired
    private InfoColaboradorRepository infoColaboradorRepository;
    @Autowired
    private AnotacaoRhRepository anotacaoRhRepository;

}
