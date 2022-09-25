import { Component, OnInit } from '@angular/core';
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

  displayedColumns = ['data', 'codigo', 'valorUnitario', 'quantidade', 'taxaB3', 'taxaCorretagem', 'operacao', 'valorTotal']

  constructor(private acaoService: AcaoService, private router:Router, private route:ActivatedRoute ) { }

  ngOnInit(): void {

    this.acaoService.findAll().subscribe(
      (acoes) => this.acoes = acoes
    );
  }

  navigateToAcaoCreate():void{
    console.log("Navegando...")
    this.router.navigate(['create'], {relativeTo: this.route })
  }

  ordernarPorCodigo(order: string):void{
    this.acaoService.findAllOrdernado(order).subscribe(
      (acoes) => this.acoes = acoes
    );
  }

  deleteAll(): void{
    this.acaoService.deleteAll().subscribe(
      () => alert('Você ecluiu todas as ações do banco!')
    )
  }

}
