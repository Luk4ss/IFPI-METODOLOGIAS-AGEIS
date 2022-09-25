import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0.00
  };

  constructor(private router:Router, private productService:ProductService) { }

  ngOnInit(): void {
    
  }

  navigateToProducts(){
    console.log("Navegando..")
    this.router.navigate(['/products'])
  }

  createProduct(){
    this.productService.insert(this.product).subscribe( () => {
      this.productService.showMessage('Operação executada com sucesso!');
      this.navigateToProducts();
    });
    
  }

}
