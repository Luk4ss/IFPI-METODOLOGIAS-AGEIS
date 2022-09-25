import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    id:0,
    name: '',
    price: 0.0
  };

  constructor(private productService:ProductService, private router:Router, private route: ActivatedRoute) { 
  
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.findById(id || '').subscribe( (product) => {

      this.product = product
   })
  }

  navigateToProducts(){
    console.log("Navegando..")
    this.router.navigate(['/products'])
  }

  updateProduct(){
    this.productService.update(this.product).subscribe(
      (prod) => {
        this.product = prod;
        this.productService.showMessage('Operação executada com sucesso!');
        this.navigateToProducts();
      }
    )
  }

}
