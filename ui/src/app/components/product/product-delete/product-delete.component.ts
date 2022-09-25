import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    id: 0, name: '', price: 0.00  }

  constructor(private productService: ProductService, private route:ActivatedRoute, private router: Router) 
  { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.findById(id || '').subscribe(
      (product) => { 
        this.product = product;
      }
    )
  }

  navigateToProducts(){
    console.log("Navegando..")
    this.router.navigate(['/products'])
  }

  deleteProduct():void{
      const id = this.route.snapshot.paramMap.get('id');
      this.productService.delete(id || '0').subscribe(
        () => {
          this.productService.showMessage("Operação efetuada com sucesso")
          this.navigateToProducts();
        }
      );
  }
}
