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

  codigo: string = "______";

  query:string = "";

  preco_medio_total: number = 0;

  


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
    this.query = this.query.toUpperCase();
    const filtro:Acao[] = this.acoes.filter(a => a.codigo === this.query);
    if(filtro.length == 0){
      alert("Nenhuma ação encontrada para o código do ativo pesquisado...")
      return;
    }

    this.codigo = this.query;
    this.acoes_filtradas = filtro;
    this.query= "";
    this.calcula_preco_medio(filtro);
  
  }

  calcula_preco_medio(acoes:Acao[]): void{
    if (acoes.length == 0){
      return;
    }
    let total:number = 0;
    let quantidade_total: number = 0;
    let temAcoesDeCompra: boolean = false;
    acoes.forEach((acao) => {
      if (acao.operacao == "COMPRA"){
          temAcoesDeCompra = true;
          const taxab3:number = acao.taxaB3 ?? 0;
          total += (acao.quantidade)*(acao.valorUnitario) + (taxab3 + acao.taxaCorretagem);
          quantidade_total += acao.quantidade;
      }
    });
    if(!temAcoesDeCompra){
      return;
    }
    const preco_medio = total/quantidade_total
    this.preco_medio_total = Number(preco_medio.toFixed(2));
    console.log(this.preco_medio_total);
  }

}
