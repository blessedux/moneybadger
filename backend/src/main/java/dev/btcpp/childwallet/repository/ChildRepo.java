package dev.btcpp.childwallet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.btcpp.childwallet.entity.Child;

public interface ChildRepo extends JpaRepository<Child, Integer> {
	
	@Query(value = "select c from Child c where c.parent.id = :parentId")
	List<Child> findByParentId(@Param("parentId") Integer parentId);

}
