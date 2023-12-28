package com.ecommerce.backend.SpringEcommerceAppBackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "product")
@Data //Lombok annotation
public class Product {

    //The column names need to match the ACTUAL column names in
    //the SQL database table otherwise there will be errors

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private  Long id;

    @Column(name = "sku")
    private  String sku;

    @ManyToOne // Specifies a many-to-one relationship with another entity
    @JoinColumn(name = "category_id", nullable = false) // Specifies the join column for the relationship and allows null values
    private ProductCategory category; // Represents the associated ProductCategory for this entity

    @Column(name = "name")
    private  String name;

    @Column(name = "description")
    private  String description;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    @Column(name = "date_created")
    @CreationTimestamp
    private  Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

}
