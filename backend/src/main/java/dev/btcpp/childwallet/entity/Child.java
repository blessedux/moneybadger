package dev.btcpp.childwallet.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
public class Child {

	  @Id
	  @GeneratedValue(strategy=GenerationType.IDENTITY)
	  private Integer id;

	  private String logo;

	  private String name;

	  private Integer age;

	  private String walletAddress;

	  private Integer balance;

	  @ManyToOne
	  private Parent parent;	  
}
