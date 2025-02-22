package dev.btcpp.childwallet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.btcpp.childwallet.entity.Task;

public interface TaskRepo extends JpaRepository<Task, Integer> {
	
	@Query(value = "select t from Task t where t.assignedTo.id = :childId")
	List<Task> findByChildId(@Param("childId") Integer childId);

}
