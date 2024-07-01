package br.com.grupoqualityambiental.backend.service.rh;

import br.com.grupoqualityambiental.backend.exception.ti.IntegridadeDadosTiException;
import br.com.grupoqualityambiental.backend.models.rh.DocRhModels;
import br.com.grupoqualityambiental.backend.repository.rh.DocRhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreateRhService {

    @Autowired
    private DocRhRepository docRhRepository;
    @Autowired
    private SimpMessagingTemplate brokerMessagingTemplate;

    public String insertDoc(DocRhModels doc) throws IntegridadeDadosTiException {
        switch (doc.getTipo()) {
            case IDENTIDADE:
                if (docRhRepository.findByReferentColaboradorAndTipo(doc.getReferentColaborador(), doc.getTipo()) != null) {
                    throw new IntegridadeDadosTiException("Já existe uma identidade vinculada a este colaborador!");
                }
                break;
            case CPF:
                if (docRhRepository.findByReferentColaboradorAndTipo(doc.getReferentColaborador(), doc.getTipo()) != null) {
                    throw new IntegridadeDadosTiException("Já existe um CPF vinculado a este colaborador!");
                }
                break;
            case CNH:
                if (docRhRepository.findByReferentColaboradorAndTipo(doc.getReferentColaborador(), doc.getTipo()) != null) {
                    throw new IntegridadeDadosTiException("Já existe uma CNH vinculada a este colaborador!");
                }
                break;
            case TITULOELEITOR:
                if (docRhRepository.findByReferentColaboradorAndTipo(doc.getReferentColaborador(), doc.getTipo()) != null) {
                    throw new IntegridadeDadosTiException("Já existe um titulo de eleitor vinculado a este colaborador!");
                }
                break;
            case COMPROVANTERESIDENCIA:
                if (docRhRepository.findByReferentColaboradorAndTipo(doc.getReferentColaborador(), doc.getTipo()) != null) {
                    throw new IntegridadeDadosTiException("Já existe um comprovante de residencia vinculado a este colaborador!");
                }
                break;
        }
        docRhRepository.save(doc);
        return "Documento importado com sucesso";
    }
}
