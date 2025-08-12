package DumbFlix.DumbFlix_BE.entity.user;


import java.util.List;

import DumbFlix.DumbFlix_BE.entity.subsPayment.Subscription;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    private String address;

    private String gender;

    private String image;

    @OneToMany(mappedBy = "user")
    private List<Subscription> subscriptions;

    @Enumerated(EnumType.STRING)
    private Status status = Status.NotActive;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
}
