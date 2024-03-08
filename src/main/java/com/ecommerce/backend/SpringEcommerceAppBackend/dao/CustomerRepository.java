package com.ecommerce.backend.SpringEcommerceAppBackend.dao;

import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

//Customers endpoint is NOT exposed as it is NOT annotated with RepositoryRestResource
//@CrossOrigin("https://localhost:4200")
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String theEmail); //Find customer based on email
}
