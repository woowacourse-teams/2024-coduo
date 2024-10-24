package site.coduo.member.domain;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "MEMBER")
@Entity
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "ACCESS_TOKEN", nullable = false, unique = true)
    private String accessToken;

    @Column(name = "PROVIDER_LOGIN_ID", nullable = false)
    private String loginId;

    @Column(name = "PROVIDER_USER_ID", nullable = false, unique = true)
    private String userId;

    @Column(name = "PROFILE_IMAGE")
    private String profileImage;

    @Column(name = "USER_NAME")
    private String username;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "DELETED_AT")
    private LocalDateTime deletedAt;

    @Builder
    private Member(final String accessToken, final String loginId, final String userId, final String profileImage,
                   final String username, final LocalDateTime deletedAt) {
        this.accessToken = accessToken;
        this.loginId = loginId;
        this.userId = userId;
        this.profileImage = profileImage;
        this.username = username;
        this.deletedAt = deletedAt;
    }

    public void update(final Member other) {
        this.accessToken = other.accessToken;
        this.loginId = other.loginId;
        this.userId = other.userId;
        this.profileImage = other.profileImage;
        this.username = other.username;
        this.deletedAt = other.deletedAt;
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final Member member = (Member) o;
        return Objects.equals(id, member.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Member{" +
               "id=" + id +
               ", accessToken='" + accessToken + '\'' +
               ", loginId='" + loginId + '\'' +
               ", userId='" + userId + '\'' +
               ", profileImage='" + profileImage + '\'' +
               ", username='" + username + '\'' +
               ", deletedAt=" + deletedAt +
               '}';
    }
}
