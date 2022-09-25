import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-acao-crud',
  templateUrl: './acao-crud.component.html',
  styleUrls: ['./acao-crud.component.css']
})
export class AcaoCrudComponent implements OnInit {

  constructor(private router:Router, private headerService:HeaderService) { 
    this.headerService.headerData = {
      title: 'AÇÕES',
      icon: 'attach_money',
      routeUrl: '/acoes'
    }
  }

  ngOnInit(): void {
  }

}
