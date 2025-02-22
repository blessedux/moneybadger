package dev.btcpp.childwallet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.btcpp.childwallet.entity.Parent;

public interface ParentRepo extends JpaRepository<Parent, Integer> {

}
