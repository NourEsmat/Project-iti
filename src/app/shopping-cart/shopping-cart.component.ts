import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  category :any;
  selectedProduct: Product = {};
  selectedCategory : any [] =[]
  allSelectedCategory:any[]=[]
  mySubscription: any;
  mycart:any[]=[];
  productIds:any[]=[];
  ps:ProductService;
  totalPrice:any=0;
  uniqueArray: number[] = [];

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router){
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
    this.ps=productService;
    this.mycart=this.ps.CartItems;
  }
  ngOnInit():void{
    console.log(this.ps.getCart());
    this.productIds=this.ps.getCart();
    for (const item of this.productIds) {
      if (!this.uniqueArray.includes(item)) {
        this.uniqueArray.push(item);
      }
    }
        
    for(let id of this.uniqueArray){
      // console.log(id);
      this.ps.getProductByID(id.toString()).subscribe({
        next:(data)=>{
          this.selectedProduct=  data;
           console.log(this.selectedProduct);
           this.category = this.selectedProduct.type;
           this.ps.getCategory(this.category).subscribe({
            next:(data)=>{
              this.allSelectedCategory=data;
              this.calculatePrice();
            }
          });
           this.allSelectedCategory = this.selectedCategory
          this.mycart.push(this.selectedProduct); 
          // console.log(this.mycart); 
        }
      });
    }
    
  }    
  

  
  ngOnDestroy(): void {
    if(this.mySubscription){
      this.mySubscription.unsubscribe();
    }
  }
remove(id:string){
  this.productService.getProductByID(id).subscribe({
    next:(data)=>{
      this.selectedProduct = data;
      this.productService.removeFromCart(this.selectedProduct);
      // console.log(this.productService.CartItems);
      this.calculatePrice();
    }
  });

}
    calculatePrice(){
      let sum=0;
      for(let item of this.mycart){     
        sum += item.price; 
    }
    this.totalPrice=sum;
    }
}