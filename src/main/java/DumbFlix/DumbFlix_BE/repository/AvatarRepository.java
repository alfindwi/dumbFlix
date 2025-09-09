package DumbFlix.DumbFlix_BE.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.avatar.Avatar;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {
}
