import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from '../pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css']
})
export class PetCreateComponent implements OnInit {

  pet:Pet = {
    name: '',
    gender: '',
    price: 0.00
  }

  constructor(private petService: PetService, private router: Router){ 

  }

  ngOnInit(): void {
  }


  onSavePet():void{
    this.petService.insert(this.pet).subscribe(
      () => {
        this.petService.showMessage("Operação executada com sucesso!")
        this.navigateToPets();
      })
  }

  navigateToPets():void{
    console.log("Navegando...")
    this.router.navigate(['/pets'])
  }

}
