package lt.valiukas.stride_connect.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.valiukas.stride_connect.user.entity.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
    private UUID id;
    private String name;
    private String surname;
    private String phone;
    private String username;
    private String email;
    private Set<Role> roles;
    private String password;
    private String repeatPassword;

    public static User convert(UserEntity entity)
    {
        Set<Role> roles = entity.getRoles()
                .stream()
                .map(Role::convert)
                .collect(Collectors.toSet());

        return new User(entity.getId(),
                entity.getName(),
                entity.getSurname(),
                entity.getPhone(),
                entity.getUsername(),
                entity.getEmail(),
                roles,
                entity.getPassword(),
                null);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public boolean isAccountNonExpired()
    {
        return true;
    }

    @Override
    public boolean isAccountNonLocked()
    {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired()
    {
        return true;
    }

    @Override
    public boolean isEnabled()
    {
        return true;
    }

    public String getFullName()
    {
        return String.format("%s %s", name, surname);
    }
}
