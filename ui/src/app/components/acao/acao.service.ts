import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Acao} from './acao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcaoService {

  baseURL: string = "http://localhost:8000/acoes";

  constructor(private http: HttpClient) { }

  findAll():Observable<Acao[]>{
    return this.http.get<Acao[]>(this.baseURL)
  }

  insert(acao: Acao):Observable<Acao>{
    return this.http.post<Acao>(this.baseURL, acao);
  }

  /*
  findById(id: string):Observable<Acao>{
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Acao>(url);
  }
  

  update(acao: Acao): Observable<Acao>{
    return this.http.put<Acao>(`${this.baseURL}/${acao.id}`, acao);
  }

  delete(acao: Acao): Observable<Acao>{
    return this.http.delete<Acao>(`${this.baseURL}/${acao.id}`);
  }
*/
}
