package ua.lpnu.moneyobserver.email.lisener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import ua.lpnu.moneyobserver.domain.User;
import ua.lpnu.moneyobserver.email.RegistrationCompleteEvent;
import ua.lpnu.moneyobserver.service.UserService;

@Slf4j
@EnableAsync
@Component
@RequiredArgsConstructor
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {

    private final UserService userService;

    @Async
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        User user = event.getUser();

        // ✅ Активуємо користувача
        user.setEnabled(true); // або інше поле, якщо воно відповідає за активацію

        // ✅ Зберігаємо через UserService
        userService.createNewUser(user);

        log.info("User {} has been registered and activated without email verification", user.getUsername());
    }
}
