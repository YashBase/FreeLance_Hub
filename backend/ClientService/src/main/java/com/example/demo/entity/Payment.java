	package com.example.demo.entity;
	
	
	
	import jakarta.persistence.*;
	import lombok.*;
	
	import java.math.BigDecimal;
	import java.util.Date;
	
	import com.fasterxml.jackson.annotation.JsonIgnore;
	
	@Entity
	@Table(name = "payment_table")
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public class Payment {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "payment_id")
	    private Integer paymentId;
	
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "client_id", nullable = false)
	    @JsonIgnore
	    private ClientTable client;
	
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "vendor_id", nullable = false)
	    private VendorTable vendor;
	
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "task_id", nullable = false)
	    private TaskTable task;
	
	    @Column(name = "date", nullable = false)
	    @Temporal(TemporalType.DATE)
	    private Date date;
	
	    @Column(name = "amount", precision = 10, scale = 2, nullable = false)
	    private BigDecimal amount;
	    
	    @Column(name = "status", nullable = false)
	    private String status;   // "PENDING" or "PAID"

	}
