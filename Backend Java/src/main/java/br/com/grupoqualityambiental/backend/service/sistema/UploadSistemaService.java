package br.com.grupoqualityambiental.backend.service.sistema;

import br.com.grupoqualityambiental.backend.models.acesso.AcessoModel;
import br.com.grupoqualityambiental.backend.models.acesso.RhAcessoModel;
import br.com.grupoqualityambiental.backend.models.acesso.TiAcessoModel;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import br.com.grupoqualityambiental.backend.repository.acesso.AcessoRepository;
import br.com.grupoqualityambiental.backend.repository.acesso.RhAcessoRepository;
import br.com.grupoqualityambiental.backend.repository.acesso.TiAcessoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UploadSistemaService {

    @Autowired
    private TiAcessoRepository tiAcessoRepository;
    @Autowired
    private RhAcessoRepository rhAcessoRepository;
    @Autowired
    private AcessoRepository acessoRepository;

    public void updateRolesColaborador(AcessoModel acessoModel) {
        AcessoModel acessoReferent = acessoRepository.findByReferentColaborador(acessoModel.getReferentColaborador());
        if (acessoReferent.getRolesTI() == null && acessoModel.getRolesTI() != null) {
            acessoReferent.setRolesTI(tiAcessoRepository.save(acessoModel.getRolesTI()));
        } else if (acessoModel.getRolesTI() != null) {
            tiAcessoRepository.save(acessoModel.getRolesTI());
        }
        if (acessoReferent.getRolesRH() == null && acessoModel.getRolesRH() != null) {
            acessoReferent.setRolesRH(rhAcessoRepository.save(acessoModel.getRolesRH()));
        } else if (acessoReferent.getRolesRH() != null) {
            rhAcessoRepository.save(acessoModel.getRolesRH());
        }
        acessoRepository.save(acessoReferent);
    }

}
