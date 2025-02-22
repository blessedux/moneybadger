package dev.btcpp.childwallet.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Task {
	
	public enum Status {
	    PENDING, COMPLETED, APPROVED;
	}	

	  @Id
	  @GeneratedValue(strategy=GenerationType.IDENTITY)
	  private Integer id;

	  private String title;
		  
	  private String description;
	  
	  private Integer reward;
	  
	  @Transient
	  private Integer childId;
	  
	  @Enumerated(EnumType.STRING)
	  private Status status;
	  
	  private LocalDateTime completedAt;
	  
	  @ManyToOne
	  private Child assignedTo;
}
