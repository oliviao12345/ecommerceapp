package com.ecommerce.backend.SpringEcommerceAppBackend.dao;

import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//Expose /countries endpoint
//@CrossOrigin("https://localhost:4200")

@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
// Country=Entity Class       Integer=Primary Key Data Type
public interface CountryRepository extends JpaRepository<Country, Integer> {
//To retrieve all countries visit: http://localhost:1235/api/countries
//To retrieve a country with a specific id visit e.g.: http://localhost:1235/api/countries/4
}
