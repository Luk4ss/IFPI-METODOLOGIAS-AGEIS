import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-pet-crud',
  templateUrl: './pet-crud.component.html',
  styleUrls: ['./pet-crud.component.css']
})
export class PetCrudComponent implements OnInit {

  constructor(private route:Router, private headerService: HeaderService) { 
    this.headerService.headerData = {
      title: 'PETSHOP',
      icon: 'pets',
      routeUrl: '/pets'
    }
  }

  ngOnInit(): void {
  }


}
