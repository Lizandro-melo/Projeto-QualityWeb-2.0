package br.com.grupoqualityambiental.backend;

import br.com.grupoqualityambiental.backend.models.colaborador.AuthColaboradorModel;
import br.com.grupoqualityambiental.backend.repository.colaborador.AuthColaboradorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@SpringBootTest
class NewBackendApplicationTests {
	@Autowired
	private AuthColaboradorRepository authColaboradorRepository;

	@Test
	void encryptedPassAuths() {
		List<AuthColaboradorModel> auths = authColaboradorRepository.findAll();

		for (int i = 0; i < auths.size(); i++) {
			String encryptedPassword =
					new BCryptPasswordEncoder().encode(auths.get(i).getPassword());
			auths.get(i).setPassword(encryptedPassword);
			authColaboradorRepository.save(auths.get(i));
		}
	}

}
