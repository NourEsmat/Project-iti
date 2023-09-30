import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent {
  pService :ProductService;
  product: Product = new Product();
  id:any;
  constructor(ps:ProductService,private route: ActivatedRoute,){
    this.pService = ps;
    this.id=this.route.snapshot.paramMap.get('id');
    this.pService.getProductByID(this.id).subscribe({
      next:(data)=>{
        this.product=data[0];
        console.log(data);
      },
      error:(err)=>console.log(err)
    });
  }
  pageTitle = "Edit Product"
  onSubmit(){
    this.pService.editProduct(this.product,this.id).subscribe({
      next:()=>{console.log("Editted");console.log(this.product)},
      error:()=>console.log("Error")
    })
  }
}
