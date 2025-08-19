package com.example.demo.repository;


import com.example.demo.entity.RequirementTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RequirementRepository extends JpaRepository<RequirementTable, Integer> {

	@Query("""
		    SELECT DISTINCT r FROM RequirementTable r
		    WHERE (:minBudget IS NULL OR r.budget >= :minBudget)
		    AND (:maxBudget IS NULL OR r.budget <= :maxBudget)
		""")
    List<RequirementTable> findMatchedRequirements(
            @Param("vendorId") Integer vendorId,
            @Param("minBudget") BigDecimal minBudget,
            @Param("maxBudget") BigDecimal maxBudget,
            @Param("sortBy") String sortBy
    );
    
 // Count requirements matched to vendor's skills or other logic can be custom implemented if needed.
    // Since "matched requirements" depends on your business logic,
    // here we provide a method placeholder or count all for demo.

    // Example: count all requirements (You should adjust to your matching logic)
    long count();

}
