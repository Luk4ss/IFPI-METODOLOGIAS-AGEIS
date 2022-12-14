import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Acao} from './acao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcaoService {

  baseURL: string = "http://localhost:8000/acoes";

  ordertye = 'asc'

  constructor(private http: HttpClient) { }

  findAll():Observable<Acao[]>{
    return this.http.get<Acao[]>(this.baseURL)
  }

  insert(acao: Acao):Observable<Acao>{
    return this.http.post<Acao>(this.baseURL, acao);
  }

  findAllOrdernado(orderBy: string):Observable<Acao[]>{
    return this.http.get<Acao[]>(this.baseURL + '/orderBy' + orderBy)
  }


  
}
