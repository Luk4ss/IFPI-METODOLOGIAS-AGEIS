import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Acao } from '../acao.model';
import { AcaoService } from '../acao.service'; 


@Component({
  selector: 'app-acao-list',
  templateUrl: './acao-list.component.html',
  styleUrls: ['./acao-list.component.css']
})
export class AcaoListComponent implements OnInit {

  acoes: Acao[] = []

  preco_medio_total:number = 0;

  displayedColumns = ['data', 'codigo', 'valorUnitario', 'quantidade', 'taxaB3', 'taxaCorretagem', 'operacao', 'valorTotal']

  constructor(private acaoService: AcaoService, private router:Router, private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.acaoService.findAll().subscribe(
      (acoes) => {
      this.acoes = acoes;
      this.calcula_preco_medio(acoes);
      }
    );
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

  navigateToAcaoCreate():void{
    console.log("Navegando...")
    this.router.navigate(['create'], {relativeTo: this.route })
  }

  navigateToAcaoDetails():void{
    console.log("Navegando...")
    this.router.navigate(['details'], {relativeTo: this.route })
  
  }

  ordernarAcoes(order: string):void{
    this.acaoService.findAllOrdernado(order).subscribe(
      (acoes) => this.acoes = acoes
    );
  }

}
