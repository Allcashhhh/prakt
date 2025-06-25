package ua.lpnu.moneyobserver.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ua.lpnu.moneyobserver.dao.UserRepository;
import ua.lpnu.moneyobserver.domain.User;
import ua.lpnu.moneyobserver.domain.enums.Role;

@Component
@RequiredArgsConstructor
public class UserSetup {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void setup() {
        String email = "test@gmail.com";
        if(repository.findByEmail(email) != null) return;
        User user = new User();
        user.setEmail(email);
        user.setName("testUser");
        user.setActive(true);
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode("1234"));
        repository.save(user);
    }
}
