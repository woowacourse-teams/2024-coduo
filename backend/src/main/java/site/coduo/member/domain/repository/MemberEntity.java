package site.coduo.member.domain.repository;

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
public class MemberEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "PROVIDER_ACCESS_TOKEN", nullable = false, unique = true)
    private String providerAccessToken;

    @Column(name = "PROVIDER_LOGIN_ID", nullable = false)
    private String providerLoginId;

    @Column(name = "PROVIDER_USER_ID", nullable = false, unique = true)
    private String providerUserId;

    @Column(name = "USER_NAME")
    private String username;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "DELETED_AT")
    private LocalDateTime deletedAt;

    @Builder
    private MemberEntity(final String providerAccessToken,
                         final String providerLoginId,
                         final String providerUserId,
                         final String username,
                         final LocalDateTime deletedAt) {
        this.providerAccessToken = providerAccessToken;
        this.providerLoginId = providerLoginId;
        this.providerUserId = providerUserId;
        this.username = username;
        this.deletedAt = deletedAt;
    }

    public void update(final MemberEntity other) {
        providerAccessToken = other.providerAccessToken;
        providerLoginId = other.providerLoginId;
        providerUserId = other.providerUserId;
        username = other.username;
        deletedAt = other.deletedAt;
    }

    public void delete() {
        deletedAt = LocalDateTime.now();
        providerAccessToken = providerAccessToken + deletedAt + "deleted";
        providerUserId = providerUserId + deletedAt + "deleted";
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final MemberEntity memberEntity = (MemberEntity) o;
        return Objects.equals(id, memberEntity.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", providerAccessToken='" + providerAccessToken + '\'' +
                ", providerLoginId='" + providerLoginId + '\'' +
                ", providerUserId='" + providerUserId + '\'' +
                ", username='" + username + '\'' +
                ", deletedAt=" + deletedAt +
                '}';
    }
}
