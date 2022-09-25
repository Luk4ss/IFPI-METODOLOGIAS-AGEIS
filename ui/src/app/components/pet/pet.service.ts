import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Pet } from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  baseURL: string = "http://localhost:8080/pets";

  constructor(private http:HttpClient, private snackBar:MatSnackBar) { }

  showMessage(msg: string, isError:Boolean = false){
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "right",
      panelClass: isError? ['msg-error'] : ['msg-success']

    })
  }

  findAll():Observable<Pet[]>{
    return this.http.get<Pet[]>(this.baseURL)
  }

  findById(id: string):Observable<Pet>{
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Pet>(url);
  }
  

  insert(pet: Pet):Observable<Pet>{
    return this.http.post<Pet>(this.baseURL, pet);
  }

  update(pet: Pet): Observable<Pet>{
    return this.http.put<Pet>(`${this.baseURL}/${pet.id}`, pet);
  }

  delete(pet: Pet): Observable<Pet>{
    return this.http.delete<Pet>(`${this.baseURL}/${pet.id}`);
  }


}
