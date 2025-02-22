package dev.btcpp.childwallet.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.btcpp.childwallet.entity.Child;
import dev.btcpp.childwallet.repository.ChildRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/child")
@RequiredArgsConstructor
public class ChildController {

	private final ChildRepo childRepo;
	
    @GetMapping(path = "/findAll")
	public ResponseEntity<List<Child>> findAll() {
		return ResponseEntity.ok( childRepo.findAll() );
	}
    

	@GetMapping("/{id}")
	public ResponseEntity<Child> findById(@PathVariable Integer id) {
		Optional<Child> child = childRepo.findById(id);
		if ( child.isEmpty() ) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok( child.get() );
	}

	@GetMapping("/parent/{parentId}")
	public ResponseEntity<List<Child>> findByParentId(@PathVariable Integer parentId) {
		return ResponseEntity.ok( childRepo.findByParentId(parentId) );
	}

	@PostMapping
	public ResponseEntity<Child> save(@Valid @RequestBody Child child) {
		Child saved = childRepo.save(child);
		HttpStatus status;
		if (child.getId() == null) {
			status = HttpStatus.CREATED;
		} else {
			status = HttpStatus.OK;
		}
		return ResponseEntity.status(status).body(saved);
	}

	/*
	@PostMapping("/{id}/task/{taskId}")
	public ResponseEntity<Child> addTask(@PathVariable Integer id, @PathVariable Integer taskId) {
		Optional<Child> oChild = childRepo.findById(id);
		if ( oChild.isEmpty() ) {
			return ResponseEntity.notFound().build();
		}
		Child child = oChild.get();
		child.getTasks().add(Task.builder().id(taskId).build());
		Child saved = childRepo.save(child);
		return ResponseEntity.ok( saved );
	}

	@DeleteMapping("{id}/task/{taskId}")
	public ResponseEntity<Child> deleteTask(@PathVariable Integer id, @PathVariable Integer taskId) {
		Optional<Child> oChild = childRepo.findById(id);
		if ( oChild.isEmpty() ) {
			return ResponseEntity.notFound().build();
		}
		Child child = oChild.get();
		child.getTasks().removeIf(task -> task.getId().equals(taskId));
		Child saved = childRepo.save(child);
		return ResponseEntity.ok( saved );
	}
	*/   

	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		childRepo.deleteById(id);
	}    
}
