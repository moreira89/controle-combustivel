import { Component, Input, OnInit } from '@angular/core';

import { Veiculo } from '../veiculo';
import { VeiculoService } from '../veiculo.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css'],
})

export class VeiculosComponent implements OnInit {

  @Input() veiculos: Veiculo[] = [];

  constructor(private veiculoService: VeiculoService){
  }

  ngOnInit(){
    this.getVeiculos();
  }


  getVeiculos(){
    this.veiculos = this.veiculoService.selecionarTodos();
  }

  excluirVeiculo(veiculoId: number){
    this.veiculoService.deletarVeiculo(veiculoId);
  }

}
