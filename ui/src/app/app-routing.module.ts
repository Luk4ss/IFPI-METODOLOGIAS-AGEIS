import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcaoCreateComponent } from './components/acao/acao-create/acao-create.component';
import { AcaoListComponent } from './components/acao/acao-list/acao-list.component';
import { LoginComponent } from './components/login/login.component';
import { AcaoCrudComponent } from './views/acao-crud/acao-crud.component';
import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  {
    path: "", 
  component: HomeComponent,
  pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'acoes',
    component: AcaoCrudComponent,
    children:[
      {
        path: "",
        component: AcaoListComponent
      },
      {
        path: "create",
        component: AcaoCreateComponent
      }
    ]    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
