package com.ecommerce.backend.SpringEcommerceAppBackend.service;

import com.ecommerce.backend.SpringEcommerceAppBackend.dto.Purchase;
import com.ecommerce.backend.SpringEcommerceAppBackend.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

}
