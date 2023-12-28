import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = -1; // Set default category id to -1
  searchMode: boolean = false;
  keyword: string = ''; // Add this property

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts(); // Call the listProducts method
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.keyword = this.route.snapshot.paramMap.get('keyword')!;
      this.handleSearchProducts();
    } else {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    this.productService.searchProducts(this.keyword).subscribe((data) => {
      this.products = data;
    });
  }

  handleListProducts() {
    this.productService.getProductList(this.currentCategoryId).subscribe((data) => {
      this.products = data;
    });
  }
}
