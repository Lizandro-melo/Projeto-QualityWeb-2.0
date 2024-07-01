package br.com.grupoqualityambiental.backend.controller.colaborador;

import br.com.grupoqualityambiental.backend.models.acesso.AcessoModel;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import br.com.grupoqualityambiental.backend.service.colaborador.FindColaboradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "colaborador/find")
public class FindColaboradorController {
    @Autowired
    private FindColaboradorService findColaboradorService;

    @GetMapping(
            path = "/ativos"
    )
    public List<InfoColaboradorModel> getAtivos() {
        return findColaboradorService.getAllColaboradoresAtivos();
    }

    @GetMapping(
            path = "/roles"
    )
    public AcessoModel getRoles(@RequestParam("id") Integer id) {
        return findColaboradorService.GetAcessoById(id);
    }

}
