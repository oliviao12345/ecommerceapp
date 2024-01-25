package com.ecommerce.backend.SpringEcommerceAppBackend.dao;

import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product,Long> {

    // Query Method that Retrieves a page of products based on the
    // provided category ID and pagination/sorting options
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    // Query Method that Retrieves a page of products based on the
    // provided Name and pagination/sorting options
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);

}
