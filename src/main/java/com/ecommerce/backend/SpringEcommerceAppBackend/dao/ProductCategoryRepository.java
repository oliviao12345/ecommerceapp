package com.ecommerce.backend.SpringEcommerceAppBackend.dao;

import com.ecommerce.backend.SpringEcommerceAppBackend.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}

//    This code makes the save and delete methods private, effectively disabling the
//    POST, PUT, and DELETE HTTP methods. The @RestResource(exported = false)
//    annotation prevents these methods from being exposed as part of the REST API.