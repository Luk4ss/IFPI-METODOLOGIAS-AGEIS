import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[]

  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private productService:ProductService, private router:Router) { 
    console.log("Constructor")
    this.products = [];
    
  }

  ngOnInit(): void {
   this.productService.findAll().subscribe( (products: Product[]) => {
     this.products = products;
     console.log(products);
     console.log("ngOnInit")
   })
  }

  navigateToProductsCreate():void{
    console.log("Navegando...")
    this.router.navigate(['products/create'])
  }


}
