package br.com.grupoqualityambiental.backend.service.ti;

import br.com.grupoqualityambiental.backend.dto.ti.RequestClassificarDTO;
import br.com.grupoqualityambiental.backend.dto.ti.RequestMensagemTiDTO;
import br.com.grupoqualityambiental.backend.enumerated.colaborador.SolicitacaoTiEnum;
import br.com.grupoqualityambiental.backend.exception.IntegridadeDadosTiException;
import br.com.grupoqualityambiental.backend.models.ti.ClassificacaoTiModels;
import br.com.grupoqualityambiental.backend.models.ti.MensagemTiModels;
import br.com.grupoqualityambiental.backend.models.ti.SolicitacaoTiModels;
import br.com.grupoqualityambiental.backend.repository.colaborador.InfoColaboradorRepository;
import br.com.grupoqualityambiental.backend.repository.ti.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class CreateTiService {

    @Autowired
    private SolicitacaoTiRepository solicitacaoTiRepository;
    @Autowired
    private MensagemTiRepository mensagemTiRepository;
    @Autowired
    private InfoColaboradorRepository infoColaboradorRepository;
    @Autowired
    private ClassificacaoTiRepository classificacaoTiRepository;
    @Autowired
    private GrupoClassificacaoTiRepository grupoClassificacaoTiRepository;
    @Autowired
    private CategoriaClassificacaoTiRepository categoriaClassificacaoTiRepository;
    @Autowired
    private SubcaregoriaTiRepository subcaregoriaTiRepository;

    public String verificarIntegridadeAndCreateSolicitacao(SolicitacaoTiModels solicitacao) throws IntegridadeDadosTiException {
        if (solicitacao.getTitulo().isEmpty() || solicitacao.getTitulo() == null) {
            throw new IntegridadeDadosTiException("Título em branco!");
        } else if (solicitacao.getOcorrencia().isEmpty() || solicitacao.getOcorrencia() == null) {
            throw new IntegridadeDadosTiException("Ocorrência em branco");
        } else if (solicitacao.getSolicitante() == null) {
            throw new IntegridadeDadosTiException("Ocorreu algum erro no processo de solicitação, contate ao setor de TI");
        } else {
            solicitacao.setStatus(SolicitacaoTiEnum.PENDENTE);
            solicitacao.setDataHora(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
            solicitacaoTiRepository.save(solicitacao);
            return "Solicitação feita com sucesso!";
        }
    }

    public String verficarIntegridadeAndSendMensagem(RequestMensagemTiDTO mensagem) throws IntegridadeDadosTiException {
        if (mensagem.mensagem().isEmpty() || mensagem.mensagem() == null) {
            throw new IntegridadeDadosTiException("Mensagem em branco!");
        } else if (mensagem.responsavel() == null || mensagem.referentSolicitacao() == null || !solicitacaoTiRepository.existsById(mensagem.referentSolicitacao().longValue())) {
            throw new IntegridadeDadosTiException("Ocorreu algum erro no processo de solicitação, contate ao setor de TI");
        } else {
            MensagemTiModels mensagemTiModels = new MensagemTiModels(mensagem);
            SolicitacaoTiModels solicitacao = solicitacaoTiRepository.findById(mensagem.referentSolicitacao().longValue()).get();
            mensagemTiModels.setReferentSolicitacao(solicitacao);
            solicitacao.setStatus(SolicitacaoTiEnum.PENDENTE);
            mensagemTiRepository.save(mensagemTiModels);
            solicitacaoTiRepository.save(solicitacao);
            return "Mensagem enviada com sucesso!";
//            return new MensagemTiDTO(mensagemTiModels, infoColaboradorRepository.findById(mensagem.responsavel().longValue()).get());
        }
    }

    public void verificarIntegridadeAndClassificarTicket(RequestClassificarDTO classificacao) {
        ClassificacaoTiModels classificacaoTiModel =
                new ClassificacaoTiModels();

        if (classificacao.referentGrupo() != null) {
            classificacaoTiModel.setReferentGrupo(grupoClassificacaoTiRepository.findById(classificacao.referentGrupo().longValue()).get());
        }
        if (classificacao.referentCategoria() != null) {
            classificacaoTiModel.setReferentCategoria(categoriaClassificacaoTiRepository.findById(classificacao.referentCategoria().longValue()).get());
        }
        if (classificacao.referentSubcategoria() != null) {
            classificacaoTiModel.setReferentSubcategoria(subcaregoriaTiRepository.findById(classificacao.referentSubcategoria().longValue()).get());
        }
        SolicitacaoTiModels solicitacao =
                solicitacaoTiRepository.findById(classificacao.referentSolicitacao().longValue()).get();
        classificacaoTiModel.setReferentSolicitacao(solicitacao);
        solicitacao.setStatus(SolicitacaoTiEnum.FINALIZADO);
        solicitacao.setDataHoraFinalizado(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        if (!classificacao.observacao().isEmpty()) {
            classificacaoTiModel.setObservacao(classificacao.observacao());
        }
        classificacaoTiModel.setResponsavel(classificacao.responsavel().longValue());
        classificacaoTiModel.setDataHora(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));

        classificacaoTiRepository.save(classificacaoTiModel);
        solicitacaoTiRepository.save(solicitacao);
    }

    public void verificarIntegridadeAndReClassificarTicket(RequestClassificarDTO classificacao) {
        ClassificacaoTiModels classificacaoTiModel =
                new ClassificacaoTiModels();

        if (classificacao.referentGrupo() != null) {
            classificacaoTiModel.setReferentGrupo(grupoClassificacaoTiRepository.findById(classificacao.referentGrupo().longValue()).get());
        }
        if (classificacao.referentCategoria() != null) {
            classificacaoTiModel.setReferentCategoria(categoriaClassificacaoTiRepository.findById(classificacao.referentCategoria().longValue()).get());
        }
        if (classificacao.referentSubcategoria() != null) {
            classificacaoTiModel.setReferentSubcategoria(subcaregoriaTiRepository.findById(classificacao.referentSubcategoria().longValue()).get());
        }
        SolicitacaoTiModels solicitacao =
                solicitacaoTiRepository.findById(classificacao.referentSolicitacao().longValue()).get();
        ClassificacaoTiModels classificacaoExistente = classificacaoTiRepository.findByReferentSolicitacao_id(classificacao.referentSolicitacao());
        if (classificacaoExistente != null) {
            classificacaoTiRepository.delete(classificacaoExistente);
        }
        classificacaoTiModel.setReferentSolicitacao(solicitacao);
        solicitacao.setStatus(SolicitacaoTiEnum.FINALIZADO);
        solicitacao.setDataHoraFinalizado(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        if (!classificacao.observacao().isEmpty()) {
            classificacaoTiModel.setObservacao(classificacao.observacao());
        }
        classificacaoTiModel.setResponsavel(classificacao.responsavel().longValue());
        classificacaoTiModel.setDataHora(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));

        classificacaoTiRepository.save(classificacaoTiModel);
        solicitacaoTiRepository.save(solicitacao);
    }
}
