package br.com.grupoqualityambiental.backend.service.colaborador;

import br.com.grupoqualityambiental.backend.models.acesso.AcessoModel;
import br.com.grupoqualityambiental.backend.models.colaborador.AuthColaboradorModel;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import br.com.grupoqualityambiental.backend.repository.acesso.AcessoRepository;
import br.com.grupoqualityambiental.backend.repository.colaborador.AuthColaboradorRepository;
import br.com.grupoqualityambiental.backend.repository.colaborador.InfoColaboradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FindColaboradorService {
    @Autowired
    private InfoColaboradorRepository infoColaboradorRepository;
    @Autowired
    private AuthColaboradorRepository authColaboradorRepository;
    @Autowired
    private AcessoRepository acessoRepository;

    public List<InfoColaboradorModel> getAllColaboradoresAtivos() {
        List<InfoColaboradorModel> listColaboradoresAtivos = new ArrayList<>();
        for (AuthColaboradorModel auth : authColaboradorRepository.findByStatus(true)) {
            try {
                listColaboradoresAtivos.add(infoColaboradorRepository.findById(auth.getId()).get());
            } catch (Exception e) {

            }
        }
        return listColaboradoresAtivos;
    }

    public AcessoModel GetAcessoById(Integer id) {
        return acessoRepository.findByReferentColaborador(id.longValue());
    }
}
