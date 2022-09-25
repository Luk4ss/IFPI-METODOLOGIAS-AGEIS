import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-update',
  templateUrl: './pet-update.component.html',
  styleUrls: ['./pet-update.component.css']
})
export class PetUpdateComponent implements OnInit {
  pet: Pet = {
    id: 0,
    name: '',
    gender: '',
    price: 0.00
  }

  constructor(private router:Router, private route:ActivatedRoute, private petService: PetService) { 
    
  }

  ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get('id');
    this.petService.findById(id || '').subscribe(
      (p) =>{
             this.pet = p
             console.log("PET loaded")
      }
    )
  }

  navigateToPets():void {
    this.router.navigate(['/pets'])
  }

  onAtualizarPet(): void{
    this.petService.update(this.pet).subscribe(
      () => {
        this.petService.showMessage("Operação realizada com sucesso...")
        this.navigateToPets()
      }
    )
  }

}
