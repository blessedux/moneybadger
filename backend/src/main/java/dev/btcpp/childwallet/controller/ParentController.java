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

import dev.btcpp.childwallet.entity.Parent;
import dev.btcpp.childwallet.repository.ParentRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/parent")
@RequiredArgsConstructor
public class ParentController {

	private final ParentRepo parentRepo;
	
    @GetMapping(path = "/findAll")
	public ResponseEntity<List<Parent>> findAll() {
		return ResponseEntity.ok( parentRepo.findAll() );
	}
    

	@GetMapping("/{id}")
	public ResponseEntity<Parent> findById(@PathVariable Integer id) {
		Optional<Parent> parent = parentRepo.findById(id);
		if ( parent.isEmpty() ) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok( parent.get() );
	}

	@PostMapping
	public ResponseEntity<Parent> save(@Valid @RequestBody Parent parent) {
		Parent saved = parentRepo.save(parent);
		HttpStatus status;
		if (parent.getId() == null) {
			status = HttpStatus.CREATED;
		} else {
			status = HttpStatus.OK;
		}
		return ResponseEntity.status(status).body(saved);
	}

	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		parentRepo.deleteById(id);
	}    
}
