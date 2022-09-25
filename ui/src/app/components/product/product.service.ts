import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError, EMPTY, Observable , map} from 'rxjs';
import { Product } from './product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL: string = "http://localhost:8080/products";

  constructor(private snackBar: MatSnackBar, private http:HttpClient) { }



  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError? ['msg-error'] : ['msg-success'] ,
    })

  }

  insert(product: Product): Observable<Product>{

   return  this.http.post<Product>(this.baseURL, product).pipe(
     map( (obj) => obj),
     catchError( (e) => this.errorHandler(e))
   );
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY
  }

  findAll():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseURL)
  }

  findById(id: string): Observable<Product>{
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Product>(url);
  }

  update(product: Product): Observable<Product>{
    const url = `${this.baseURL}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  delete(id: string): Observable<Product>{
    const url = `${this.baseURL}/${id}`;
    return this.http.delete<Product>(url);
  }

}
