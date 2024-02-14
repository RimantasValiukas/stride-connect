package lt.valiukas.stride_connect.security;

import lombok.Getter;
import lt.valiukas.stride_connect.user.dto.Role;
import lt.valiukas.stride_connect.user.dto.User;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
public class LoginUser {
    private final UUID id;
    private final String fullName;
    private final String username;
    private final Set<String> roles;

    public LoginUser(User user) {
        id = user.getId();
        fullName = user.getFullName();
        username = user.getUsername();
        roles = user.getRoles().stream()
                .map(Role::getName).collect(Collectors.toSet());
    }
}
