package site.coduo.test;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TestTableRepository extends JpaRepository<TestTable, Long> {
}
