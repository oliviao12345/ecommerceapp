package com.ecommerce.backend.SpringEcommerceAppBackend.dto;

import lombok.Data;

@Data
public class PurchaseResponse {

    private final String orderTrackingNumber;
    //Note: Lombok @Data will generate constructor for final fields
    //Note: Alternatively Can use @NonNull Annotation
}
