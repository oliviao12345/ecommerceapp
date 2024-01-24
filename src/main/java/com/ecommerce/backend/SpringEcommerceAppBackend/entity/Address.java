package com.ecommerce.backend.SpringEcommerceAppBackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name="street")
    private String street;

    @Column(name="city")
    private String city;

    @Column(name="town")
    private String town;

    @Column(name="country")
    private String country;

    @Column(name="post_code")
    private String postCode;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;

}
