package com.ecommerce.backend.SpringEcommerceAppBackend.dao;

import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource //Expose this endpoint
public interface OrderRepository extends JpaRepository<Order, Long> {
    //Order = Class Name Long = Data Type of Primary Key
    Page<Order> findByCustomerEmailOrderByDateCreatedDesc(@Param("email") String email, Pageable pageable);

}
//Take an email address as a param and return a page of order objects in descending order.
//Pageable allows for pagination and sorting of the results