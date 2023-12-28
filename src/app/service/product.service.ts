import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private categoryURL = "http://localhost:1235/api/product-category"; // Spring Boot URL
  private baseUrl = 'http://localhost:1235/api/products'; // Spring Boot URL

  constructor(private httpClient: HttpClient) { }

  // Returns an Observable of an array of ProductCategory objects
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryURL).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    console.log('Request URL:', searchUrl);
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  // Returns an Observable of an array of Product objects based on the provided category id
  getProductList(id: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${id}`;
    console.log('Request URL:', searchUrl);
    return this.getProducts(searchUrl);
  }
}

// Interface to unwrap the JSON response from Spring Data Rest _embedded entry for ProductCategory
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

// Interface to unwrap the JSON response from Spring Data Rest _embedded entry for Products
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

//Search by keyword Working