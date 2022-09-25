import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  pets: Pet[] = []

  displayedColumns = ['id', 'name', 'gender', 'price', 'action']

  constructor(private petService: PetService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.petService.findAll().subscribe(
      (pets) => this.pets = pets
    )
  }

  navigateToPetCreate():void{
    console.log("Navegando...")
    this.router.navigate(['create'], {relativeTo: this.route })
  }

}
