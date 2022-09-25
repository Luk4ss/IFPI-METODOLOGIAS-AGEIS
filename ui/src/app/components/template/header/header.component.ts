import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private headerService:HeaderService) { 
  this.headerService.headerData = {
    title: 'Início',
    icon: 'home',
    routeUrl: '/'
    }
  }

  ngOnInit(): void {
  }

  get title():String {
    return this.headerService.headerData.title
  }

  get icon():String {
    return this.headerService.headerData.icon
  }
  get routeUrl():String {
    return this.headerService.headerData.routeUrl
  }

}
