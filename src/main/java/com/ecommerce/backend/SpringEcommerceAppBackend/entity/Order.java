package com.ecommerce.backend.SpringEcommerceAppBackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;

    @Column(name="order_tracking_number")
    private String orderTrackingNumber;

    @Column(name="total_price")
    private BigDecimal totalPrice;

    @Column(name="total_quantity")
    private String totalQuantity;

    @Column(name="status")
    private long status;

    @Column(name="date_created")
    @CreationTimestamp //Auto add timestamp when this entity is created
    private Date dateCreated;

    @Column(name="last_updated")
    @UpdateTimestamp //Auto add timestamp when entity updated
    private Date lastUpdated;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private Set<OrderItem> orderItems = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer; //Order Assoc with Customer

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn (name = "shipping_address_id", referencedColumnName = "id")
    private Address shippingAddress; //Order Assoc with Shipping Address

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn (name = "billing_address_id", referencedColumnName = "id")
    private Address billingAddress; //Order Assoc with Billing Address

    public void add(OrderItem item){
        if(item != null){
            if (orderItems == null){
                orderItems = new HashSet<>();
            }
            orderItems.add(item);
            item.setOrder(this);
        }
    }

}
