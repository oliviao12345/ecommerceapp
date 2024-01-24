package com.ecommerce.backend.SpringEcommerceAppBackend.config;

import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Country;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Product;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.ProductCategory;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Town;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

        // Disable the PUT, POST, DELETE methods for the Product entity

        // Disable the PUT, POST, DELETE methods for the ProductCategory, Product, Country and Town entities
        disableHttpMethods(ProductCategory.class,config, theUnsupportedActions);
        disableHttpMethods(Product.class,config, theUnsupportedActions);
        disableHttpMethods(Country.class,config, theUnsupportedActions);
        disableHttpMethods(Town.class,config, theUnsupportedActions);

        // Call an Internal Helper Method
        exposeIds(config);
    }

    private static void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // Get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // Create a list of the entity classes
        List<Class<?>> entityClasses = new ArrayList<>();

        // Get the entity classes from the entity types
        for (EntityType<?> tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // Expose the entity IDs for the list of entity/domain classes
        Class<?>[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}