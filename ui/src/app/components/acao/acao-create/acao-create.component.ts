import { Component, OnInit } from '@angular/core';
import { Acao } from '../acao.model';
import {Router} from '@angular/router'
import { AcaoService } from '../acao.service';


@Component({
  selector: 'app-acao-create',
  templateUrl: './acao-create.component.html',
  styleUrls: ['./acao-create.component.css']
})
export class AcaoCreateComponent implements OnInit {

  tipos_operacao = ['COMPRA', 'VENDA']

  acao:Acao = {
    codigo: '',
    valorUnitario: 0.0,
    quantidade: 0,
    taxaCorretagem: 0.0,
    operacao: 'COMPRA',
    data: '',
  }

  constructor(private router:Router, private acaoService: AcaoService) { }

  ngOnInit(): void {
  }

  onSaveAcao():void{
    console.log(this.acao)
    this.acaoService.insert(this.acao).subscribe(
      () =>{
        this.navigateToAcoes();
      }
    )
  }


  navigateToAcoes():void{
    this.router.navigate(['/acoes'])
  }

  tpOperacao(entry: string):void{
    this.acao.operacao = entry;
  }

}
