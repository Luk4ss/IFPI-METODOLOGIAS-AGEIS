import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-delete',
  templateUrl: './pet-delete.component.html',
  styleUrls: ['./pet-delete.component.css']
})
export class PetDeleteComponent implements OnInit {

  pet: Pet = {
    id: 0,
    name: '',
    gender: '',
    price: 0.00
  }

  constructor(private petService:PetService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.petService.findById(id || '').subscribe( 
      (p) => {
        this.pet = p
        console.log("Pet loaded!")
      }
    )

  }

  navigateToPets():void{
    this.router.navigate(['/pets'])
  }

  onDelete():void {
    this.petService.delete(this.pet).subscribe(
      () => {
        this.petService.showMessage("Operação concluída com sucesso!")
        this.navigateToPets()
      }
    )

  }

}
