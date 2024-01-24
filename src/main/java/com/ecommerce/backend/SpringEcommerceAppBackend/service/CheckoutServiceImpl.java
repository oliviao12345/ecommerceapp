package com.ecommerce.backend.SpringEcommerceAppBackend.service;

import com.ecommerce.backend.SpringEcommerceAppBackend.dao.CustomerRepository;
import com.ecommerce.backend.SpringEcommerceAppBackend.dto.Purchase;
import com.ecommerce.backend.SpringEcommerceAppBackend.dto.PurchaseResponse;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Customer;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Order;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired //Optional as there is only 1 constructor
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // save to the database
        customerRepository.save(customer);

        //  return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

        //generate a random UUID number
        return UUID.randomUUID().toString();
    }
}
