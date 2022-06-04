import { VeiculoStorage } from './veiculo.storage';

import { Veiculo } from './veiculo';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: "root"})
export class VeiculoService
{
  veiculo:Veiculo;

  veiculos: Veiculo[] = [];

  constructor(public veiculoStorage: VeiculoStorage){
  }

  cadastrarVeiculo(veiculo: Veiculo){
    this.veiculoStorage.cadastrarVeiculo(veiculo);
  }

  selecionarTodos(){
    this.veiculos = this.veiculoStorage.selecionarTodosVeiculos();
    return this.veiculos;
  }

  selecionarVeiculo(idVeiculo:number){
    this.veiculo = this.veiculoStorage.selecionarVeiculo(idVeiculo);
    return this.veiculo;
  }

  deletarVeiculo(idVeiculo: number){
    this.veiculoStorage.deletarVeiculo(idVeiculo);
  }

}
