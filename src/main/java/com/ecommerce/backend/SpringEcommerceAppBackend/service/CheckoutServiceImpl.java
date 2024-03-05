package com.ecommerce.backend.SpringEcommerceAppBackend.service;

import com.ecommerce.backend.SpringEcommerceAppBackend.dao.CustomerRepository;
import com.ecommerce.backend.SpringEcommerceAppBackend.dto.PaymentInfo;
import com.ecommerce.backend.SpringEcommerceAppBackend.dto.Purchase;
import com.ecommerce.backend.SpringEcommerceAppBackend.dto.PurchaseResponse;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Customer;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.Order;
import com.ecommerce.backend.SpringEcommerceAppBackend.entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository, @Value("${stripe.key.secret}") String secretKey){
        this.customerRepository = customerRepository;
        Stripe.apiKey = secretKey;
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

// Check if this is an existing customer
        String theEmail = customer.getEmail();

// Retrieve customer from the database based on the email
        Customer customerFromDB = customerRepository.findByEmail(theEmail);

// If a customer with the given email exists in the database
        if(customerFromDB != null){

            //Add the order to the existing customer
            customerFromDB.add(order);
            // Update the customer object with the retrieved customer from the database
            customer = customerFromDB;
        } else {
            customer.add(order);
        }

        // save to the database
        customerRepository.save(customer);

        //  return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    // This method overrides the createPaymentIntent method defined in the interface.
    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {
        // Create a list to hold the payment method type, in this case, just "card".
        List<String> paymentMethodType = new ArrayList<>();
        paymentMethodType.add("card");

        // Create a map to store the parameters required for creating a PaymentIntent.
        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount()); // Set the amount for the payment.
        params.put("currency", paymentInfo.getCurrency()); // Set the currency for the payment.
        params.put("payment_method_type", paymentMethodType); // Set the payment method type to "card".

        // Call the Stripe API to create a PaymentIntent using the provided parameters.
        return PaymentIntent.create(params);
    }

    private String generateOrderTrackingNumber() {

        //generate a random UUID number
        return UUID.randomUUID().toString();
    }
}
