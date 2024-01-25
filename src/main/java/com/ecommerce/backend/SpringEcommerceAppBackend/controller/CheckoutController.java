package com.ecommerce.backend.SpringEcommerceAppBackend.controller;

import com.ecommerce.backend.SpringEcommerceAppBackend.dto.Purchase;
import com.ecommerce.backend.SpringEcommerceAppBackend.dto.PurchaseResponse;
import com.ecommerce.backend.SpringEcommerceAppBackend.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService; //Inject the checkout svc

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }
}
