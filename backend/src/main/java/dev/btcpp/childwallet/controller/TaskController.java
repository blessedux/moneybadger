package dev.btcpp.childwallet.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.btcpp.childwallet.entity.Child;
import dev.btcpp.childwallet.entity.Task;
import dev.btcpp.childwallet.repository.ChildRepo;
import dev.btcpp.childwallet.repository.TaskRepo;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/task")
@RequiredArgsConstructor
public class TaskController {

	private final TaskRepo taskRepo;
	private final ChildRepo childRepo;
	
    @GetMapping(path = "/findAll")
	public ResponseEntity<List<Task>> findAll() {
		return ResponseEntity.ok( taskRepo.findAll() );
	}
    
	@GetMapping("/{id}")
	public ResponseEntity<Task> findById(@PathVariable Integer id) {
		Optional<Task> task = taskRepo.findById(id);
		if ( task.isEmpty() ) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok( task.get() );
	}
	
    @GetMapping(path = "/child/{childId}")
	public ResponseEntity<List<Task>> findByChildId(@PathVariable Integer childId) {
		return ResponseEntity.ok( taskRepo.findByChildId(childId) );
	}

	@PostMapping
	public ResponseEntity<Task> save(@Valid @RequestBody Task task) {
		if ( task.getStatus() == null ) {
			task.setStatus(Task.Status.PENDING);
		}
		if ( task.getChildId() == null ) {
			task.setAssignedTo(null);
		} else {
			Optional<Child> child = childRepo.findById(task.getChildId());
			if ( child.isEmpty() ) {
				return ResponseEntity.notFound().build();
			}
			task.setAssignedTo( child.get() );
		}
		Task saved = taskRepo.save(task);
		HttpStatus status;
		if (task.getId() == null) {
			status = HttpStatus.CREATED;
		} else {
			status = HttpStatus.OK;
		}
		return ResponseEntity.status(status).body(saved);
	}

	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		taskRepo.deleteById(id);
	}
    
	@PatchMapping("/{id}")
	@Transactional
	public ResponseEntity<Task> updateStatus(@PathVariable Integer id, @RequestBody Task taskStatus) {
		Optional<Task> oTask = taskRepo.findById(id);
		if ( oTask.isEmpty() ) {
			return ResponseEntity.notFound().build();
		}
		Task task = oTask.get();
		if ( Task.Status.PENDING.equals(task.getStatus()) &&
			Task.Status.COMPLETED.equals(taskStatus.getStatus()) ) {
			task.setStatus(Task.Status.COMPLETED);
			task.setCompletedAt( LocalDateTime.now() );
			taskRepo.save(task);
		}
		else if ( Task.Status.COMPLETED.equals(task.getStatus())  &&
				Task.Status.APPROVED.equals(taskStatus.getStatus()) ) {
			task.setStatus(Task.Status.APPROVED);
			taskRepo.save(task);
			Child child = task.getAssignedTo();
			if (child != null && task.getReward() != null) {
				Integer balance = child.getBalance();
				if (balance == null) {
					balance = 0;
				}
				balance += task.getReward();
				child.setBalance(balance);
				childRepo.save(child);
			}
		}
		return ResponseEntity.ok( task );
	}
    
	@PostMapping("/{id}/complete")
	public ResponseEntity<Task> complete(@PathVariable Integer id) {
		Optional<Task> oTask = taskRepo.findById(id);
		if ( oTask.isEmpty() ) {
			return ResponseEntity.notFound().build();
		}
		Task task = oTask.get();
		if ( Task.Status.PENDING.equals(task.getStatus()) ) {
			task.setStatus(Task.Status.COMPLETED);
			task.setCompletedAt( LocalDateTime.now() );
			taskRepo.save(task);
		}
		return ResponseEntity.ok( task );
	}
    
	@PostMapping("/{id}/approve")
	public ResponseEntity<Task> approve(@PathVariable Integer id) {
		Optional<Task> oTask = taskRepo.findById(id);
		if ( oTask.isEmpty() ) {
			return ResponseEntity.notFound().build();
		}
		Task task = oTask.get();
		if ( Task.Status.COMPLETED.equals(task.getStatus()) ) {
			task.setStatus(Task.Status.APPROVED);
			taskRepo.save(task);
		}
		return ResponseEntity.ok( task );
	}
}
