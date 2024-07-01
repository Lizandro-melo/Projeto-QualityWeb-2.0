package br.com.grupoqualityambiental.backend.service.ti;

import br.com.grupoqualityambiental.backend.dto.colaborador.ti.*;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.SolicitacaoTiEnum;
import br.com.grupoqualityambiental.backend.models.colaborador.InfoColaboradorModel;
import br.com.grupoqualityambiental.backend.models.ti.*;
import br.com.grupoqualityambiental.backend.repository.colaborador.InfoColaboradorRepository;
import br.com.grupoqualityambiental.backend.repository.ti.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FindTiService {

    @Autowired
    private SolicitacaoTiRepository solicitacaoTiRepository;
    @Autowired
    private MensagemTiRepository mensagemTiRepository;
    @Autowired
    private InfoColaboradorRepository infoColaboradorRepository;
    @Autowired
    private GrupoClassificacaoTiRepository grupoClassificacaoTiRepository;
    @Autowired
    private CategoriaClassificacaoTiRepository categoriaClassificacaoTiRepository;
    @Autowired
    private SubcaregoriaTiRepository subcaregoriaTiRepository;
    @Autowired
    private ClassificacaoTiRepository classificacaoTiRepository;

    public List<SolicitacaoTiDTO> getSolicitacoes() {
        List<SolicitacaoTiDTO> solicitacoesTiDTO = new ArrayList<>();
        for (SolicitacaoTiModels solicitacao :
                solicitacaoTiRepository.findAll()) {
            if (solicitacao.getStatus() == SolicitacaoTiEnum.FINALIZADO) {
                continue;
            }
            InfoColaboradorModel solicitante = infoColaboradorRepository.findById(solicitacao.getSolicitante()).get();
            solicitacoesTiDTO.add(new SolicitacaoTiDTO(solicitacao.getId(), solicitante, solicitacao.getDataHora(), solicitacao.getTitulo(), solicitacao.getOcorrencia(), solicitacao.getStatus(), solicitacao.getAnexos(), solicitacao.getDataHoraFinalizado()));
        }
        return solicitacoesTiDTO;
    }

    public List<SolicitacaoTiWithMotivoDTO> getSolicitacoesAll() {
        List<SolicitacaoTiWithMotivoDTO> solicitacoesTiDTO = new ArrayList<>();
        for (SolicitacaoTiModels solicitacao :
                solicitacaoTiRepository.findAll()) {
            InfoColaboradorModel solicitante = infoColaboradorRepository.findById(solicitacao.getSolicitante()).get();
            ClassificacaoTiModels classsificacao = classificacaoTiRepository.findByReferentSolicitacao_id(solicitacao.getId().intValue());
            if (classsificacao != null) {
                solicitacoesTiDTO.add(new SolicitacaoTiWithMotivoDTO(solicitacao.getId(), solicitante, solicitacao.getDataHora(), solicitacao.getTitulo(), solicitacao.getOcorrencia(), solicitacao.getStatus(), solicitacao.getAnexos(), classsificacao.getReferentCategoria().getNome(), solicitacao.getDataHoraFinalizado()));
            } else {
                solicitacoesTiDTO.add(new SolicitacaoTiWithMotivoDTO(solicitacao.getId(), solicitante, solicitacao.getDataHora(), solicitacao.getTitulo(), solicitacao.getOcorrencia(), solicitacao.getStatus(), solicitacao.getAnexos(), null, solicitacao.getDataHoraFinalizado()));
            }
        }
        return solicitacoesTiDTO;
    }

    public List<MensagemTiDTO> getAllMensagens(Integer idSolicitacao) {
        List<MensagemTiDTO> mensagens = new ArrayList<>();
        for (MensagemTiModels mensagem : mensagemTiRepository.findByReferentSolicitacao_id(idSolicitacao.longValue())) {
            MensagemTiDTO mensagemFormatada = new MensagemTiDTO(mensagem, infoColaboradorRepository.findById(mensagem.getResponsavel()).get());
            mensagens.add(mensagemFormatada);
        }
        return mensagens;
    }

    public ResponseSocketSolicitacaoTiDTO responseSocketSolicitacao(SolicitacaoTiDTO solicitacao) {
        List<MensagemTiDTO> mensagens = new ArrayList<>();
        for (MensagemTiModels mensagem : mensagemTiRepository.findByReferentSolicitacao_id(solicitacao.id())) {
            MensagemTiDTO mensagemFormatada = new MensagemTiDTO(mensagem, infoColaboradorRepository.findById(mensagem.getResponsavel()).get());
            mensagens.add(mensagemFormatada);
        }
        return new ResponseSocketSolicitacaoTiDTO(solicitacao, mensagens);
    }

    public SolicitacaoTiDTO getSolicitacao(Integer idSolicitacao) {
        SolicitacaoTiModels solicitacao = solicitacaoTiRepository.findById(idSolicitacao.longValue()).get();
        InfoColaboradorModel solicitante = infoColaboradorRepository.findById(solicitacao.getSolicitante()).get();
        return new SolicitacaoTiDTO(solicitacao.getId(), solicitante, solicitacao.getDataHora(), solicitacao.getTitulo(), solicitacao.getOcorrencia(), solicitacao.getStatus(), solicitacao.getAnexos(), solicitacao.getDataHoraFinalizado());
    }

    public List<GrupoClassificacaoTiModels> findGrupoClassificacao(boolean b) {
        return grupoClassificacaoTiRepository.findAllByStatus(b);
    }

    public List<CategoriaClassificacaoTiModels> findCategoriaClassificacao(Integer idGrupo, boolean b) {
        return categoriaClassificacaoTiRepository.findByReferentGrupo_idAndStatus(idGrupo, b);
    }


    public List<CategoriaClassificacaoTiModels> findCategoriaAll() {
        return categoriaClassificacaoTiRepository.findAll();
    }

    public List<SubcategoriaTiModels> findSubCategoriaClassificacao(Integer idCategoria, boolean b) {
        return subcaregoriaTiRepository.findByReferentCategoria_idAndStatus(idCategoria, b);
    }
}
