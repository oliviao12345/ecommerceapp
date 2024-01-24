package com.ecommerce.backend.SpringEcommerceAppBackend.dao;

import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
