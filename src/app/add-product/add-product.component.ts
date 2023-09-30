import { Component } from '@angular/core';
import { Product } from "../models/product";
import { ProductService } from '../product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productService :any;
  constructor(ps:ProductService){
    this.productService=ps;
  }
  pageTitle = "Add Product"
  onSubmit(form: Product){
    console.log(this.productService.addProduct(form).subscribe(
      (response: any) => {
        console.log('Product created successfully:', response);
      },
      (error: any) => {
        console.error('Error creating product:', error);
    })
    ); 
  }
}
