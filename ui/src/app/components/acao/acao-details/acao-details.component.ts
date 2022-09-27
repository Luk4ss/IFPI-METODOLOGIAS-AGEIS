import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Acao } from '../acao.model';
import { AcaoService } from '../acao.service'; 

@Component({
  selector: 'app-acao-details',
  templateUrl: './acao-details.component.html',
  styleUrls: ['./acao-details.component.css']
})
export class AcaoDetailsComponent implements OnInit {

  acoes:Acao[] = [];

  acoes_filtradas:Acao[] = [];

  displayedColumns = ['data', 'codigo', 'valorUnitario', 'quantidade', 'taxaB3', 'taxaCorretagem', 'operacao', 'valorTotal'];

  codigos:string[] = [];

  query:string = "";


  constructor(private acaoService: AcaoService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.acaoService.findAll().subscribe(
      (acoes) => {
        this.acoes = acoes
      }
    );
    
  }

  navigateToAcoes():void{
    this.router.navigate(['/acoes'])
  }

  pesquisar():void {

    if(this.query === ""){
      alert("Digite algo no campo de pesquisa!")
      return;
    }

    const filtro:Acao[] = this.acoes.filter(a => a.codigo === this.query);
    if(filtro.length == 0){
      alert("Nenhuma ação encontrada para o código do ativo pesquisado...")
      return;
    }

    this.acoes_filtradas = filtro;

    this.query= "";
  }

}
