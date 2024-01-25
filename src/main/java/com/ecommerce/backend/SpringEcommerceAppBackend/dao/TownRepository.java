package com.ecommerce.backend.SpringEcommerceAppBackend.dao;

import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Town;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


@RepositoryRestResource
//this will expose the /states endpoint
public interface TownRepository extends JpaRepository<Town, Integer> {

    //Find towns by country code
    List<Town> findByCountryCode(@Param("code") String code);

    //to retrieve states visit code = the code defined in mySQL:
    // http://localhost:1235/api/towns/search/findByCountryCode?code=IN
    // http://localhost:1235/api/towns/search/findByCountryCode?code=US
}
