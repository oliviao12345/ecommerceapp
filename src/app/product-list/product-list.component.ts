import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../common/cart-item';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1; // Set default category id to 1
  searchMode: boolean = false;
  keyword: string = ''; // Add this property

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5; //Change page size to 5 to match the default option set in html
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService //<- Inject Cart Service
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts(); // Call the listProducts method
    });
  }


  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
  
    const theCartItem = new CartItem(theProduct);
  
    this.cartService.addToCart(theCartItem); // Call the Cart Service
  }

  updatePageSize(pageSize: string){
    this.thePageSize = +pageSize; //Assign page size and covert string to number using + 
    this.thePageNumber = 1; //reset page number to 1 after they change page size
    this.listProducts(); //call method to refresh page view

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

      //Pagination code to handle search products
      this.productService.searchProductsPaginate(this.thePageNumber -1,
        this.thePageSize, this.keyword).subscribe(this.processResult());
    });
  }

  //Helper method
  private processResult(){
    return (data: any) =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;

    }
  }

  handleListProducts() {
    // Check if the route has a category id parameter
    const categoryIdParam = this.route.snapshot.paramMap.get('id');
    
    // Update the currentCategoryId only if the categoryIdParam is not null
    if (categoryIdParam) {
      this.currentCategoryId = +categoryIdParam;
    } else {
      this.currentCategoryId = 1; // Set default category id to 1
    }
    
    this.productService.getProductList(this.currentCategoryId).subscribe((data) => {
      this.products = data;
    
      //Added code for pagination func
      this.productService.getProductListPaginate(this.thePageNumber -1,
        this.thePageSize, this.currentCategoryId). subscribe(
          //Process the results that comes from the backend
          //everything on RHS is data from spring data rest json
          data => {
            this.products = data._embedded.products;
            this.thePageNumber = data.page.number + 1;
            this.thePageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;
          }
        )
    });
  }
}
