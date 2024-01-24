package com.ecommerce.backend.SpringEcommerceAppBackend.dto;

import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Address;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Customer;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Order;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
