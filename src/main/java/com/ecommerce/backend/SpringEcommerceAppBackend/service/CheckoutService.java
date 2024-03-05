package com.ecommerce.backend.SpringEcommerceAppBackend.service;

import com.ecommerce.backend.SpringEcommerceAppBackend.dto.PaymentInfo;
import com.ecommerce.backend.SpringEcommerceAppBackend.dto.Purchase;
import com.ecommerce.backend.SpringEcommerceAppBackend.dto.PurchaseResponse;
import com.stripe.exception.StripeException; //From STRIPE API
import com.stripe.model.PaymentIntent; //From Stripe API

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;


}
