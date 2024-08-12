package site.coduo.member.domain;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "MEMBER")
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "ACCESS_TOKEN", nullable = false)
    private String accessToken;

    @Column(name = "PROVIDER_LOGIN_ID", nullable = false)
    private String loginId;

    @Column(name = "PROVIDER_USER_ID", nullable = false)
    private String userId;

    @Column(name = "PROFILE_IMAGE")
    private String profileImage;

    @Column(name = "USER_NAME")
    private String username;

    @Builder
    private Member(String accessToken, String loginId, String userId, String profileImage,
                   String username) {
        this.accessToken = accessToken;
        this.loginId = loginId;
        this.userId = userId;
        this.profileImage = profileImage;
        this.username = username;
    }

    public void updateAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Member member = (Member) o;
        return Objects.equals(id, member.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

